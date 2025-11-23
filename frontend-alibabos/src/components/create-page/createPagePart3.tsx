"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Type,
  SplitSquareHorizontal,
} from "lucide-react";
import styles from "@/style/createPage.module.css";

interface ContentBlock {
  id: string;
  type: "text" | "image";
  content: string;
}

interface ContentSection {
  id: string;
  layout: "single" | "split";
  blocks: ContentBlock[];
}

interface Step3Data {
  sections: ContentSection[];
  selectedFont: string;
  completedAt?: string;
}

interface Step3Props {
  onDataChange: (data: Step3Data) => void;
  initialData?: Step3Data;
}

const fontOptions = [
  { id: "inter", name: "Inter", value: "Inter" },
  { id: "roboto", name: "Roboto", value: "Roboto" },
  { id: "playfair", name: "Playfair Display", value: "Playfair Display" },
  { id: "montserrat", name: "Montserrat", value: "Montserrat" },
  { id: "opensans", name: "Open Sans", value: "Open Sans" },
];

const MAX_SECTIONS = 10;
const MAX_CHARS_SINGLE = 200;
const MAX_CHARS_SPLIT = 100;

function Step3ContentManagement({ onDataChange, initialData }: Step3Props) {
  const [sections, setSections] = useState<ContentSection[]>(
    initialData?.sections || []
  );
  const [selectedFont, setSelectedFont] = useState<string>(
    initialData?.selectedFont || "Inter"
  );

  // Send data to parent whenever sections or font changes
  useEffect(() => {
    const stepData: Step3Data = {
      sections,
      selectedFont,
      completedAt: new Date().toISOString(),
    };
    onDataChange(stepData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, selectedFont]);

  const handleAddSection = () => {
    if (sections.length >= MAX_SECTIONS) {
      alert(`Maximum ${MAX_SECTIONS} sections allowed`);
      return;
    }

    const newSection: ContentSection = {
      id: `section-${Date.now()}`,
      layout: "single",
      blocks: [
        {
          id: `block-${Date.now()}`,
          type: "text",
          content: "",
        },
      ],
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const handleToggleLayout = (sectionId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const newLayout = section.layout === "single" ? "split" : "single";

          if (newLayout === "split") {
            // Check if current text exceeds split limit
            const currentBlock = section.blocks[0];
            if (
              currentBlock.type === "text" &&
              currentBlock.content.length > MAX_CHARS_SPLIT
            ) {
              alert(
                `Cannot split section: Text content exceeds ${MAX_CHARS_SPLIT} characters (current: ${currentBlock.content.length}). Please reduce the text to ${MAX_CHARS_SPLIT} characters or less before splitting.`
              );
              return section; // Return unchanged section
            }

            // Proceed with split
            return {
              ...section,
              layout: "split",
              blocks: [
                section.blocks[0],
                {
                  id: `block-${Date.now()}`,
                  type: "text",
                  content: "",
                },
              ],
            };
          } else {
            // Merge: keep only first block
            return {
              ...section,
              layout: "single",
              blocks: [section.blocks[0]],
            };
          }
        }
        return section;
      })
    );
  };

  const handleBlockContentChange = (
    sectionId: string,
    blockId: string,
    content: string
  ) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            blocks: section.blocks.map((block) => {
              if (block.id === blockId) {
                const maxChars =
                  section.layout === "single"
                    ? MAX_CHARS_SINGLE
                    : MAX_CHARS_SPLIT;
                return {
                  ...block,
                  content: content.slice(0, maxChars),
                };
              }
              return block;
            }),
          };
        }
        return section;
      })
    );
  };

  const handleToggleBlockType = (sectionId: string, blockId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            blocks: section.blocks.map((block) => {
              if (block.id === blockId) {
                const newType = block.type === "text" ? "image" : "text";
                return {
                  ...block,
                  type: newType,
                  content:
                    newType === "image" ? "https://placehold.co/400x300" : "",
                };
              }
              return block;
            }),
          };
        }
        return section;
      })
    );
  };

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
  };

  return (
    <section className={styles.templateSection}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Customize Your Content</h2>
        <p className={styles.sectionDescription}>
          Add up to {MAX_SECTIONS} sections and choose your font style
        </p>
      </header>

      <div className={styles.customizeContainer}>
        {/* Font Selection */}
        <div className={styles.settingsCard}>
          <h3 className={styles.cardTitle}>Design Settings</h3>

          <div className={styles.settingGroup}>
            <label className={styles.settingLabel}>Font Family</label>
            <select
              value={selectedFont}
              onChange={(e) => handleFontChange(e.target.value)}
              className={styles.fontSelect}
            >
              {fontOptions.map((font) => (
                <option key={font.id} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Sections */}
        <div className={styles.settingsCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              Content Sections ({sections.length}/{MAX_SECTIONS})
            </h3>
            <button
              onClick={handleAddSection}
              className={styles.addSectionButton}
              disabled={sections.length >= MAX_SECTIONS}
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>

          <div className={styles.sectionsContainer}>
            {sections.length === 0 ? (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateText}>
                  No sections yet. Click "Add Section" to get started.
                </p>
              </div>
            ) : (
              sections.map((section, index) => (
                <div key={section.id} className={styles.sectionItem}>
                  <div className={styles.sectionHeader}>
                    <span className={styles.sectionNumber}>
                      Section {index + 1}
                    </span>
                    <div className={styles.sectionActions}>
                      <button
                        onClick={() => handleToggleLayout(section.id)}
                        className={styles.toggleLayoutButton}
                        title={
                          section.layout === "single"
                            ? "Split section"
                            : "Merge section"
                        }
                      >
                        <SplitSquareHorizontal className="w-4 h-4" />
                        {section.layout === "single" ? "Split" : "Merge"}
                      </button>
                      <button
                        onClick={() => handleRemoveSection(section.id)}
                        className={styles.removeSectionButton}
                        aria-label="Remove section"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div
                    className={
                      section.layout === "split"
                        ? styles.blockContainerSplit
                        : styles.blockContainerSingle
                    }
                  >
                    {section.blocks.map((block, blockIndex) => (
                      <div key={block.id} className={styles.blockWrapper}>
                        {block.type === "text" ? (
                          <div className={styles.textBlockContainer}>
                            <textarea
                              value={block.content}
                              onChange={(e) =>
                                handleBlockContentChange(
                                  section.id,
                                  block.id,
                                  e.target.value
                                )
                              }
                              placeholder={`Enter content (max ${
                                section.layout === "single"
                                  ? MAX_CHARS_SINGLE
                                  : MAX_CHARS_SPLIT
                              } characters)...`}
                              className={styles.sectionTextarea}
                              rows={4}
                              maxLength={
                                section.layout === "single"
                                  ? MAX_CHARS_SINGLE
                                  : MAX_CHARS_SPLIT
                              }
                            />
                            <div className={styles.charCounter}>
                              {block.content.length}/
                              {section.layout === "single"
                                ? MAX_CHARS_SINGLE
                                : MAX_CHARS_SPLIT}
                            </div>
                          </div>
                        ) : (
                          <div className={styles.imageBlockContainer}>
                            <div className={styles.imagePlaceholder}>
                              <ImageIcon className="w-12 h-12 text-gray-400" />
                              <p className={styles.imageComingSoon}>
                                {/* TODO: Implement image upload service integration */}
                                Image Selection - Coming Soon
                              </p>
                              <p className={styles.imagePlaceholderUrl}>
                                {block.content}
                              </p>
                            </div>
                          </div>
                        )}

                        <button
                          onClick={() =>
                            handleToggleBlockType(section.id, block.id)
                          }
                          className={styles.toggleTypeButton}
                        >
                          {block.type === "text" ? (
                            <>
                              <ImageIcon className="w-4 h-4" />
                              Switch to Image
                            </>
                          ) : (
                            <>
                              <Type className="w-4 h-4" />
                              Switch to Text
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Debug info */}
      {sections.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            ✓ {sections.length} section{sections.length > 1 ? "s" : ""} added |
            Font: {selectedFont}
          </p>
        </div>
      )}
    </section>
  );
}

export default Step3ContentManagement;
