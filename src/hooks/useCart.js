import { useCallback, useEffect, useState } from "react";

const CART_KEY = "blueRigelCart";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage blocked — cart stays in memory */
    }
  }, [cart]);

  const addItem = useCallback((id, name) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id, name, qty: 1 }];
    });
  }, []);

  const clear = useCallback(() => setCart([]), []);

  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const summary = cart.map((i) => `${i.name} ×${i.qty}`).join(", ");

  return { cart, count, summary, addItem, clear };
}
