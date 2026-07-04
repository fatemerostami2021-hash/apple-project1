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
import { useTheme } from "../../store/theme";

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

/* ===== Theme tokens (dark = default) ===== */
.ap-wrap {
  --ap-bg1: #0a0a0a;
  --ap-bg2: #0f0f0f;
  --ap-bg3: #050505;
  --ap-glow1: rgba(245,158,11,0.07);
  --ap-glow2: rgba(234,179,8,0.05);
  --ap-text: #e2e8f0;
  --ap-text-strong: #ffffff;
  --ap-h1-grad-end: #ffedd5;
  --ap-heading-h2: #f59e0b;
  --ap-heading-h3: #fbbf24;
  --ap-strong: #f59e0b;
  --ap-card-bg: rgba(15,20,30,0.35);
  --ap-card-border: rgba(245,158,11,0.25);
  --ap-card-shadow: 0 20px 40px -15px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
  --ap-list-bg: rgba(245,158,11,0.05);
  --ap-table-bg: rgba(0,0,0,0.3);
  --ap-table-border: rgba(245,158,11,0.3);
  --ap-td-border: rgba(245,158,11,0.2);
  --ap-td-text: #e2e8f0;
  --ap-tag-text: #f59e0b;
  --ap-tag-border: #f59e0b;
  --ap-share-border: rgba(255,255,255,0.1);
  --ap-scroll-track: #1f2937;
  --ap-skeleton-bg: rgba(17,24,39,0.5);
  --ap-back-link-text: rgba(255,255,255,0.6);

  background: radial-gradient(ellipse at 0% 0%, var(--ap-bg1) 0%, var(--ap-bg2) 50%, var(--ap-bg3) 100%);
  color: var(--ap-text);
  font-family: 'Inter', 'IRANSans', Tahoma, sans-serif;
  position: relative;
  overflow-x: hidden;
  transition: background 0.4s ease, color 0.4s ease;
}

/* ===== Theme tokens (light overrides) ===== */
.ap-wrap.ap-light {
  --ap-bg1: #ffffff;
  --ap-bg2: #f8fafc;
  --ap-bg3: #eef2f7;
  --ap-glow1: rgba(245,158,11,0.08);
  --ap-glow2: rgba(234,179,8,0.06);
  --ap-text: #3f4753;
  --ap-text-strong: #0f172a;
  --ap-h1-grad-end: #92400e;
  --ap-heading-h2: #b45309;
  --ap-heading-h3: #b45309;
  --ap-strong: #b45309;
  --ap-card-bg: rgba(255,255,255,0.55);
  --ap-card-border: rgba(245,158,11,0.35);
  --ap-card-shadow: 0 20px 40px -18px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.6);
  --ap-list-bg: rgba(245,158,11,0.08);
  --ap-table-bg: rgba(255,255,255,0.5);
  --ap-table-border: rgba(245,158,11,0.35);
  --ap-td-border: rgba(245,158,11,0.25);
  --ap-td-text: #334155;
  --ap-tag-text: #b45309;
  --ap-tag-border: #d97706;
  --ap-share-border: rgba(15,23,42,0.08);
  --ap-scroll-track: #e5e7eb;
  --ap-skeleton-bg: rgba(226,232,240,0.7);
  --ap-back-link-text: rgba(15,23,42,0.55);
}

.ap-wrap::before {
  content: '';
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  background:
    radial-gradient(circle at 30% 40%, var(--ap-glow1) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, var(--ap-glow2) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
  animation: bgMove 20s ease-in-out infinite;
}
@keyframes bgMove {
  0%,100% { transform: translate(0,0); }
  50%     { transform: translate(3%,2%); }
}
.ap-article-content {
  background: var(--ap-card-bg);
  backdrop-filter: blur(12px);
  border-radius: 28px;
  padding: 1.5rem;
  border: 1px solid var(--ap-card-border);
  box-shadow: var(--ap-card-shadow);
  overflow: hidden;
}
.ap-article-content h1 {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 900;
  background: linear-gradient(135deg, var(--ap-text-strong) 0%, #f59e0b 50%, var(--ap-h1-grad-end) 100%);
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
  color: var(--ap-heading-h2);
  border-left: 4px solid var(--ap-heading-h2);
  padding-left: 1rem;
  border-radius: 0;
}
.ap-article-content h3 {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-weight: 700;
  margin: 1.5rem 0 0.75rem;
  color: var(--ap-heading-h3);
}
.ap-article-content p {
  margin-bottom: 1.2rem;
  line-height: 1.85;
  color: var(--ap-text);
  font-size: clamp(0.95rem, 1.2vw, 1.1rem);
}
.ap-article-content strong { color: var(--ap-strong); font-weight: 800; }
.ap-article-content ul, .ap-article-content ol {
  background: var(--ap-list-bg);
  border-radius: 20px;
  padding: 1rem 1.8rem;
  margin: 1rem 0;
}
.ap-article-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: var(--ap-table-bg);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--ap-table-border);
}
.ap-article-content th {
  background: linear-gradient(135deg,#f59e0b,#d97706);
  color: #000;
  font-weight: 800;
  padding: 12px;
}
.ap-article-content td {
  border: 1px solid var(--ap-td-border);
  padding: 10px;
  color: var(--ap-td-text);
}

/* ===== Hero Section (stays dark-scrim, sits on top of a photo either way) ===== */
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
  color: var(--ap-tag-text);
  border: 1px solid var(--ap-tag-border);
  padding: .2rem .8rem;
  border-radius: 2rem;
  transition: all 0.3s;
}
.ap-tag-chip:hover {
  background: var(--ap-tag-border);
  color: #000;
}

.ap-share-row {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--ap-share-border);
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
.custom-scrollbar::-webkit-scrollbar-track { background: var(--ap-scroll-track); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 10px; }

.ap-skeleton {
  height: 12rem;
  border-radius: 16px;
  background: var(--ap-skeleton-bg);
}

.ap-back-link {
  color: var(--ap-back-link-text);
}

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
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
    <div className={`ap-wrap ${isDark ? "" : "ap-light"}`} dir={isRtl ? "rtl" : "ltr"}>
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
              <Suspense fallback={<div className="ap-skeleton animate-pulse" />}>
                {galleryImages.length > 0 && (
                  <CinematicGallery images={galleryImages} isRtl={isRtl} />
                )}

                {/* ✅ ارسال mainVideo به VideoSection */}
                <VideoSection
                  slug={slug}
                  isRtl={isRtl}
                  mainVideo={article.mainVideo}
                />

                <CommentsSection articleSlug={slug} isRtl={isRtl} />
              </Suspense>
            </div>

            <div className="mt-10 pt-4 text-center">
              <Link
                to="/blog"
                className="ap-back-link text-sm hover:text-amber-500 transition inline-flex items-center gap-2"
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