import { useState, useEffect, useCallback, createContext, useContext } from "react";

const STORAGE_KEY = "cart";
const USER_CART_KEY = "user_cart";

// ============================================================
// 📦 ایجاد Context
// ============================================================
const CartContext = createContext();

// ============================================================
// 🛒 CartProvider
// ============================================================
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      setItems([]);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isHydrated]);

  useEffect(() => {
    const sync = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setItems(JSON.parse(saved));
        }
      } catch {
        setItems([]);
      }
    };
    window.addEventListener("cart-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("cart-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const save = useCallback((next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setItems(next);
    window.dispatchEvent(new Event("cart-updated"));
  }, []);

  // ===== تابع add =====
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
          name: product.name || product.title, 
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

  // ===== ✅ تابع addToCart (برای سازگاری با HeroSlider) =====
  const addToCart = add;

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

  const saveForUser = useCallback((userId) => {
    if (!userId) return;
    const userCart = {
      userId,
      items,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(`${USER_CART_KEY}_${userId}`, JSON.stringify(userCart));
  }, [items]);

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

  const mergeCart = useCallback((userId) => {
    if (!userId) return;
    try {
      const saved = localStorage.getItem(`${USER_CART_KEY}_${userId}`);
      if (saved) {
        const { items: savedItems } = JSON.parse(saved);
        if (savedItems && savedItems.length) {
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

  const value = {
    items,
    add,
    addToCart,  // ✅ اضافه شد
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

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// ============================================================
// 🪝 هوک useCart
// ============================================================
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// ============================================================
// 🪝 هوک useCartContext (سازگاری)
// ============================================================
export const useCartContext = useCart;
