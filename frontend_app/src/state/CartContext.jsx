import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { getProductById } from '../data/products';

const CartContext = createContext(null);

const STORAGE_KEY = 'oceanpro.cart.v1';

// Actions
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_QTY = 'UPDATE_QTY';
const CLEAR = 'CLEAR';

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const { id, qty = 1 } = action.payload;
      const next = { ...state };
      next[id] = (next[id] || 0) + qty;
      return next;
    }
    case REMOVE_ITEM: {
      const { id } = action.payload;
      const next = { ...state };
      delete next[id];
      return next;
    }
    case UPDATE_QTY: {
      const { id, qty } = action.payload;
      const next = { ...state };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    }
    case CLEAR:
      return {};
    default:
      return state;
  }
}

function usePersistedCart() {
  const [state, dispatch] = useReducer(cartReducer, {}, () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage quota errors
    }
  }, [state]);

  return [state, dispatch];
}

/**
 * PUBLIC_INTERFACE
 * CartProvider wraps the app to provide cart state and actions.
 */
export function CartProvider({ children }) {
  const [cart, dispatch] = usePersistedCart();

  // Derived selectors
  const items = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const product = getProductById(id);
      return {
        id,
        qty,
        product,
        lineTotal: product ? Number((product.price * qty).toFixed(2)) : 0
      };
    });
  }, [cart]);

  const itemCount = useMemo(
    () => items.reduce((sum, it) => sum + it.qty, 0),
    [items]
  );

  const subtotal = useMemo(
    () => Number(items.reduce((sum, it) => sum + it.lineTotal, 0).toFixed(2)),
    [items]
  );

  const value = useMemo(
    () => ({
      cart,
      items,
      itemCount,
      subtotal,
      // Actions
      addItem: (id, qty = 1) => dispatch({ type: ADD_ITEM, payload: { id, qty } }),
      removeItem: (id) => dispatch({ type: REMOVE_ITEM, payload: { id } }),
      updateQty: (id, qty) => dispatch({ type: UPDATE_QTY, payload: { id, qty } }),
      clear: () => dispatch({ type: CLEAR })
    }),
    [cart, items, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useCart returns the cart context with items, counts, totals and actions.
 */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
