import {
  SiteBuildData,
  PublishResult,
  SiteContentSection,
  SiteContentBlock,
} from "@/lib/createSiteEntities";
import { templateCss } from "@/style/templateStyle";

// Helper: get template class from template name or id
function getTemplateClass(template?: { name?: string; id?: string }) {
  if (!template) return "";
  // Map template name/id to CSS class
  const name = template.name?.toLowerCase() || "";
  if (name.includes("modernshop")) return "template-modernshop";
  if (name.includes("creative")) return "template-creative";
  if (name.includes("techblog")) return "template-techblog";
  if (name.includes("bizpro")) return "template-bizpro";
  if (name.includes("foodie")) return "template-foodie";
  if (name.includes("propertyhub")) return "template-propertyhub";
  return "";
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeFont(font: string): string {
  const allowed = [
    "Inter",
    "Roboto",
    "Playfair Display",
    "Montserrat",
    "Open Sans",
    "JetBrains Mono",
  ];
  return allowed.includes(font) ? font : "Inter";
}

/**
 * Injects template CSS into the <style> tag of a generated HTML string.
 * @param html The HTML string to inject CSS into.
 * @param css The CSS string to inject.
 * @returns The HTML string with CSS injected.
 */
export function injectTemplateCss(html: string, css: string): string {
  return html.replace(
    /<style>([\s\S]*?)<\/style>/,
    `<style>$1\n${css}\n</style>`
  );
}

export function generateSiteHtml(data: SiteBuildData): string {
  const font = normalizeFont(data.fontFamily);
  const siteName = escapeHtml(data.siteName || "Untitled Site");
  const primary = data.primaryColor || "#000000";
  const secondary = data.secondaryColor || "#10b981";
  const templateName = escapeHtml(data.template?.name || "Generic Template");
  const templateClass = getTemplateClass(data.template);

  const sectionsMarkup = data.sections
    .map((section: SiteContentSection) => {
      const sectionBlocks = section.blocks
        .map((block: SiteContentBlock) => {
          if (block.type === "text") {
            return `<div class="templateText"><p>${escapeHtml(
              block.content
            )}</p></div>`;
          }
          return `<div class="templateImageBox"><img class="templateImage" src="${escapeHtml(
            block.content
          )}" alt="Section image" loading="lazy"/></div>`;
        })
        .join("");

      const layoutClass =
        section.layout === "split" ? "section-split" : "section-single";
      return `<section class="templateSection ${layoutClass}" data-section-id="${escapeHtml(
        section.id
      )}">${sectionBlocks}</section>`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${siteName}</title>
<meta name="description" content="${siteName} - Powered by AliBabos"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    font
  )}:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<style>
  :root {
    --color-primary: ${primary};
    --color-secondary: ${secondary};
    --font-base: '${font}', system-ui, sans-serif;
  }
  ${templateCss}
</style>
</head>
<body class="templateRoot ${templateClass}" style="min-height:100vh;display:flex;flex-direction:column;">
  <header class="templateTitleBox">
    <h1 class="templateTitle">${siteName}</h1>
    <span class="template-badge">${templateName}</span>
  </header>
  <main style="flex:1;">
    ${sectionsMarkup || `<p>No content sections provided.</p>`}
  </main>
  <footer class="templateFooter">
    <p>&copy; ${new Date().getFullYear()} ${siteName}. Generated with AliBabos.</p>
  </footer>
</body>
</html>`;

  return html;
}
export function buildPublishResult(data: SiteBuildData): PublishResult {
  console.log("Injected CSS:", templateCss);
  let html = generateSiteHtml({
    ...data,
    generatedAt: new Date().toISOString(),
  });
  console.log("HTML before injection:", html);
  html = injectTemplateCss(html, templateCss);
  console.log("HTML after injection:", html);
  return { html, bytes: new Blob([html]).size };
}
