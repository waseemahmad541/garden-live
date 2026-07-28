import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebsiteCmsWorkspace, cmsModuleTitle, isCmsModule } from "@/components/admin/website-cms-workspace";
import { AdminShell } from "@/components/admin/admin-ui";

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

  return {
    title: `${cmsModuleTitle(params.module)} | Website CMS | Garden Live Admin`,
    description: `Manage ${cmsModuleTitle(params.module)} inside the Garden Live Website CMS.`,
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
