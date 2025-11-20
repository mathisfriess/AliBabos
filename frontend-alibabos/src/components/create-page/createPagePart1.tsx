"use client";

import { useState, useEffect } from "react";
import styles from "@/style/createPage.module.css";

interface Template {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  isPopular?: boolean;
}

interface Step1Data {
  selectedTemplate: string | null;
  selectedTemplateName?: string;
  selectedTemplateCategory?: string;
  // Add any other step 1 specific data
  extraInfo?: string;
}

interface Step1Props {
  onDataChange: (data: Step1Data) => void;
  initialData?: Step1Data;
}

const templates: Template[] = [
  {
    id: "1",
    name: "ModernShop Pro",
    category: "E-commerce",
    imageUrl: "https://placehold.co/302x226",
    isPopular: true,
  },
  {
    id: "2",
    name: "Creative Studio",
    category: "Portfolio",
    imageUrl: "https://placehold.co/302x226",
  },
  {
    id: "3",
    name: "TechBlog",
    category: "Blog",
    imageUrl: "https://placehold.co/302x226",
    isPopular: true,
  },
  {
    id: "4",
    name: "BizPro",
    category: "Business",
    imageUrl: "https://placehold.co/302x226",
  },
  {
    id: "5",
    name: "Foodie Delight",
    category: "Restaurant",
    imageUrl: "https://placehold.co/302x226",
  },
  {
    id: "6",
    name: "PropertyHub",
    category: "Real Estate",
    imageUrl: "https://placehold.co/302x226",
  },
];

function Step1TemplateSelection({ onDataChange, initialData }: Step1Props) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
    initialData?.selectedTemplate || null
  );

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    setSelectedTemplate(templateId);

    // Prepare data to send to parent
    const stepData: Step1Data = {
      selectedTemplate: templateId,
      selectedTemplateName: template?.name,
      selectedTemplateCategory: template?.category,
      extraInfo: `Template selected at ${new Date().toLocaleTimeString()}`, // Dummy data for testing
    };

    // Send data up to parent component
    onDataChange(stepData);
  };

  // Send initial data on mount if it exists
  useEffect(() => {
    if (initialData && initialData.selectedTemplate) {
      const template = templates.find(
        (t) => t.id === initialData.selectedTemplate
      );
      onDataChange({
        ...initialData,
        selectedTemplateName: template?.name,
        selectedTemplateCategory: template?.category,
      });
    }
  }, [initialData, onDataChange]);

  return (
    <section className={styles.templateSection}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Choose Your Template</h2>
        <p className={styles.sectionDescription}>
          Select a template that best fits your needs. You can customize it
          later.
        </p>
      </header>

      <div className={styles.templateGrid}>
        {templates.map((template) => (
          <article
            key={template.id}
            className={`${styles.templateCard} ${
              selectedTemplate === template.id
                ? styles.templateCardSelected
                : ""
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className={styles.templateImage}>
              <img src={template.imageUrl} alt={template.name} />
              {template.isPopular && (
                <span className={styles.popularBadge}>Popular</span>
              )}
            </div>
            <div className={styles.templateInfo}>
              <h3 className={styles.templateName}>{template.name}</h3>
              <p className={styles.templateCategory}>{template.category}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Debug info for this step */}
      {selectedTemplate && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            ✓ Selected: {templates.find((t) => t.id === selectedTemplate)?.name}
          </p>
        </div>
      )}
    </section>
  );
}

export default Step1TemplateSelection;
