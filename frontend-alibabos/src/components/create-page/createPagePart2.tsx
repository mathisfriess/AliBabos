"use client";

import { useState, useEffect } from "react";
import styles from "@/style/createPage.module.css";

interface Step2Data {
  websiteName: string;
  logoUrl: string;
  subdomain?: string;
  completedAt?: string;
}

interface Step2Props {
  onDataChange: (data: Step2Data) => void;
  initialData?: Step2Data;
}

function Step2WebsiteName({ onDataChange, initialData }: Step2Props) {
  const [websiteName, setWebsiteName] = useState(
    initialData?.websiteName || ""
  );
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || "");
  const [completedAt] = useState(new Date().toLocaleTimeString());

  // Generate subdomain from website name
  const generateSubdomain = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const subdomain = generateSubdomain(websiteName) || "yoursite";

  // Send data to parent whenever it changes
  useEffect(() => {
    onDataChange({
      websiteName,
      logoUrl,
      subdomain,
      completedAt: websiteName ? completedAt : undefined,
    });
  }, [websiteName, logoUrl, subdomain]);

  return (
    <section className={styles.templateSection}>
      <header className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Name Your Website</h2>
        <p className={styles.sectionDescription}>
          Give your website a name and optional tagline
        </p>
      </header>

      <div className="flex flex-col items-start justify-start self-stretch rounded-2xl bg-white py-8 px-8 outline outline-1 outline-offset-[-1px] outline-black/10 max-w-[672px] mx-auto">
        <div className="flex w-full flex-col items-start justify-start gap-6">
          {/* Website Name Input */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label className="inline-flex items-center justify-start gap-2 self-stretch">
              <span className="text-sm font-medium leading-4 text-neutral-800">
                Website Name *
              </span>
            </label>
            <div className="inline-flex h-9 items-center justify-start self-stretch overflow-hidden rounded-[20px] bg-stone-50 px-3 py-1 outline outline-1 outline-offset-[-1px] outline-black/10 focus-within:outline-2 focus-within:outline-black/20 transition-all">
              <input
                type="text"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                placeholder="e.g., My Awesome Store"
                className="w-full bg-transparent text-sm text-neutral-800 placeholder-stone-500 outline-none"
              />
            </div>
          </div>

          {/* Logo URL Input */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label className="inline-flex items-center justify-start gap-2 self-stretch">
              <span className="text-sm font-medium leading-4 text-neutral-800">
                Logo URL (optional)
              </span>
            </label>
            <div className="inline-flex h-9 items-center justify-start self-stretch overflow-hidden rounded-[20px] bg-stone-50 px-3 py-1 outline outline-1 outline-offset-[-1px] outline-black/10 focus-within:outline-2 focus-within:outline-black/20 transition-all">
              <input
                type="url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full bg-transparent text-sm text-neutral-800 placeholder-stone-500 outline-none"
              />
            </div>
            <span className="text-xs leading-4 text-stone-500">
              You can upload a logo later
            </span>
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch rounded-[20px] bg-stone-50/50 px-6 py-6 mt-2">
            <h3 className="text-base font-medium leading-6 text-neutral-800">
              Preview
            </h3>
            <div className="inline-flex items-center justify-start gap-3 self-stretch">
              {/* Logo Preview */}
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo preview"
                  className="h-12 w-12 rounded-[20px] object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const gradient = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (gradient) gradient.classList.remove("hidden");
                  }}
                />
              ) : null}
              <div
                className={`h-12 w-12 rounded-[20px] bg-gradient-to-b from-indigo-400 to-emerald-200 ${
                  logoUrl ? "hidden" : ""
                }`}
              />

              {/* Text Preview */}
              <div className="inline-flex flex-col items-start justify-start">
                <span className="text-base leading-6 text-neutral-800">
                  {websiteName || "Your Website Name"}
                </span>
                <span className="text-base leading-6 text-stone-500">
                  {subdomain}.alibabos.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Debug info for this step */}
      {websiteName && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg max-w-[672px] mx-auto">
          <p className="text-sm text-green-700">
            ✓ Website Name: {websiteName}
          </p>
          <p className="text-sm text-green-700">
            ✓ Subdomain: {subdomain}.alibabos.com
          </p>
        </div>
      )}
    </section>
  );
}

export default Step2WebsiteName;
