export type CmsModuleKey =
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

export type WebsiteCmsModule = {
  key: CmsModuleKey;
  label: string;
  href: string;
  description: string;
};

export const websiteCmsModules = [
  { key: "dashboard", label: "Dashboard", href: "/admin/website-cms", description: "Website statistics, pages, blogs, projects, gallery, visitors, forms and quick actions." },
  { key: "branding", label: "Branding", href: "/admin/website-cms/branding", description: "Logo, white logo, footer logo, favicon, app icon, colors, tagline and copyright." },
  { key: "homepage", label: "Homepage Editor", href: "/admin/website-cms/homepage", description: "Hero, buttons, features, statistics, memberships, projects, testimonials, FAQ, contact and live preview." },
  { key: "gallery", label: "Gallery Manager", href: "/admin/website-cms/gallery", description: "Upload images, create albums, manage before-after media, nursery images, indoor plants and videos." },
  { key: "projects", label: "Project Manager", href: "/admin/website-cms/projects", description: "Add, edit and delete projects with gallery, location, area, completion date, client and category." },
  { key: "blog", label: "Blog CMS", href: "/admin/website-cms/blog", description: "Add blog posts, categories, featured images, SEO, tags, publish and draft workflow." },
  { key: "services", label: "Service Manager", href: "/admin/website-cms/services", description: "Add services with icons, images, pricing and descriptions." },
  { key: "memberships", label: "Membership Manager", href: "/admin/website-cms/memberships", description: "Create plans, prices, features, popular badge and enable or disable status." },
  { key: "store", label: "Store CMS", href: "/admin/website-cms/store", description: "Manage categories, products, images, price, stock, offers and featured products." },
  { key: "team", label: "Team", href: "/admin/website-cms/team", description: "Add team members with designation, photo and experience." },
  { key: "testimonials", label: "Testimonials", href: "/admin/website-cms/testimonials", description: "Customer name, photo, rating, review and video review management." },
  { key: "contact", label: "Contact", href: "/admin/website-cms/contact", description: "Phone, email, WhatsApp, address, Google Map and social links." },
  { key: "forms", label: "Forms", href: "/admin/website-cms/forms", description: "Book Free Visit, Contact Form, Newsletter, CSV export and resolved status." },
  { key: "seo", label: "SEO", href: "/admin/website-cms/seo", description: "Meta title, description, OG image, keywords, robots and sitemap." },
  { key: "settings", label: "Settings", href: "/admin/website-cms/settings", description: "Maintenance mode, Google Analytics, Facebook Pixel, Tag Manager, SMTP, SMS and WhatsApp." },
  { key: "media", label: "Media Library", href: "/admin/website-cms/media", description: "Upload, folders, search, delete and replace image workflow." }
] as const satisfies readonly WebsiteCmsModule[];

export type WebsiteCmsChildModuleKey = Exclude<CmsModuleKey, "dashboard">;

export function isCmsModule(value: string): value is WebsiteCmsChildModuleKey {
  return websiteCmsModules.some((module) => module.key === value && module.key !== "dashboard");
}

export function cmsModuleTitle(value: CmsModuleKey | string) {
  return websiteCmsModules.find((module) => module.key === value)?.label ?? "Website CMS";
}
