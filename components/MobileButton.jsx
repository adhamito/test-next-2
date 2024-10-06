'use client';

import React, { useState, useEffect, use } from 'react';
import { AddToCart, AddQuantity, RemoveQuantity } from '../Action'; 
import { useRouter } from 'next/navigation';

const MobileButton = ({ item }) => {
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(0); 
  

  useEffect(() => {
    
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setIsInCart(true);
      setQuantity(existingItem.quantity);
    }
  }, [item.id]);

  
  const addToCart = () => {
    AddToCart(item);
    setIsInCart(true);
    setQuantity(1); 
    
  };

  
  const addQuantity = () => {
    AddQuantity(item.id);
    setQuantity(prevQuantity => prevQuantity + 1);
    
  };


  const lessQuantity = () => {
    if (quantity > 1) {
      RemoveQuantity(item.id);
      setQuantity(prevQuantity => prevQuantity - 1);
      
    } else {
      
      RemoveQuantity(item.id);
      setIsInCart(false);
      setQuantity(0);
    }
  };

  return (
    <div className="bottom-4 relative ">
      {isInCart ? (
       
        <div className="bg-[#cb3a11] rounded-3xl
         text-white font-serif flex items-center w-full flex-row justify-around">
          <button
            onClick={addQuantity}
            className="text-xl  border px-2 border-stone-200 rounded-full"
          >
            +
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="text-white text-xl mx-2 w-12 text-center font-thin bg-[#cb3a11]"
          />
          <button
            onClick={lessQuantity}
            className="text-xl border px-2 border-stone-200 rounded-full"
          >
            -
          </button>
        </div>
      ) : (
        
        <button
          type="button"
          className="bg-white text-black flex 
          items-center justify-center
           hover:bg-gray-100 focus:outline-non
           e focus:ring-4 focus:ring-gray-300 
           font-medium text-sm px-5 py-3 me-2 mb-2
            dark:bg-white dark:text-black dark:hover:bg-gray-200
             dark:focus:ring-gray-500 rounded-3xl
             w-36"
          onClick={addToCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-orange-300 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2 7h12l2-7H7zM7 13h10l4-8H5.4M7 13l-2 7h12l2-7H7z"
            />
          </svg>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default MobileButton;
