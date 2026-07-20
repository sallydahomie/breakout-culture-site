import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://breakoutculture.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout", "/checkout/success", "/cart"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
