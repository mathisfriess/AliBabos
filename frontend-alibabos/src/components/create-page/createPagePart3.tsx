"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";
import styles from "@/style/createPage.module.css";

interface ContentSection {
  id: string;
  type: string;
  content: string;
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

function Step3ContentManagement({ onDataChange, initialData }: Step3Props) {
  const [sections, setSections] = useState<ContentSection[]>(
    initialData?.sections || []
  );
  const [selectedFont, setSelectedFont] = useState<string>(
    initialData?.selectedFont || "Inter"
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // Only send initial data once on mount
  useEffect(() => {
    if (!isInitialized && initialData) {
      setIsInitialized(true);
    }
  }, [isInitialized, initialData]);

  // Update parent component whenever data changes (but not on initial mount)
  useEffect(() => {
    if (isInitialized) {
      const stepData: Step3Data = {
        sections,
        selectedFont,
        completedAt: new Date().toISOString(),
      };
      onDataChange(stepData);
    }
  }, [sections, selectedFont, isInitialized]); // Remove onDataChange from dependencies

  const handleAddSection = () => {
    const newSection: ContentSection = {
      id: `section-${Date.now()}`,
      type: "div",
      content: "",
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const handleSectionContentChange = (sectionId: string, content: string) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId ? { ...section, content } : section
      )
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
          Add sections and choose your font style
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
            <h3 className={styles.cardTitle}>Content Sections</h3>
            <button
              onClick={handleAddSection}
              className={styles.addSectionButton}
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
                    <button
                      onClick={() => handleRemoveSection(section.id)}
                      className={styles.removeSectionButton}
                      aria-label="Remove section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={section.content}
                    onChange={(e) =>
                      handleSectionContentChange(section.id, e.target.value)
                    }
                    placeholder="Enter content for this section..."
                    className={styles.sectionTextarea}
                    rows={4}
                  />
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
