"use client";

import React from "react";
import styles from "@/style/createPage.module.css";
import SiteVisualization from "./visualition";
import { SiteBuildData } from "@/lib/createSiteEntities";

interface Step4PreviewProps {
  templateName?: string;
  siteName?: string;
  fontFamily?: string;
  buildData: SiteBuildData; // <-- add this
  onPublish?: () => void;
}

function Step4Preview({
  templateName = "—",
  siteName = "—",
  fontFamily = "Inter",
  buildData,
  onPublish,
}: Step4PreviewProps) {
  return (
    <section className={styles.templateSection}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Almost There!</h2>
        <p className={styles.sectionDescription}>
          Review your website before publishing
        </p>
      </header>

      <div className={styles.previewLayout}>
        <div className={styles.previewDetailsCard}>
          <h3 className={styles.previewSubtitle}>Website Details</h3>
          <ul className={styles.previewDetailsList}>
            <li>
              <span className={styles.previewLabel}>Template</span>
              <span className={styles.previewValue}>{templateName}</span>
            </li>
            <li>
              <span className={styles.previewLabel}>Name</span>
              <span className={styles.previewValue}>{siteName}</span>
            </li>
            <li>
              <span className={styles.previewLabel}>Font</span>
              <span className={styles.previewValue}>{fontFamily}</span>
            </li>
            <li>
              <span className={styles.previewLabel}>Publish URL</span>
              <span className={styles.previewValue}>
                {siteName
                  ? `${siteName
                      .toLowerCase()
                      .replace(/\s+/g, "-")}.alibabos.com`
                  : "—"}
              </span>
            </li>
          </ul>

          <div className={styles.previewCanvasPlaceholder}>
            <SiteVisualization buildData={buildData} />
          </div>

          <button
            className={styles.publishButton}
            onClick={() => onPublish?.()}
            type="button"
          >
            Publish Your Website
          </button>
        </div>
      </div>
    </section>
  );
}

export default Step4Preview;
