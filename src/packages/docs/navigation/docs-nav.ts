import { DOCS_GETTING_STARTED_PATH, DOCS_API_PATH, DOCS_PATH } from "@/config/routes";

export type DocsSidebarLeaf = {
  name: string;
  href: string;
};

export type DocsNavLabel = {
  kind: "label";
  text: string;
};

export type DocsNavLink = {
  kind: "link";
  name: string;
  href: string;
};

export type DocsNavEntry = DocsNavLabel | DocsNavLink;

/**
 * Guides column for the docs sidebar (single source of truth).
 */
export const DOCS_NAV_ENTRIES: DocsNavEntry[] = [
  { kind: "link", name: "Overview", href: DOCS_PATH },
  { kind: "label", text: "Guides" },
  { kind: "link", name: "Getting started", href: DOCS_GETTING_STARTED_PATH },
  { kind: "link", name: "API reference", href: DOCS_API_PATH },
];
