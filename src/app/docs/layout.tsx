import type { ReactNode } from "react";
import { getApiDocsCatalogCached } from "@/api/api-docs";
import { DocsCatalogProvider, DocsShell } from "@/packages/docs";
import { buildApiGroupSidebarChildren } from "@/utils/api-docs";

/**
 * Docs segment layout: inner sidebar + article column; loads API catalog once for sidebar + /docs/api.
 */
export default async function DocsLayout(props: { children: ReactNode }) {
  const { children } = props;
  const result = await getApiDocsCatalogCached();
  const apiGroupNav = result.ok ? buildApiGroupSidebarChildren(result.data.groups) : [];

  return (
    <DocsCatalogProvider
      catalog={result.ok ? result.data : null}
      catalogStatus={result.ok ? 200 : result.status}
    >
      <DocsShell apiGroupNav={apiGroupNav}>{children}</DocsShell>
    </DocsCatalogProvider>
  );
}
