import React, { createContext, useContext } from 'react';
import { useCart } from '../../hooks/useCart';

// ایجاد Context
const CartContext = createContext(null);

// Provider Component
export function CartProvider({ children }) {
  const cart = useCart();
  
  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
}

// Hook سفارشی برای استفاده از سبد خرید
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}

// همچنین می‌توانید از نام useCart نیز استفاده کنید
export { useCartContext as useCart };
