import type { Metadata } from "next";
import { ApiDocsView } from "@/packages/api-docs";

export const metadata: Metadata = {
  title: "API reference — My Health",
  description: "Live HTTP API catalog served from my-health-open-source-express-server.",
};

export default function ApiDocsPage() {
  return <ApiDocsView />;
}
