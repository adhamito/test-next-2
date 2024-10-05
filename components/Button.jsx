'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineLocalGroceryStore } from "react-icons/md";

const Button = ({ Dessert, openimage, isOpen }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = () => {
    const existingItemIndex = cartItems.findIndex(item => item.id === Dessert.id);
    let updatedItems;

    if (existingItemIndex > -1) {
      updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
    } else {
      updatedItems = [...cartItems, { ...Dessert, quantity: 1 }];
    }

    setCartItems(updatedItems);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }

    setQuantity(prevQuantity => prevQuantity + 1);
    openimage(Dessert.id); // Call to handleButtonClick in Cards component
    router.refresh();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedItems = localStorage.getItem('cartItems');
      setCartItems(storedItems ? JSON.parse(storedItems) : []);
    }
  }, []);

  const addQuantity = () => {
    const existingItemIndex = cartItems.findIndex(item => item.id === Dessert.id);
    let updatedItems;

    if (existingItemIndex > -1) {
      updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
    } else {
      updatedItems = [...cartItems, { ...Dessert, quantity: 1 }];
    }

    setCartItems(updatedItems);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }

    setQuantity(prevQuantity => prevQuantity + 1);
    openimage(Dessert.id); 
    router.refresh();
  };

  const lessQuantity = () => {
    const existingItemIndex = cartItems.findIndex(item => item.id === Dessert.id);

    if (existingItemIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity -= 1;

      if (updatedItems[existingItemIndex].quantity === 0) {
        updatedItems.splice(existingItemIndex, 1);
      }

      setCartItems(updatedItems);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      }

      setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));
    }
  };

  return (
    <div className='bottom-4 relative left-5'>
      {isOpen ? ( 
        <div className="bg-[#cb3a11] rounded-3xl text-white font-serif flex items-center w-36 flex-row justify-around">
          <button onClick={addQuantity} className="text-xl border px-2 border-stone-200 rounded-full">+</button>
          <input 
            type="text" 
            value={quantity} 
            readOnly 
            className="text-white text-xl mx-2 w-12 text-center font-thin bg-[#cb3a11]" 
          />
          <button onClick={lessQuantity} className="text-xl border px-2 border-stone-200 rounded-full">-</button>
        </div>
      ) : (
        <button
          type="button" 
          className="bg-white text-black flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-1 me-2 mb-2 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-gray-500 rounded-3xl"
          onClick={addToCart}
        >
          <MdOutlineLocalGroceryStore className="text-orange-300 me-2 font-bold" size={28} />
          Add to Store
        </button>
      )}
    </div>
  );
};

export default Button;
