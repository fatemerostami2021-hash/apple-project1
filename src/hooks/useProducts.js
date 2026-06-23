import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ✅ کش ساده‌ی سطح ماژول — بین رندرهای مختلف کامپوننت‌ها به اشتراک گذاشته می‌شه
// تا useProducts() و useProducts("Apple") و useProducts("Samsung")
// به‌جای ۳ درخواست جدا، فقط ۱ درخواست واقعی به سرور بزنن.
let allProductsCache = null;
let inFlightPromise = null;
const subscribers = new Set();

function notifySubscribers() {
  subscribers.forEach((cb) => cb());
}

async function fetchAllProductsOnce() {
  if (allProductsCache) return allProductsCache;
  if (inFlightPromise) return inFlightPromise;

  inFlightPromise = axios
    .get(`${API_URL}/api/products`)
    .then((res) => {
      let list = [];
      if (res.data && res.data.products) list = res.data.products;
      else if (Array.isArray(res.data)) list = res.data;

      allProductsCache = list;
      inFlightPromise = null;
      notifySubscribers();
      return list;
    })
    .catch((err) => {
      inFlightPromise = null;
      throw err;
    });

  return inFlightPromise;
}

/**
 * useProducts(brand?)
 * - بدون آرگومان: همه‌ی محصولات
 * - با brand ("Apple" / "Samsung"): فیلتر شده از همون کش، بدون fetch جدید
 *
 * ✅ همه‌ی فراخوانی‌های useProducts در کل صفحه از یک fetch مشترک استفاده می‌کنن،
 * پس بخش‌های مختلف صفحه (Swiper, Apple grid, Samsung grid) دقیقاً همزمان
 * از حالت loading خارج می‌شن — دیگه محصولات تکه‌تکه و با تاخیر ظاهر نمی‌شن.
 */
export function useProducts(brand = null) {
  const [products, setProducts] = useState(() => {
    if (!allProductsCache) return [];
    return brand
      ? allProductsCache.filter(p => p.brand?.toLowerCase() === brand.toLowerCase())
      : allProductsCache;
  });
  const [loading, setLoading] = useState(!allProductsCache);
  const [error, setError] = useState(null);

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const applyFromCache = () => {
      if (!mountedRef.current || !allProductsCache) return;
      const filtered = brand
        ? allProductsCache.filter(p => p.brand?.toLowerCase() === brand.toLowerCase())
        : allProductsCache;
      setProducts(filtered);
      setLoading(false);
      setError(null);
    };

    if (allProductsCache) {
      applyFromCache();
    } else {
      setLoading(true);
      fetchAllProductsOnce()
        .then(() => {
          if (mountedRef.current) applyFromCache();
        })
        .catch((err) => {
          if (!mountedRef.current) return;
          setError(err.message);
          setProducts([]);
          setLoading(false);
        });
    }

    // ✅ هر بار کش آپدیت شد (مثلاً یک کامپوننت دیگه fetch رو تموم کرد)،
    // این subscriber هم با داده‌ی تازه sync می‌شه.
    subscribers.add(applyFromCache);
    return () => {
      mountedRef.current = false;
      subscribers.delete(applyFromCache);
    };
  }, [brand]);

  return { products, loading, error };
}

/**
 * در صورت نیاز به رفرش دستی کش (مثلاً بعد از افزودن محصول در پنل ادمین)
 */
export function invalidateProductsCache() {
  allProductsCache = null;
  inFlightPromise = null;
}