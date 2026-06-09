import { useState, useEffect } from "react";
import { useReadingProgress } from "../../hooks/useArticlePage";

/* ── ReadingProgressBar ──────────────────────────────────── */
export function ReadingProgressBar() {
  const progress = useReadingProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ── ArticleSkeleton ─────────────────────────────────────── */
export function ArticleSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] animate-pulse">
      {/* Hero placeholder */}
      <div className="w-full h-[65vh] min-h-[500px] bg-gray-900" />
      <div className="max-w-[1000px] mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            <div className="h-4 bg-gray-800 rounded w-2/3" />
            <div className="h-4 bg-gray-800 rounded w-full" />
            <div className="h-4 bg-gray-800 rounded w-5/6" />
            <div className="h-4 bg-gray-800 rounded w-4/6" />
            <div className="mt-8 h-4 bg-gray-800 rounded w-full" />
            <div className="h-4 bg-gray-800 rounded w-3/4" />
            <div className="h-4 bg-gray-800 rounded w-full" />
          </div>
          <div className="hidden lg:block w-72 space-y-4 flex-shrink-0">
            <div className="h-24 bg-gray-800 rounded-xl" />
            <div className="h-16 bg-gray-800 rounded-xl" />
            <div className="h-48 bg-gray-800 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── ErrorState ──────────────────────────────────────────── */
export function ErrorState({ message, onRetry }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <p className="text-5xl">📡</p>
        <h2 className="text-xl font-bold text-white">مقاله بارگذاری نشد</h2>
        <p className="text-gray-400 text-sm">{message || "خطا در دریافت اطلاعات"}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-6 py-2 rounded-full bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition"
          >
            تلاش مجدد
          </button>
        )}
      </div>
    </div>
  );
}

/* ── ShareButtons ────────────────────────────────────────── */
export function ShareButtons({ url, title, isRtl }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const encoded = { url: encodeURIComponent(url), title: encodeURIComponent(title || "") };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500">{isRtl ? "اشتراک:" : "Share:"}</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded.url}&text=${encoded.title}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gray-500 hover:text-amber-500 transition"
        aria-label="Share on X"
      >
        𝕏
      </a>
      <a
        href={`https://t.me/share/url?url=${encoded.url}&text=${encoded.title}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gray-500 hover:text-amber-500 transition"
        aria-label="Share on Telegram"
      >
        TG
      </a>
      <button
        onClick={copy}
        className="text-xs text-gray-500 hover:text-amber-500 transition min-w-[36px]"
        aria-label="Copy link"
      >
        {copied ? "✓" : "Copy"}
      </button>
    </div>
  );
}
