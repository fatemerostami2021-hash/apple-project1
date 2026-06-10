/* ══════════════════════════════════════════════
   کامپوننت‌های Skeleton برای loading state ها
══════════════════════════════════════════════ */

/* ── اسکلتون کارت محصول ── */
export function ProductCardSkeleton() {
  return (
    <div className="rounded-3xl p-5 bg-white/80 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 animate-pulse">
      <div className="h-36 mb-4 rounded-2xl bg-neutral-200 dark:bg-neutral-700" />
      <div className="space-y-2">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mx-auto" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 mx-auto" />
        <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded-xl mt-3" />
      </div>
    </div>
  );
}

/* ── اسکلتون گرید محصولات ── */
export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ── اسکلتون Hero ── */
export function HeroSkeleton() {
  return (
    <div className="w-full h-[580px] md:h-[760px] bg-neutral-200 dark:bg-neutral-800 animate-pulse flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/* ── نمایش خطا با retry ── */
export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <p className="text-4xl">📡</p>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm text-center max-w-xs">
        {message || "مشکلی در دریافت اطلاعات پیش آمد"}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 rounded-full bg-[#D4AF37] text-black text-sm font-semibold hover:bg-amber-400 transition"
        >
          تلاش مجدد
        </button>
      )}
    </div>
  );
}
