'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('akonzi_cart');
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
      }
    }
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updated = [...prev, { ...product, quantity }];
      }
      localStorage.setItem('akonzi_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('akonzi_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('akonzi_cart');
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    // Return a dummy object if context is missing (like in non-wrapped layouts) 
    // to prevent complete crashes during development or ssr.
    return { cart: [], addToCart: () => {}, removeFromCart: () => {}, clearCart: () => {}, getCartCount: () => 0 };
  }
  return context;
}
