/**
 * Shared site build data interfaces.
 * Keep stable so both preview + publish use same contract.
 */
export interface SiteTemplateMeta {
  id: string;
  name: string;
  category?: string;
}

export type SiteContentBlockType = "text" | "image";

export interface SiteContentBlock {
  id: string;
  type: SiteContentBlockType;
  content: string; // text or image URL
}

export interface SiteContentSection {
  id: string;
  layout: "single" | "split";
  blocks: SiteContentBlock[];
}

export interface SiteBuildData {
  siteName: string;
  template?: SiteTemplateMeta;
  fontFamily: string;
  sections: SiteContentSection[];
  primaryColor?: string;
  secondaryColor?: string;
  generatedAt?: string;
}

export interface PublishResult {
  html: string;
  bytes: number;
}
