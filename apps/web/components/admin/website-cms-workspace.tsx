"use client";

import * as React from "react";
import Link from "next/link";
import {
  BarChart3,
  BookOpen,
  Brush,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileImage,
  FileText,
  GalleryHorizontalEnd,
  Globe2,
  Home,
  ImagePlus,
  Mail,
  MapPin,
  Megaphone,
  Palette,
  Plus,
  Save,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Star,
  Trash2,
  Upload,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AdminPanel, AdminSectionHeader, AdminTable, StatusPill } from "@/components/admin/admin-ui";
import { Badge, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type CmsModuleKey =
  | "dashboard"
  | "branding"
  | "homepage"
  | "gallery"
  | "projects"
  | "blog"
  | "services"
  | "memberships"
  | "store"
  | "team"
  | "testimonials"
  | "contact"
  | "forms"
  | "seo"
  | "settings"
  | "media";

type CmsModule = {
  key: CmsModuleKey;
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

type UploadPreview = {
  name: string;
  url: string;
  size: string;
};

const cmsModules: CmsModule[] = [
  { key: "dashboard", label: "Dashboard", href: "/admin/website-cms", description: "Website statistics, quick actions and publishing health.", icon: BarChart3 },
  { key: "branding", label: "Branding", href: "/admin/website-cms/branding", description: "Logo, favicon, colors, tagline, footer and copyright.", icon: Palette },
  { key: "homepage", label: "Homepage Editor", href: "/admin/website-cms/homepage", description: "Hero, sections, live preview, buttons and visibility controls.", icon: Home },
  { key: "gallery", label: "Gallery Manager", href: "/admin/website-cms/gallery", description: "Albums, videos, before-after and landscape media.", icon: GalleryHorizontalEnd },
  { key: "projects", label: "Project Manager", href: "/admin/website-cms/projects", description: "Project records, gallery, location, client and category.", icon: Building2 },
  { key: "blog", label: "Blog CMS", href: "/admin/website-cms/blog", description: "Articles, categories, tags, SEO, drafts and publishing.", icon: BookOpen },
  { key: "services", label: "Service Manager", href: "/admin/website-cms/services", description: "Service icons, imagery, pricing and descriptions.", icon: Brush },
  { key: "memberships", label: "Membership Manager", href: "/admin/website-cms/memberships", description: "Plans, pricing, features, badges and active status.", icon: ShieldCheck },
  { key: "store", label: "Store CMS", href: "/admin/website-cms/store", description: "Categories, products, images, offers and featured stock.", icon: ShoppingBag },
  { key: "team", label: "Team", href: "/admin/website-cms/team", description: "Team profiles, photos, designation and experience.", icon: Users },
  { key: "testimonials", label: "Testimonials", href: "/admin/website-cms/testimonials", description: "Customer reviews, photos, ratings and video reviews.", icon: Star },
  { key: "contact", label: "Contact", href: "/admin/website-cms/contact", description: "Phone, email, WhatsApp, address, map and social links.", icon: MapPin },
  { key: "forms", label: "Forms", href: "/admin/website-cms/forms", description: "Book visit, contact, newsletter, CSV and resolution workflow.", icon: Mail },
  { key: "seo", label: "SEO", href: "/admin/website-cms/seo", description: "Metadata, OG images, keywords, robots and sitemap.", icon: Globe2 },
  { key: "settings", label: "Settings", href: "/admin/website-cms/settings", description: "Maintenance, analytics, pixels, SMTP, SMS and WhatsApp.", icon: Settings },
  { key: "media", label: "Media Library", href: "/admin/website-cms/media", description: "Folders, search, upload, delete and image replacement.", icon: FileImage }
];

const sectionNames = ["Hero", "Services", "Membership", "Projects", "Testimonials", "FAQ", "Contact"];
const formRows = [
  { Type: "Book Free Visit", Name: "Aarav Sharma", Contact: "+91 98765 43210", Source: "Homepage CTA", Status: <StatusPill>New</StatusPill> },
  { Type: "Contact Form", Name: "Meera Shah", Contact: "meera@example.com", Source: "Contact page", Status: <StatusPill>In Review</StatusPill> },
  { Type: "Newsletter", Name: "Rahul Mehta", Contact: "rahul@example.com", Source: "Footer", Status: <StatusPill>Resolved</StatusPill> }
];

export function WebsiteCmsWorkspace({ activeModule }: { activeModule: CmsModuleKey }) {
  const active = cmsModules.find((module) => module.key === activeModule) ?? cmsModules[0];
  const ActiveIcon = active.icon;
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [savedAt, setSavedAt] = React.useState("Saved just now");
  const [upload, setUpload] = React.useState<UploadPreview | null>(null);
  const [visibleSections, setVisibleSections] = React.useState(() => new Set(sectionNames));

  React.useEffect(() => {
    const handle = window.setTimeout(() => {
      setSavedAt(`Auto saved at ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`);
    }, 700);
    return () => window.clearTimeout(handle);
  }, [query, activeModule, visibleSections]);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUpload({ name: file.name, url: URL.createObjectURL(file), size: `${Math.max(1, Math.round(file.size / 1024))} KB` });
  }

  function toggleSection(name: string) {
    setVisibleSections((current) => {
      const next = new Set(current);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <div className="grid gap-6 2xl:grid-cols-[320px_1fr]">
      <AdminPanel className="2xl:sticky 2xl:top-28 2xl:self-start">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Website CMS</p>
            <h2 className="mt-1 text-xl font-semibold text-white">Management</h2>
          </div>
          <Badge tone="premium" className="bg-lime-300 text-[#06120C]">Admin</Badge>
        </div>
        <nav className="grid gap-1" aria-label="Website CMS modules">
          {cmsModules.map((module) => {
            const Icon = module.icon;
            const isActive = module.key === active.key;
            return (
              <Link key={module.key} href={module.href} className={cn("flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition", isActive ? "bg-lime-300 text-[#06120C]" : "text-emerald-50/72 hover:bg-white/10 hover:text-white")}>
                <Icon className="h-4 w-4" aria-hidden />
                {module.label}
              </Link>
            );
          })}
        </nav>
      </AdminPanel>

      <div className="space-y-6">
        <AdminPanel>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime-300 text-[#06120C]"><ActiveIcon className="h-6 w-6" aria-hidden /></span>
                <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Website CMS</p><h2 className="text-2xl font-semibold text-white">{active.label}</h2></div>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-emerald-50/65">{active.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" asChild><Link href="/" target="_blank"><Eye className="mr-2 h-4 w-4" />Live Preview</Link></Button>
              <Button><Save className="mr-2 h-4 w-4" />Save Changes</Button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <label className="relative block"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-50/45" aria-hidden /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${active.label}`} className="min-h-12 w-full rounded-2xl border border-white/10 bg-white/10 pl-11 pr-4 text-sm text-white outline-none placeholder:text-emerald-50/45 focus:border-lime-200" /></label>
            <p className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-emerald-50/65">{savedAt}</p>
          </div>
        </AdminPanel>

        {active.key === "dashboard" ? <CmsDashboard /> : null}
        {active.key === "branding" ? <BrandingEditor upload={upload} onFileChange={onFileChange} /> : null}
        {active.key === "homepage" ? <HomepageEditor visibleSections={visibleSections} onToggle={toggleSection} upload={upload} onFileChange={onFileChange} /> : null}
        {active.key === "gallery" ? <GalleryManager upload={upload} onFileChange={onFileChange} /> : null}
        {active.key === "projects" ? <ProjectManager /> : null}
        {active.key === "blog" ? <BlogCms upload={upload} onFileChange={onFileChange} /> : null}
        {active.key === "services" ? <ServiceManager /> : null}
        {active.key === "memberships" ? <MembershipManager /> : null}
        {active.key === "store" ? <StoreCms /> : null}
        {active.key === "team" ? <TeamManager upload={upload} onFileChange={onFileChange} /> : null}
        {active.key === "testimonials" ? <TestimonialsManager upload={upload} onFileChange={onFileChange} /> : null}
        {active.key === "contact" ? <ContactManager /> : null}
        {active.key === "forms" ? <FormsManager page={page} setPage={setPage} /> : null}
        {active.key === "seo" ? <SeoManager upload={upload} onFileChange={onFileChange} /> : null}
        {active.key === "settings" ? <SettingsManager /> : null}
        {active.key === "media" ? <MediaLibrary upload={upload} onFileChange={onFileChange} /> : null}
      </div>
    </div>
  );
}

export function isCmsModule(value: string): value is Exclude<CmsModuleKey, "dashboard"> {
  return cmsModules.some((module) => module.key === value && module.key !== "dashboard");
}

export function cmsModuleTitle(value: CmsModuleKey) {
  return cmsModules.find((module) => module.key === value)?.label ?? "Website CMS";
}

function CmsDashboard() {
  const stats = [["Pages", "18", FileText], ["Blogs", "3", BookOpen], ["Projects", "3", Building2], ["Gallery", "42", GalleryHorizontalEnd], ["Visitors", "12.8k", BarChart3], ["Forms", "128", Mail]] as const;
  return <><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{stats.map(([label, value, Icon]) => <AdminPanel key={label}><div className="flex items-center justify-between"><span className="text-sm font-semibold text-emerald-50/70">{label}</span><span className="grid h-11 w-11 place-items-center rounded-2xl bg-lime-300 text-[#06120C]"><Icon className="h-5 w-5" /></span></div><p className="mt-6 text-4xl font-semibold">{value}</p><p className="mt-2 text-sm text-emerald-50/58">Public website CMS metric</p></AdminPanel>)}</section><AdminPanel><AdminSectionHeader eyebrow="Quick Actions" title="Website operations" description="Common publishing actions for the Garden Live public website." /><div className="grid gap-3 md:grid-cols-4">{["Create Blog", "Upload Gallery", "Edit Homepage", "Review Forms"].map((item) => <button key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-left text-sm font-semibold text-white transition hover:bg-lime-300 hover:text-[#06120C]">{item}</button>)}</div></AdminPanel></>;
}

function BrandingEditor(props: UploadProps) { return <EditorGrid><UploadPanel title="Brand Assets" description="Upload logo, white logo, footer logo, favicon and app icon." {...props} /><AdminPanel><AdminSectionHeader eyebrow="Identity" title="Company branding" /><div className="grid gap-4 md:grid-cols-2"><CmsInput label="Company Name" defaultValue="Garden Live" /><CmsInput label="Tagline" defaultValue="India's First AI Powered Digital Garden Membership Platform" /><CmsInput label="Primary Color" type="color" defaultValue="#1F5B3A" /><CmsInput label="Secondary Color" type="color" defaultValue="#B7E66E" /><CmsInput label="Footer Text" defaultValue="Premium landscaping, AI plant care and garden memberships." /><CmsInput label="Copyright" defaultValue="Garden Live. All rights reserved." /></div></AdminPanel></EditorGrid>; }

function HomepageEditor({ visibleSections, onToggle, ...props }: UploadProps & { visibleSections: Set<string>; onToggle: (name: string) => void }) { return <EditorGrid><AdminPanel><AdminSectionHeader eyebrow="Hero Section" title="Homepage hero content" /><div className="grid gap-4"><CmsInput label="Headline" defaultValue="India's First AI Powered Digital Garden Membership Platform" /><CmsInput label="Sub Heading" defaultValue="Premium garden memberships, AI Plant Doctor, QR Plant Passport, nursery store and maintenance workflows." /><div className="grid gap-4 md:grid-cols-2"><CmsInput label="Primary Button" defaultValue="Join Membership" /><CmsInput label="Secondary Button" defaultValue="Book Free Garden Survey" /></div></div></AdminPanel><UploadPanel title="Background Media" description="Upload hero background image or video preview." {...props} /><AdminPanel className="md:col-span-2"><AdminSectionHeader eyebrow="Visibility" title="Show or hide homepage sections" description="Changes are auto-saved and reflected in the live preview workflow." /><div className="grid gap-3 md:grid-cols-4">{sectionNames.map((name) => <button key={name} onClick={() => onToggle(name)} className={cn("rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition", visibleSections.has(name) ? "border-lime-300 bg-lime-300 text-[#06120C]" : "border-white/10 bg-white/10 text-white")}>{visibleSections.has(name) ? "Visible" : "Hidden"}: {name}</button>)}</div></AdminPanel><LivePreview /></EditorGrid>; }
function GalleryManager(props: UploadProps) { return <EditorGrid><UploadPanel title="Upload Images & Videos" description="Landscape, nursery, indoor plants, videos and before-after assets." {...props} /><AdminPanel><AdminSectionHeader eyebrow="Albums" title="Gallery albums" /><AdminTable columns={["Album", "Type", "Items", "Status"]} rows={["Before / After", "Landscape Images", "Nursery Images", "Indoor Plants", "Videos"].map((name, index) => ({ Album: name, Type: index === 4 ? "Video" : "Image", Items: 8 + index, Status: <StatusPill>Active</StatusPill> }))} /></AdminPanel></EditorGrid>; }
function ProjectManager() { return <EditorGrid><CrudForm title="Add Project" fields={["Project Name", "Location", "Area", "Completion Date", "Client", "Project Category"]} /><AdminPanel><AdminSectionHeader eyebrow="Projects" title="Published project records" /><AdminTable columns={["Project", "Location", "Client", "Category", "Status"]} rows={["Luxury Villa Garden", "Rooftop Smart Garden", "Corporate Campus Greenery"].map((name, index) => ({ Project: name, Location: ["Hyderabad", "Bengaluru", "Pune"][index], Client: index === 2 ? "Corporate Facility" : "Private Residence", Category: index === 1 ? "Terrace Garden" : "Landscaping", Status: <StatusPill>Published</StatusPill> }))} /></AdminPanel></EditorGrid>; }
function BlogCms(props: UploadProps) { return <EditorGrid><CrudForm title="Add Blog" fields={["Title", "Category", "Tags", "Meta Title", "Meta Description", "Publish Status"]} /><UploadPanel title="Featured Image" description="Upload optimized blog hero and OpenGraph imagery." {...props} /><AdminPanel className="md:col-span-2"><AdminSectionHeader eyebrow="Publishing" title="Blog workflow" /><AdminTable columns={["Blog", "Category", "SEO", "Status"]} rows={["Digital Garden Memberships", "AI Plant Doctor Health Score", "Premium Rooftop Garden Design"].map((name, index) => ({ Blog: name, Category: ["Membership", "AI Plant Care", "Landscaping"][index], SEO: <StatusPill>Ready</StatusPill>, Status: <StatusPill>{index === 2 ? "Draft" : "Published"}</StatusPill> }))} /></AdminPanel></EditorGrid>; }
function ServiceManager() { return <CrudCollection title="Service Manager" fields={["Service Name", "Icon", "Image", "Starting Price", "Description"]} rows={["Landscaping", "Garden Maintenance", "Plant Nursery", "Dedicated Gardener"]} />; }
function MembershipManager() { return <CrudCollection title="Membership Manager" fields={["Plan Name", "Monthly Price", "Yearly Price", "Features", "Popular Badge", "Enabled"]} rows={["Plant Care", "Smart Garden", "Home Garden", "Premium Garden", "Luxury Garden"]} />; }
function StoreCms() { return <CrudCollection title="Store CMS" fields={["Category", "Product", "Image", "Price", "Stock", "Offer", "Featured Product"]} rows={["Indoor Plants", "Palm Collection", "Pots & Planters", "Fertilizers"]} />; }
function TeamManager(props: UploadProps) { return <EditorGrid><CrudForm title="Add Team Member" fields={["Name", "Designation", "Experience", "Bio"]} /><UploadPanel title="Team Photo" description="Upload professional team member photos." {...props} /></EditorGrid>; }
function TestimonialsManager(props: UploadProps) { return <EditorGrid><CrudForm title="Add Testimonial" fields={["Customer Name", "Rating", "Review", "Video Review URL"]} /><UploadPanel title="Customer Photo" description="Upload customer photo or video thumbnail." {...props} /></EditorGrid>; }
function ContactManager() { return <AdminPanel><AdminSectionHeader eyebrow="Contact" title="Public contact details" /><div className="grid gap-4 md:grid-cols-2">{["Phone", "Email", "WhatsApp", "Address", "Google Map", "Instagram", "Facebook", "LinkedIn"].map((field) => <CmsInput key={field} label={field} defaultValue={field === "Email" ? "hello@gardenlive.in" : ""} />)}</div></AdminPanel>; }
function FormsManager({ page, setPage }: { page: number; setPage: (page: number) => void }) { return <AdminPanel><div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"><AdminSectionHeader eyebrow="Forms" title="Public form submissions" description="Book Free Visit, Contact Form and Newsletter workflows." /><Button variant="secondary"><Download className="mr-2 h-4 w-4" />Download CSV</Button></div><AdminTable columns={["Type", "Name", "Contact", "Source", "Status"]} rows={formRows} /><div className="mt-5 flex items-center justify-between"><Button variant="secondary" disabled={page === 1} onClick={() => setPage(Math.max(1, page - 1))}><ChevronLeft className="mr-2 h-4 w-4" />Previous</Button><span className="text-sm text-emerald-50/65">Page {page}</span><Button variant="secondary" onClick={() => setPage(page + 1)}>Next<ChevronRight className="ml-2 h-4 w-4" /></Button></div></AdminPanel>; }
function SeoManager(props: UploadProps) { return <EditorGrid><AdminPanel><AdminSectionHeader eyebrow="SEO" title="Metadata and indexation" /><div className="grid gap-4"><CmsInput label="Meta Title" defaultValue="Garden Live - AI Powered Digital Garden Membership Platform" /><CmsInput label="Meta Description" defaultValue="Premium garden membership, AI Plant Doctor, landscaping, nursery store and QR Plant Passport platform." /><CmsInput label="Keywords" defaultValue="garden membership, landscaping India, AI plant doctor, plant nursery" /><CmsSelect label="Robots" defaultValue="index,follow" options={[{ label: "index,follow", value: "index,follow" }, { label: "noindex,nofollow", value: "noindex,nofollow" }]} /><CmsInput label="Sitemap URL" defaultValue="https://gardenlive.in/sitemap.xml" /></div></AdminPanel><UploadPanel title="OG Image" description="Upload social preview image for sharing." {...props} /></EditorGrid>; }
function SettingsManager() { return <CrudCollection title="Website Settings" fields={["Maintenance Mode", "Google Analytics", "Facebook Pixel", "Google Tag Manager", "SMTP", "SMS", "WhatsApp"]} rows={["Analytics", "Email", "SMS", "WhatsApp"]} />; }
function MediaLibrary(props: UploadProps) { return <EditorGrid><UploadPanel title="Media Upload" description="Upload, replace and organize reusable website media." {...props} /><AdminPanel><AdminSectionHeader eyebrow="Folders" title="Media folders" /><AdminTable columns={["Folder", "Assets", "Actions", "Status"]} rows={["Hero", "Projects", "Services", "Blog", "Testimonials", "Plants", "Team", "Logos"].map((folder, index) => ({ Folder: folder, Assets: 3 + index, Actions: <span className="inline-flex gap-2"><Trash2 className="h-4 w-4" /> Replace</span>, Status: <StatusPill>Ready</StatusPill> }))} /></AdminPanel></EditorGrid>; }

type UploadProps = { upload: UploadPreview | null; onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void; };
function UploadPanel({ title, description, upload, onFileChange }: UploadProps & { title: string; description: string }) { return <AdminPanel><AdminSectionHeader eyebrow="Upload" title={title} description={description} /><label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/[0.055] p-6 text-center transition hover:border-lime-300 hover:bg-white/[0.09]"><ImagePlus className="h-10 w-10 text-lime-200" aria-hidden /><span className="mt-4 text-sm font-semibold text-white">Drop files here or choose from device</span><span className="mt-1 text-xs text-emerald-50/55">Images, video previews, icons and PDFs</span><input type="file" accept="image/*,video/*,.pdf" className="sr-only" onChange={onFileChange} /></label>{upload ? <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3"><span className="h-14 w-14 rounded-xl bg-cover bg-center" style={{ backgroundImage: `url(${upload.url})` }} aria-hidden /><div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{upload.name}</p><p className="text-xs text-emerald-50/55">{upload.size} ready for preview</p></div><CheckCircle2 className="ml-auto h-5 w-5 text-lime-200" /></div> : null}</AdminPanel>; }
function EditorGrid({ children }: { children: React.ReactNode }) { return <section className="grid gap-6 md:grid-cols-2">{children}</section>; }
function CmsInput({ label, className, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) { return <label className="block"><span className="mb-1.5 block text-[13px] font-semibold text-emerald-50/78">{label}</span><input className={cn("min-h-11 w-full rounded-2xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none transition placeholder:text-emerald-50/45 focus:border-lime-200", props.type === "color" && "h-12 p-1", className)} {...props} /></label>; }
function CmsTextarea({ label, className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) { return <label className="block"><span className="mb-1.5 block text-[13px] font-semibold text-emerald-50/78">{label}</span><textarea className={cn("min-h-28 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-emerald-50/45 focus:border-lime-200", className)} {...props} /></label>; }
function CmsSelect({ label, options, className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: Array<{ label: string; value: string }> }) { return <label className="block"><span className="mb-1.5 block text-[13px] font-semibold text-emerald-50/78">{label}</span><select className={cn("min-h-11 w-full rounded-2xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none transition focus:border-lime-200", className)} {...props}>{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>; }
function CrudForm({ title, fields }: { title: string; fields: string[] }) { return <AdminPanel><AdminSectionHeader eyebrow="Editor" title={title} /><div className="grid gap-4">{fields.map((field) => field === "Description" || field === "Features" ? <CmsTextarea key={field} label={field} defaultValue="" /> : <CmsInput key={field} label={field} defaultValue="" />)}</div><div className="mt-5 flex flex-wrap gap-2"><Button><Plus className="mr-2 h-4 w-4" />Add</Button><Button variant="secondary"><Upload className="mr-2 h-4 w-4" />Upload Media</Button></div></AdminPanel>; }
function CrudCollection({ title, fields, rows }: { title: string; fields: string[]; rows: string[] }) { return <EditorGrid><CrudForm title={title} fields={fields} /><AdminPanel><AdminSectionHeader eyebrow="Records" title={`${title} records`} /><AdminTable columns={["Name", "Status", "Featured", "Actions"]} rows={rows.map((row, index) => ({ Name: row, Status: <StatusPill>{index === 1 ? "Draft" : "Enabled"}</StatusPill>, Featured: index === 0 ? "Yes" : "No", Actions: <span className="inline-flex items-center gap-2 text-lime-200"><Megaphone className="h-4 w-4" /> Edit</span> }))} /></AdminPanel></EditorGrid>; }
function LivePreview() { return <AdminPanel className="md:col-span-2"><AdminSectionHeader eyebrow="Live Preview" title="Homepage preview" description="A safe visual preview of hero, modules, membership, projects, FAQ and contact blocks." /><div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#07130D]"><div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-red-300" /><span className="h-3 w-3 rounded-full bg-yellow-300" /><span className="h-3 w-3 rounded-full bg-lime-300" /></div><span className="text-xs text-emerald-50/50">gardenlive.in</span></div><div className="grid gap-4 p-5 lg:grid-cols-[1.1fr_0.9fr]"><div className="rounded-3xl bg-gradient-to-br from-emerald-900 to-black p-8"><Badge tone="premium" className="bg-white/15 text-white">Garden Live</Badge><h3 className="mt-5 max-w-xl text-4xl font-semibold">India's First AI Powered Digital Garden Membership Platform</h3><p className="mt-4 text-sm leading-6 text-emerald-50/70">Hero, AI Plant Doctor, memberships, projects and contact sections are previewed before publish.</p></div><div className="grid gap-3">{["AI Plant Doctor", "QR Plant Passport", "Membership Plans"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm font-semibold">{item}</div>)}</div></div></div></AdminPanel>; }
