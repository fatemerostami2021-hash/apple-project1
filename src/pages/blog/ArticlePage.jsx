import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiOutlineClock, HiOutlineCalendar, HiOutlineEye, HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

import { getHeroImages, getGalleryImages } from "../../constants/ArticleData";
import { useArticle, useViews, useActiveHeading } from "../../hooks/useArticlePage";
import { ReadingProgressBar, ArticleSkeleton, ErrorState, ShareButtons } from "../../components/ui/ArticleUI";
import { HeroSlider, AnimatedWave } from "../../components/article/HeroComponents";
import { Sidebar } from "../../components/article/ArticleSections";
import ArticleContent from "../../components/article/ArticleContent";

const CinematicGallery = lazy(() =>
  import("../../components/article/ArticleSections").then((m) => ({ default: m.CinematicGallery }))
);
const VideoSection = lazy(() =>
  import("../../components/article/ArticleSections").then((m) => ({ default: m.VideoSection }))
);
const CommentsSection = lazy(() =>
  import("../../components/article/ArticleSections").then((m) => ({ default: m.CommentsSection }))
);

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,700;14..32,800&display=swap');

.ap-wrap {
  background: radial-gradient(ellipse at 0% 0%, #0a0a0a 0%, #0f0f0f 50%, #050505 100%);
  color: #e2e8f0;
  font-family: 'Inter', 'IRANSans', Tahoma, sans-serif;
  position: relative;
  overflow-x: hidden;
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
.ap-article-content {
  background: rgba(15,20,30,0.35);
  backdrop-filter: blur(12px);
  border-radius: 28px;
  padding: 1.5rem;
  border: 1px solid rgba(245,158,11,0.25);
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
  overflow: hidden;
}
.ap-article-content h1 {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  background: linear-gradient(135deg,#fff 0%,#f59e0b 50%,#ffedd5 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}
.ap-article-content h2 {
  font-size: clamp(1.3rem, 2.5vw, 1.8rem);
  font-weight: 800;
  margin: 2rem 0 1rem;
  color: #f59e0b;
  border-left: 4px solid #f59e0b;
  padding-left: 1rem;
  border-radius: 0;
}
.ap-article-content h3 {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: 700;
  margin: 1.5rem 0 0.75rem;
  color: #fbbf24;
}
.ap-article-content p {
  margin-bottom: 1.2rem;
  line-height: 1.85;
  color: #e2e8f0;
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
}
.ap-article-content strong { color: #f59e0b; font-weight: 800; }
.ap-article-content ul, .ap-article-content ol {
  background: rgba(245,158,11,0.05);
  border-radius: 20px;
  padding: 1rem 1.8rem;
  margin: 1rem 0;
}
.ap-article-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: rgba(0,0,0,0.3);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(245,158,11,0.3);
}
.ap-article-content th {
  background: linear-gradient(135deg,#f59e0b,#d97706);
  color: #000;
  font-weight: 800;
  padding: 12px;
}
.ap-article-content td {
  border: 1px solid rgba(245,158,11,0.2);
  padding: 10px;
  color: #e2e8f0;
}

/* ===== Hero Section ===== */
.ap-hero {
  position: relative;
  width: 100%;
  height: 55vh;
  min-height: 350px;
  overflow: hidden;
}
@media (min-width: 768px) {
  .ap-hero {
    height: 65vh;
    min-height: 450px;
  }
}

.ap-hero-back-btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 30;
}
@media (min-width: 768px) {
  .ap-hero-back-btn {
    top: 1.5rem;
    left: 1.5rem;
  }
}
.ap-hero-back-btn a {
  color: rgba(255,255,255,.8);
  text-decoration: none;
  font-size: .75rem;
  backdrop-filter: blur(8px);
  background: rgba(0,0,0,0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.3s;
}
@media (min-width: 768px) {
  .ap-hero-back-btn a {
    font-size: .85rem;
    padding: 0.5rem 1rem;
  }
}
.ap-hero-back-btn a:hover {
  background: #f59e0b;
  color: #000;
}

.ap-hero-meta {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding: 1.5rem 1rem;
  background: linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 100%);
}
@media (min-width: 640px) {
  .ap-hero-meta {
    padding: 1.5rem 2rem;
  }
}
@media (min-width: 1024px) {
  .ap-hero-meta {
    padding: 2rem 3rem;
  }
}

.ap-hero-brand {
  font-size: .65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #f59e0b;
  letter-spacing: .1em;
}
@media (min-width: 768px) {
  .ap-hero-brand {
    font-size: .75rem;
  }
}

.ap-hero-title {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.2;
  margin: .3rem 0;
  text-shadow: 0 2px 15px rgba(0,0,0,.5);
}
@media (min-width: 768px) {
  .ap-hero-title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin: .5rem 0;
  }
}

.ap-hero-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  font-size: .65rem;
  color: rgba(255,255,255,.6);
}
@media (min-width: 768px) {
  .ap-hero-info {
    gap: 1.2rem;
    font-size: .8rem;
  }
}

.ap-hero-info span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* ===== Body ===== */
.ap-body {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
@media (min-width: 640px) {
  .ap-body {
    padding: 1.5rem;
  }
}
@media (min-width: 1024px) {
  .ap-body {
    padding: 2rem 2rem;
  }
}

.ap-cols {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
@media (min-width: 900px) {
  .ap-cols {
    flex-direction: row;
    gap: 2rem;
  }
}

.ap-main {
  flex: 1;
  min-width: 0;
  width: 100%;
}

.ap-sidebar {
  width: 100%;
  flex-shrink: 0;
}
@media (min-width: 900px) {
  .ap-sidebar {
    width: 300px;
  }
}
@media (min-width: 1024px) {
  .ap-sidebar {
    width: 340px;
  }
}

.ap-tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin-bottom: 1rem;
}
.ap-tag-chip {
  font-size: .65rem;
  font-weight: 600;
  color: #f59e0b;
  border: 1px solid #f59e0b;
  padding: .2rem .8rem;
  border-radius: 2rem;
  transition: all 0.3s;
}
.ap-tag-chip:hover {
  background: #f59e0b;
  color: #000;
}

.ap-share-row {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,.1);
}
@media (min-width: 640px) {
  .ap-share-row {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

/* ===== Gallery & Video ===== */
.ap-media-section {
  margin-top: 2rem;
}

.swiper-pagination-bullet {
  background: rgba(245,158,11,0.6) !important;
}
.swiper-pagination-bullet-active {
  background: #f59e0b !important;
  width: 24px !important;
  border-radius: 12px !important;
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #1f2937; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 10px; }

@media(prefers-reduced-motion:reduce) {
  .ap-wrap::before { animation: none; }
}

/* ===== Responsive Images ===== */
.ap-article-content img {
  max-width: 100%;
  height: auto;
  border-radius: 16px;
}

/* ===== Video Responsive ===== */
.ap-article-content iframe,
.ap-article-content video {
  max-width: 100%;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 16px;
}

/* ===== Mobile Optimizations ===== */
@media (max-width: 640px) {
  .ap-article-content {
    padding: 1rem;
    border-radius: 20px;
  }
  .ap-article-content ul,
  .ap-article-content ol {
    padding: 0.8rem 1.2rem;
  }
  .ap-article-content table {
    font-size: 0.8rem;
  }
  .ap-article-content th,
  .ap-article-content td {
    padding: 6px 8px;
  }
}
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

  const fallbackHeroImages = heroImages.length > 0 ? heroImages : (article.cover ? [article.cover] : []);

  return (
    <div className="ap-wrap" dir={isRtl ? "rtl" : "ltr"}>
      <style>{STYLES}</style>
      <ReadingProgressBar />

      {/* ===== Hero Section ===== */}
      <div className="ap-hero">
        <HeroSlider images={fallbackHeroImages} lang={lang} />
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
            <span>
              <HiOutlineCalendar size={12} aria-hidden="true" />
              {article.publishDate?.slice(0, 10)}
            </span>
            <span>
              <HiOutlineClock size={12} aria-hidden="true" />
              {article.readTime} {isRtl ? "دقیقه" : "min"}
            </span>
            <span>
              <HiOutlineEye size={12} aria-hidden="true" />
              {views}
            </span>
          </div>
        </div>
      </div>

      {/* ===== Body ===== */}
      <div className="ap-body">
        <div className="ap-cols">
          {/* ===== Main Content ===== */}
          <main className="ap-main">
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

            {/* ===== Gallery, Video, Comments ===== */}
            <div className="ap-media-section">
              <Suspense fallback={<div className="h-48 bg-gray-900/30 rounded-xl animate-pulse" />}>
                {galleryImages.length > 0 && (
                  <CinematicGallery images={galleryImages} isRtl={isRtl} />
                )}
                <VideoSection slug={slug} isRtl={isRtl} />
                <CommentsSection articleSlug={slug} isRtl={isRtl} />
              </Suspense>
            </div>

            <div className="mt-10 pt-4 text-center">
              <Link
                to="/blog"
                className="text-sm text-gray-500 hover:text-amber-500 transition inline-flex items-center gap-2"
              >
                {isRtl ? (
                  <><HiOutlineArrowRight size={14} /><span>بازگشت به بلاگ</span></>
                ) : (
                  <><HiOutlineArrowLeft size={14} /><span>Back to Blog</span></>
                )}
              </Link>
            </div>
          </main>

          {/* ===== Sidebar ===== */}
          <aside className="ap-sidebar">
            <Sidebar
              article={article}
              activeId={activeId}
              views={views}
              isRtl={isRtl}
            />
          </aside>
        </div>
      </div>

      <AnimatedWave />
    </div>
  );
}