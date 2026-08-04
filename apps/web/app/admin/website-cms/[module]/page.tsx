import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-ui";
import { cmsModuleTitle, isCmsModule } from "@/components/admin/website-cms-config";
import { WebsiteCmsWorkspace } from "@/components/admin/website-cms-workspace";

export const dynamic = "force-dynamic";

type WebsiteCmsModulePageProps = {
  params: {
    module: string;
  };
};

export function generateMetadata({ params }: WebsiteCmsModulePageProps): Metadata {
  if (!isCmsModule(params.module)) {
    return { title: "Website CMS | Garden Live Admin", robots: { index: false, follow: false } };
  }

  const title = cmsModuleTitle(params.module);

  return {
    title: `${title} | Website CMS | Garden Live Admin`,
    description: `Manage ${title} inside the Garden Live Website CMS.`,
    robots: { index: false, follow: false }
  };
}

export default async function WebsiteCmsModulePage({ params }: WebsiteCmsModulePageProps) {
  if (!isCmsModule(params.module)) notFound();

  const title = cmsModuleTitle(params.module);

  return (
    <AdminShell
      active="/admin/website-cms"
      title={title}
      description="Role-protected website management for the Garden Live public website."
      userLabel="Website Admin"
    >
      <WebsiteCmsWorkspace activeModule={params.module} />
    </AdminShell>
  );
}
