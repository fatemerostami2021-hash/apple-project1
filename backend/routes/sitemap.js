import express from "express";
import Article from "../models/Article.js";
import Product from "../models/Product.js";

const router  = express.Router();
const BASE    = process.env.SITE_URL || "https://your-domain.com";

router.get("/sitemap.xml", async (req, res, next) => {
  try {
    const [articles, products] = await Promise.all([
      Article.find({}, "slug updatedAt").lean(),
      Product.find({},  "_id updatedAt").lean(),
    ]);

    const today = new Date().toISOString().split("T")[0];

    const staticUrls = [
      { loc: BASE,           priority: "1.0", changefreq: "daily" },
      { loc: `${BASE}/blog`, priority: "0.9", changefreq: "daily" },
    ];

    const articleUrls = articles.map(a => ({
      loc:        `${BASE}/articles/${a.slug}`,
      lastmod:    a.updatedAt ? new Date(a.updatedAt).toISOString().split("T")[0] : today,
      priority:   "0.8",
      changefreq: "weekly",
    }));

    const productUrls = products.map(p => ({
      loc:        `${BASE}/product/${p._id}`,
      lastmod:    p.updatedAt ? new Date(p.updatedAt).toISOString().split("T")[0] : today,
      priority:   "0.7",
      changefreq: "weekly",
    }));

    const allUrls = [...staticUrls, ...articleUrls, ...productUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=86400");
    res.send(xml);
  } catch (err) { next(err); }
});

router.get("/robots.txt", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${BASE}/sitemap.xml`);
});

export default router;
