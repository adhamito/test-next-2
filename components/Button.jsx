'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { AddToCart, AddQuantity, RemoveQuantity } from '../Action'; 

const Button = ({ Dessert, openimage, isOpen }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);
  const [isInCart, setIsInCart] = useState(false);

  // Function to fetch cart items from localStorage and update the state
  const fetchCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cart.find(cartItem => cartItem.id === Dessert.id);

    if (existingItem) {
      setIsInCart(true);
      setQuantity(existingItem.quantity);
    } else {
      setIsInCart(false);
      setQuantity(0);
    }
  };

  // useEffect to check if the item is already in the cart and update on mount
  useEffect(() => {
    fetchCartItems();

    // Periodic check in case of external changes
    const intervalId = setInterval(fetchCartItems, 1000);

    return () => clearInterval(intervalId);
  }, [router, Dessert.id]); 


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
      RemoveQuantity(Dessert.id); 
      setQuantity(prevQuantity => prevQuantity - 1);
    } else {
      RemoveQuantity(Dessert.id);
      setIsInCart(false);
      setQuantity(0);
    }
    router.refresh();
  };

  return (
    <div className='relative w-full flex justify-center'>
      {isInCart ? ( 
        <div className="bg-[#cb3a11] rounded-3xl text-white font-serif flex items-center justify-around w-3/4">
          <button onClick={addQuantity} className="sm:text-xs md:text-xl lg:text-base text-base border px-2 border-stone-200 rounded-full">+</button>
          <input 
            type="text" 
            value={quantity} 
            readOnly 
            className="text-white mx-2 w-1/4 text-center font-thin bg-[#cb3a11] sm:text-xs md:text-xl lg:text-base text-base" 
          />
          <button onClick={lessQuantity} className="border px-2 border-stone-200 rounded-full">-</button>
        </div>
      ) : (
        <button
          type="button" 
          className="bg-white text-black flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm mb-2 dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:focus:ring-gray-500 rounded-3xl w-full"
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
