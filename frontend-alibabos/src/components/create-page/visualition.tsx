"use client";
import React, { useMemo, useState, useEffect } from "react";
import { generateSiteHtml } from "./createHTMLWebsite";
import { SiteBuildData } from "@/lib/createSiteEntities";
import styles from "@/style/createPage.module.css";

interface SiteVisualizationProps {
  buildData: SiteBuildData;
}

function SiteVisualization({ buildData }: SiteVisualizationProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const html = useMemo(
    () => generateSiteHtml(buildData),
    [buildData, refreshKey]
  );

  useEffect(() => {
    // Could add analytics or diff logic later
  }, [html]);

  return (
    <div className={styles.siteVisualizationWrapper}>
      <div className={styles.siteVisualizationControls}>
        <span className={styles.siteVisualizationLabel}>Live Preview</span>
        <div className={styles.siteVisualizationButtons}>
          <button
            type="button"
            className={styles.siteVisualizationButton}
            onClick={() => setRefreshKey((k) => k + 1)}
          >
            Refresh
          </button>
          <button
            type="button"
            className={styles.siteVisualizationButton}
            onClick={() => {
              const blob = new Blob([html], { type: "text/html" });
              const url = URL.createObjectURL(blob);
              window.open(url, "_blank", "noopener,noreferrer");
            }}
          >
            Open Tab
          </button>
        </div>
      </div>
      <iframe
        key={refreshKey}
        sandbox="allow-same-origin"
        className={styles.siteVisualizationFrame}
        srcDoc={html}
        title="Site Preview"
        style={{
          width: "100%",
          minHeight: 900,
          background: "#fff",
          display: "block",
          overflow: "auto", // Allow scrolling inside iframe
        }}
      />
    </div>
  );
}

export default SiteVisualization;
