const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

router.get('/sitemap.xml', async (req, res) => {
  const articles = await Article.find({});
  const baseUrl = 'https://yourdomain.com';
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  
  // صفحات ثابت
  const staticPages = ['', '/blog', '/about'];
  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
  });
  
  // مقالات
  articles.forEach(article => {
    sitemap += `
  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <lastmod>${article.updatedAt || article.createdAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });
  
  sitemap += `
</urlset>`;
  
  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});

module.exports = router;
