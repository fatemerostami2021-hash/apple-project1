import { useEffect } from "react";

const BASE_URL = import.meta.env.VITE_SITE_URL || "http://localhost:5173";
const SITE_NAME = "TechCrunch | اپل و سامسونگ";

export function SEOHead({
  title,
  description,
  image,
  url,
  type = "website",
  lang = "fa",
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const ogImage = image || `${BASE_URL}/images/og-default.jpg`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name, content, prop = false) => {
      const selector = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(prop ? "property" : "name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content || "");
    };

    if (description) setMeta("description", description);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description || "", true);
    setMeta("og:image", ogImage, true);
    setMeta("og:url", fullUrl, true);
    setMeta("og:type", type, true);
    setMeta("og:site_name", SITE_NAME, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:image", ogImage);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    document.documentElement.lang = lang === "fa" ? "fa" : "en";
  }, [fullTitle, description, ogImage, fullUrl, type, lang]);

  return null;
}

export function ProductSchema({ product, lang = "fa" }) {
  useEffect(() => {
    if (!product) return;
    
    const getName = () => {
      if (typeof product.name === "object") {
        return product.name[lang] || product.name.en || "";
      }
      return product.name || "";
    };

    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: getName(),
      image: [`${BASE_URL}${product.thumbnail || product.image || ""}`],
      brand: { "@type": "Brand", name: product.brand || "TechCrunch" },
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "USD",
        availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      },
    };

    let el = document.querySelector('script[data-schema="product"]');
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-schema", "product");
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    
    return () => el?.remove();
  }, [product, lang]);

  return null;
}

export function ArticleSchema({ article, lang = "fa" }) {
  useEffect(() => {
    if (!article) return;

    const getTitle = () => {
      if (typeof article.title === "object") {
        return article.title[lang] || article.title.en || "";
      }
      return article.title || "";
    };

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: getTitle(),
      datePublished: article.publishDate || new Date().toISOString(),
      author: { "@type": "Person", name: article.author || "مدیر سایت" },
      publisher: { "@type": "Organization", name: SITE_NAME },
    };

    let el = document.querySelector('script[data-schema="article"]');
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-schema", "article");
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    
    return () => el?.remove();
  }, [article, lang]);

  return null;
}
