import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { iphoneArticles } from "../../data/iphoneArticles";

const BlogPage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-12 dark:text-white">
        {isRTL ? "آخرین اخبار و مقالات" : "Latest Articles & News"}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {iphoneArticles.map((article) => (
          <div 
            key={article.slug} 
            className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-zinc-800 transition-transform hover:scale-[1.02]"
          >
            <img 
              src={article.cover} 
              alt={article.title[i18n.language]} 
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3 dark:text-white">
                {article.title[i18n.language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
                {article.excerpt[i18n.language]}
              </p>
              <Link
                to={`/blog/${article.slug}`}
                className="inline-block w-full text-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-3 rounded-xl hover:shadow-lg transition-all"
              >
                {t("iphonePage.readMore")}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
