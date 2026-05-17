import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { iphoneArticles } from "../../data/iphoneArticles";

export default function ArticlePage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const article = useMemo(
    () => iphoneArticles.find((a) => a.slug === slug),
    [slug]
  );

  if (!article) {
    return (
      <main className={`max-w-4xl mx-auto px-6 py-20 ${isRtl ? "text-right" : "text-left"}`}>
        <Helmet>
          <title>{isRtl ? "مقاله یافت نشد" : "Article Not Found"}</title>
        </Helmet>
        <p className="text-lg font-bold mb-4">{isRtl ? "مقاله یافت نشد" : "Article not found"}</p>
        <Link to="/blog" className="text-blue-600 hover:underline font-bold">
          {isRtl ? "بازگشت به لیست مقالات" : "Back to articles"}
        </Link>
      </main>
    );
  }

  const title = article.title[i18n.language];
  const description = article.excerpt[i18n.language];

  return (
    <main className={`max-w-4xl mx-auto px-6 py-16 ${isRtl ? "text-right" : "text-left"}`}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <nav className="mb-8 text-sm opacity-80">
        <Link to="/blog" className="hover:underline">
          {isRtl ? "مقالات" : "Articles"}
        </Link>
        <span className={`mx-2 ${isRtl ? "ml-2" : "mr-2"}`}>/</span>
        <span>{title}</span>
      </nav>

      <img
        src={article.cover}
        alt={title}
        className="w-full h-64 md:h-80 object-contain rounded-3xl border border-gray-200 dark:border-gray-800 p-6 mb-10 shadow-sm"
      />

      <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
        {title}
      </h1>

      <article className="text-lg opacity-90 leading-relaxed whitespace-pre-line">
        {article.content[i18n.language]}
      </article>

      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap gap-4">
        {article.relatedModelSlug && (
          <Link
            to={`/iphone/${article.relatedModelSlug}`}
            className="text-blue-600 hover:underline font-bold text-sm"
          >
            {isRtl ? "مشاهده صفحه محصول آیفون" : "View iPhone Product Page"}
          </Link>
        )}
        <Link to="/blog" className="text-blue-600 hover:underline font-bold text-sm">
          {isRtl ? "بازگشت به تمام مقالات" : "Back to All Articles"}
        </Link>
      </div>
    </main>
  );
}
