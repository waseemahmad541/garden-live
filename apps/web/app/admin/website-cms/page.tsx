import type { Metadata } from "next";
import { WebsiteCmsWorkspace } from "@/components/admin/website-cms-workspace";
import { AdminShell } from "@/components/admin/admin-ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Website CMS | Garden Live Admin",
  description: "Garden Live Website CMS dashboard for public website management.",
  robots: { index: false, follow: false }
};

export default async function WebsiteCmsPage() {
  return (
    <AdminShell
      active="/admin/website-cms"
      title="Website CMS"
      description="Manage Garden Live branding, homepage, gallery, projects, blogs, services, memberships, store content, SEO and website settings."
      userLabel="Website Admin"
    >
      <WebsiteCmsWorkspace activeModule="dashboard" />
    </AdminShell>
  );
}
