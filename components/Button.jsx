  'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { AddToCart, AddQuantity, RemoveQuantity } from '../Action'; 

const Button = ({ Dessert, openimage, isOpen }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cart.find(cartItem => cartItem.id === Dessert.id);
    
    if (existingItem) {
      setIsInCart(true);
      setQuantity(existingItem.quantity);
    }
  }, [Dessert.id]);

  const addToCart = () => {
    AddToCart(Dessert);  
    setIsInCart(true);
    setQuantity(1);
    openimage(Dessert.id); 
    router.refresh();
  };

  const addQuantity = () => {
    AddQuantity(Dessert.id);  
    setQuantity(prevQuantity => prevQuantity + 1);
    openimage(Dessert.id); 
    router.refresh();
  };

  const lessQuantity = () => {
    if (quantity > 1) {
      RemoveQuantity(Dessert.id);  // Use Dessert.id
      setQuantity(prevQuantity => prevQuantity - 1);
    } else {
      RemoveQuantity(Dessert.id);
      setIsInCart(false);
      setQuantity(0);
    }
    router.refresh();
  };

  return (
    <div className='bottom-4 relative left-5'>
      {isInCart ? ( 
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
