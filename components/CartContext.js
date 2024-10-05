'use client'


import React, { createContext, useContext, useState } from 'react';
const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    setTotalAmount((prevTotal) => prevTotal + item.price);
  };

  const removeFromCart = (item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    setTotalAmount((prevTotal) => prevTotal - item.price);
  };

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
