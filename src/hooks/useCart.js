import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "cart";
const USER_CART_KEY = "user_cart";

function readCart() {
  try { 
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); 
  } catch { 
    return []; 
  }
}

export function useCart() {
  const [items, setItems] = useState(readCart);
  const [isHydrated, setIsHydrated] = useState(false);

  // همگام‌سازی اولیه
  useEffect(() => {
    setItems(readCart());
    setIsHydrated(true);
  }, []);

  // گوش دادن به رویدادهای تغییر سبد خرید
  useEffect(() => {
    const sync = () => setItems(readCart());
    window.addEventListener("cart-updated", sync);
    window.addEventListener("storage", sync);
    return () => { 
      window.removeEventListener("cart-updated", sync); 
      window.removeEventListener("storage", sync); 
    };
  }, []);

  // ذخیره‌سازی خودکار هنگام تغییر آیتم‌ها
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const save = useCallback((next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setItems(next);
    window.dispatchEvent(new Event("cart-updated"));
  }, []);

  const add = useCallback((product, qty = 1) => {
    setItems(prev => {
      const id = product._id || product.id;
      const idx = prev.findIndex(i => i.id === id);
      
      let next;
      if (idx >= 0) {
        next = prev.map((i, n) => n === idx ? { ...i, qty: i.qty + qty } : i);
      } else {
        next = [...prev, { 
          id, 
          name: product.name, 
          thumb: product.thumbnail || product.image, 
          price: product.price, 
          qty,
          slug: product.slug,
          brand: product.brand
        }];
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("cart-updated"));
      return next;
    });
  }, []);

  const remove = useCallback((id) => {
    setItems(prev => {
      const next = prev.filter(i => i.id !== id);
      save(next);
      return next;
    });
  }, [save]);

  const update = useCallback((id, qty) => {
    if (qty < 1) {
      remove(id);
      return;
    }
    setItems(prev => {
      const next = prev.map(i => i.id === id ? { ...i, qty } : i);
      save(next);
      return next;
    });
  }, [remove, save]);

  const clear = useCallback(() => save([]), [save]);

  // ذخیره سبد خرید برای کاربر (پس از لاگین)
  const saveForUser = useCallback((userId) => {
    if (!userId) return;
    const userCart = {
      userId,
      items,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(`${USER_CART_KEY}_${userId}`, JSON.stringify(userCart));
  }, [items]);

  // بارگذاری سبد خرید کاربر
  const loadForUser = useCallback((userId) => {
    if (!userId) return false;
    try {
      const saved = localStorage.getItem(`${USER_CART_KEY}_${userId}`);
      if (saved) {
        const { items: savedItems } = JSON.parse(saved);
        if (savedItems && savedItems.length) {
          save(savedItems);
          return true;
        }
      }
    } catch (e) {
      console.error("Error loading user cart:", e);
    }
    return false;
  }, [save]);

  // ادغام سبد خرید فعلی با سبد خرید کاربر (در زمان لاگین)
  const mergeCart = useCallback((userId) => {
    if (!userId) return;
    try {
      const saved = localStorage.getItem(`${USER_CART_KEY}_${userId}`);
      if (saved) {
        const { items: savedItems } = JSON.parse(saved);
        if (savedItems && savedItems.length) {
          // ادغام آیتم‌ها: اگر تکراری باشند، تعداد جمع می‌شود
          const merged = [...items];
          savedItems.forEach(savedItem => {
            const existingIndex = merged.findIndex(i => i.id === savedItem.id);
            if (existingIndex >= 0) {
              merged[existingIndex].qty += savedItem.qty;
            } else {
              merged.push(savedItem);
            }
          });
          save(merged);
        }
      }
    } catch (e) {
      console.error("Error merging cart:", e);
    }
  }, [items, save]);

  const total = items.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
  const count = items.reduce((s, i) => s + (i.qty || 1), 0);

  return { 
    items, 
    add, 
    remove, 
    update, 
    clear, 
    total, 
    count,
    saveForUser,
    loadForUser,
    mergeCart,
    isHydrated
  };
}
