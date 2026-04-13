import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState(new Set());

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) { removeFromCart(id); return; }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const cartTotal = cartItems.reduce((t, item) => t + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((t, item) => t + item.quantity, 0);
  const wishCount = wishlist.size;

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount,
      isCartOpen, setIsCartOpen,
      wishlist, toggleWishlist, wishCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
