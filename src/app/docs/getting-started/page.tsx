import type { Metadata } from "next";
import { GettingStartedPage } from "@/packages/docs/getting-started-page";

export const metadata: Metadata = {
  title: "Getting started — My Health",
  description:
    "Run the My Health web app and Express API locally: clone both repos, configure env, and smoke-test the stack.",
};

export default function GettingStartedRoutePage() {
  return <GettingStartedPage />;
}
