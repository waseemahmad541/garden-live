import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Garden Live",
    short_name: "Garden Live",
    description: "India's First AI Powered Digital Garden Membership Platform.",
    start_url: "/",
    display: "standalone",
    background_color: "#07130D",
    theme_color: "#1F5B3A",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      },
      {
        src: "/apple-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
