import type { Metadata } from "next";
import { DocsOverviewPage } from "@/packages/docs/docs-overview-page";

export const metadata: Metadata = {
  title: "Documentation — My Health",
  description:
    "Self-hosted My Health documentation: local setup, wire contract, and live API reference.",
};

export default function DocsOverviewRoutePage() {
  return <DocsOverviewPage />;
}
