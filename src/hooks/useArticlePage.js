import { useState, useEffect, useCallback, useRef } from "react";
import { API_BASE } from "../constants/articleData";

/* ── useArticle ─────────────────────────────────────────── */
export function useArticle(slug) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/api/articles/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setArticle(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  return { article, loading, error };
}

/* ── useViews ────────────────────────────────────────────── */
export function useViews(slug) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (!slug) return;
    const key = `views_${slug}`;
    const stored = parseInt(localStorage.getItem(key) || "0", 10);
    const next = stored + 1;
    setViews(next);
    localStorage.setItem(key, next);
  }, [slug]);

  return views;
}

/* ── useLike ─────────────────────────────────────────────── */
export function useLike(slug, initialCount = 0) {
  const [liked, setLiked] = useState(
    () => localStorage.getItem(`liked_${slug}`) === "true"
  );
  const [count, setCount] = useState(initialCount);

  useEffect(() => { setCount(initialCount); }, [initialCount]);

  const toggle = useCallback(() => {
    const next = !liked;
    setLiked(next);
    setCount((c) => c + (next ? 1 : -1));
    localStorage.setItem(`liked_${slug}`, next);
    fetch(`${API_BASE}/api/articles/${slug}/${next ? "like" : "unlike"}`, {
      method: "POST",
    }).catch(() => {});
  }, [liked, slug]);

  return { liked, count, toggle };
}

/* ── useComments ─────────────────────────────────────────── */
export function useComments(slug) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetch(`${API_BASE}/api/comments/${slug}`)
      .then((r) => r.json())
      .then((data) => { if (!cancelled) setComments(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slug]);

  const addComment = useCallback(
    async ({ author, text }) => {
      if (!text.trim() || submitting) return false;
      setSubmitting(true);
      try {
        const res = await fetch(`${API_BASE}/api/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ articleSlug: slug, author: author.trim() || "کاربر", text: text.trim() }),
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setComments((prev) => [data, ...prev]);
        return true;
      } catch {
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [slug, submitting]
  );

  return { comments, loading, submitting, addComment };
}

/* ── useActiveHeading ────────────────────────────────────── */
export function useActiveHeading(article) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!article) return;
    const headings = document.querySelectorAll("h2[id], h3[id]");
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [article]);

  return activeId;
}

/* ── useReadingProgress ──────────────────────────────────── */
export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return progress;
}

/* ── useTyped ────────────────────────────────────────────── */
export function useTyped(strings) {
  const el = useRef(null);

  useEffect(() => {
    if (!el.current || !strings?.length) return;
    let typed;
    import("typed.js").then(({ default: Typed }) => {
      typed = new Typed(el.current, {
        strings,
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 2500,
        loop: true,
      });
    });
    return () => typed?.destroy();
  }, [strings]);

  return el;
}
