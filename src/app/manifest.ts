import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "M.Y.D. Portfolio — Web Tasarımcı & Geliştirici",
    short_name: "M.Y.D. Portfolio",
    description:
      "Data Science, AI ve Full-Stack geliştirme alanlarında premium web tasarım, geliştirme ve SEO hizmetleri.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f9fa",
    theme_color: "#f8f9fa",
    icons: [
      { src: "/icon", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
