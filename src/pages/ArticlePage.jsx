import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiOutlineClock, HiOutlineCalendar, HiOutlineEye, HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

import { getHeroImages, getGalleryImages } from "../constants/articleData";
import { useArticle, useViews, useActiveHeading } from "../hooks/useArticlePage";
import { ReadingProgressBar, ArticleSkeleton, ErrorState, ShareButtons } from "../components/ui/ArticleUI";
import { HeroSlider, AnimatedWave } from "../components/article/HeroComponents";
import { Sidebar } from "../components/article/ArticleSections";
import ArticleContent from "../components/article/ArticleContent";

const CinematicGallery = lazy(() =>
  import("../components/article/ArticleSections").then((m) => ({ default: m.CinematicGallery }))
);
const VideoSection = lazy(() =>
  import("../components/article/ArticleSections").then((m) => ({ default: m.VideoSection }))
);
const CommentsSection = lazy(() =>
  import("../components/article/ArticleSections").then((m) => ({ default: m.CommentsSection }))
);

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,700;14..32,800&display=swap');

.ap-wrap {
  background: radial-gradient(ellipse at 0% 0%, #0a0a0a 0%, #0f0f0f 50%, #050505 100%);
  color: #e2e8f0;
  font-family: 'Inter', 'IRANSans', Tahoma, sans-serif;
  position: relative;
}
.ap-wrap::before {
  content: '';
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  background:
    radial-gradient(circle at 30% 40%, rgba(245,158,11,0.07) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(234,179,8,0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
  animation: bgMove 20s ease-in-out infinite;
}
@keyframes bgMove {
  0%,100% { transform: translate(0,0); }
  50%     { transform: translate(3%,2%); }
}
.ap-article-content { background: rgba(15,20,30,0.35); backdrop-filter: blur(12px); border-radius: 28px; padding: 2rem; border: 1px solid rgba(245,158,11,0.25); box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05); }
.ap-article-content h1 { font-size: 2.2rem; font-weight: 800; background: linear-gradient(135deg,#fff 0%,#f59e0b 50%,#ffedd5 100%); background-clip: text; -webkit-background-clip: text; color: transparent; margin-bottom: 1.5rem; }
.ap-article-content h2 { font-size: 1.6rem; font-weight: 700; margin: 2rem 0 1rem; color: #f59e0b; border-left: 4px solid #f59e0b; padding-left: 1rem; }
.ap-article-content h3 { font-size: 1.3rem; font-weight: 600; margin: 1.5rem 0 0.75rem; color: #fbbf24; }
.ap-article-content p  { margin-bottom: 1.2rem; line-height: 1.85; color: #e2e8f0; }
.ap-article-content strong { color: #f59e0b; font-weight: 800; }
.ap-article-content ul, .ap-article-content ol { background: rgba(245,158,11,0.05); border-radius: 20px; padding: 1rem 1.8rem; margin: 1rem 0; }
.ap-article-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; background: rgba(0,0,0,0.3); border-radius: 16px; overflow: hidden; border: 1px solid rgba(245,158,11,0.3); }
.ap-article-content th { background: linear-gradient(135deg,#f59e0b,#d97706); color: #000; font-weight: 800; padding: 12px; }
.ap-article-content td { border: 1px solid rgba(245,158,11,0.2); padding: 10px; color: #e2e8f0; }
.ap-hero { position: relative; width: 100%; height: 65vh; min-height: 500px; overflow: hidden; }
.ap-hero-back-btn { position: absolute; top: 1.5rem; left: 1.5rem; z-index: 30; }
.ap-hero-back-btn a { color: rgba(255,255,255,.8); text-decoration: none; font-size: .85rem; backdrop-filter: blur(8px); background: rgba(0,0,0,0.3); padding: 0.5rem 1rem; border-radius: 2rem; display: inline-flex; align-items: center; gap: 0.4rem; transition: all 0.3s; }
.ap-hero-back-btn a:hover { background: #f59e0b; color: #000; }
.ap-hero-meta { position: absolute; bottom: 0; left: 0; right: 0; z-index: 20; padding: 2rem; background: linear-gradient(to top,rgba(0,0,0,.85) 0%,transparent 100%); }
.ap-hero-brand { font-size: .75rem; font-weight: 700; text-transform: uppercase; color: #f59e0b; letter-spacing: .1em; }
.ap-hero-title { font-size: clamp(1.5rem,4vw,2.8rem); font-weight: 900; color: #fff; line-height: 1.3; margin: .5rem 0; text-shadow: 0 2px 15px rgba(0,0,0,.5); }
.ap-hero-info { display: flex; gap: 1.2rem; font-size: .8rem; color: rgba(255,255,255,.6); flex-wrap: wrap; }
.ap-body { max-width: 1000px; margin: 0 auto; padding: 2rem 1rem; }
.ap-cols { display: flex; flex-direction: column; gap: 2rem; }
@media(min-width:900px) { .ap-cols { flex-direction: row; } }
.ap-tags-row { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1.5rem; }
.ap-tag-chip { font-size: .7rem; font-weight: 600; color: #f59e0b; border: 1px solid #f59e0b; padding: .2rem .8rem; border-radius: 2rem; transition: all 0.3s; }
.ap-tag-chip:hover { background: #f59e0b; color: #000; }
.ap-share-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,.1); }
.swiper-pagination-bullet { background: rgba(245,158,11,0.6) !important; }
.swiper-pagination-bullet-active { background: #f59e0b !important; width: 24px !important; border-radius: 12px !important; }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #1f2937; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 10px; }
@media(prefers-reduced-motion:reduce) { .ap-wrap::before { animation: none; } }
`;

export default function ArticlePage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";
  const isRtl = lang === "fa";

  const { article, loading, error } = useArticle(slug);
  const views = useViews(slug);
  const activeId = useActiveHeading(article);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 180], [1, 0]);

  if (loading) return <ArticleSkeleton />;
  if (error || !article) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

  const heroImages = getHeroImages(slug);
  const galleryImages = getGalleryImages(slug);
  const title = article.title?.[lang] || article.title;

  return (
    <div className="ap-wrap" dir={isRtl ? "rtl" : "ltr"}>
      <style>{STYLES}</style>
      <ReadingProgressBar />

      <div className="ap-hero">
        <HeroSlider images={heroImages} lang={lang} />
        <motion.div style={{ opacity: heroOpacity }} className="ap-hero-back-btn">
          <Link to="/blog">
            {isRtl ? <HiOutlineArrowRight size={14} /> : <HiOutlineArrowLeft size={14} />}
            {isRtl ? "بازگشت" : "Back"}
          </Link>
        </motion.div>
        <div className="ap-hero-meta">
          <div className="ap-hero-brand">{article.brand}</div>
          <h1 className="ap-hero-title">{title}</h1>
          <div className="ap-hero-info">
            <span><HiOutlineCalendar size={12} className="inline mr-1" />{article.publishDate?.slice(0, 10)}</span>
            <span><HiOutlineClock size={12} className="inline mr-1" />{article.readTime} دقیقه</span>
            <span><HiOutlineEye size={12} className="inline mr-1" />{views}</span>
          </div>
        </div>
      </div>

      <div className="ap-body">
        <div className="ap-cols">
          <main className="flex-1 min-w-0">
            <div className="ap-share-row">
              <div className="ap-tags-row">
                {article.tags?.slice(0, 5).map((t) => (
                  <span key={t} className="ap-tag-chip">#{t}</span>
                ))}
              </div>
              <ShareButtons url={window.location.href} title={title} isRtl={isRtl} />
            </div>

            <div className="ap-article-content">
              <ArticleContent content={article.content?.[lang]} isRtl={isRtl} />
            </div>

            <Suspense fallback={<div className="h-48 bg-gray-900/30 rounded-xl animate-pulse mt-10" />}>
              {galleryImages.length > 0 && <CinematicGallery images={galleryImages} isRtl={isRtl} />}
              <VideoSection slug={slug} isRtl={isRtl} />
              <CommentsSection articleSlug={slug} isRtl={isRtl} />
            </Suspense>

            <div className="mt-10 pt-4 text-center">
              <Link to="/blog" className="text-sm text-gray-500 hover:text-amber-500 transition inline-flex items-center gap-2">
                {isRtl ? <><HiOutlineArrowRight size={14} /><span>بازگشت به بلاگ</span></> : <><HiOutlineArrowLeft size={14} /><span>Back to Blog</span></>}
              </Link>
            </div>
          </main>

          <Sidebar article={article} activeId={activeId} views={views} isRtl={isRtl} />
        </div>
      </div>

      <AnimatedWave />
    </div>
  );
}
