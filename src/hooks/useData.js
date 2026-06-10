import { useState, useEffect, useCallback } from "react";
import {
  getProducts,
  getAppleProducts,
  getSamsungProducts,
  getHeroSlides,
} from "../api";
import localProducts from "../data/products.json";
import localSamsungProducts from "../data/samsungProducts";
import { heroSlides as localSlides } from "../data/heroSlides";

/* ── useProducts ─────────────────────────────────────────
   داده محصولات — از API، fallback به local
──────────────────────────────────────────────────────── */
export function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const filtersKey = JSON.stringify(filters);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts(filters);
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch {
      // fallback به داده‌های local
      let fallback = localProducts;
      if (filters.brand) {
        fallback = localProducts.filter(
          (p) => p.brand.toLowerCase() === filters.brand.toLowerCase()
        );
      }
      if (filters.category) {
        fallback = fallback.filter(
          (p) => p.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      setProducts(fallback);
    } finally {
      setLoading(false);
    }
  }, [filtersKey]); // eslint-disable-line

  useEffect(() => { fetch(); }, [fetch]);

  return { products, loading, error, refetch: fetch };
}

/* ── useAppleProducts ───────────────────────────────────── */
export function useAppleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    let cancelled = false;
    getAppleProducts()
      .then((data) => {
        if (!cancelled)
          setProducts(Array.isArray(data) ? data : data.products || []);
      })
      .catch(() => {
        if (!cancelled)
          setProducts(localProducts.filter((p) => p.brand === "Apple"));
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { products, loading };
}

/* ── useSamsungProducts ─────────────────────────────────── */
export function useSamsungProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    let cancelled = false;
    getSamsungProducts()
      .then((data) => {
        if (!cancelled)
          setProducts(Array.isArray(data) ? data : data.products || []);
      })
      .catch(() => {
        if (!cancelled) setProducts(localSamsungProducts);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { products, loading };
}

/* ── useHeroSlides ──────────────────────────────────────── */
export function useHeroSlides() {
  const [slides, setSlides]   = useState(localSlides);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getHeroSlides()
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length)
          setSlides(data);
      })
      .catch(() => {}) // fallback به localSlides که از ابتدا set شده
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { slides, loading };
}
