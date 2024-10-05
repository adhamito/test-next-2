'use client';

import React, { useState } from 'react';
import data from "../data.json";
import Button from './Button';

const Cards = () => {
  const [borderedImages, setBorderedImages] = useState([]);
  const [openedItem, setOpenedItem] = useState(null); 

  const Dessert = data;

  const handleButtonClick = (id) => {
    setBorderedImages((prev) =>
      prev.includes(id) ? prev.filter((imgId) => imgId !== id) : [...prev, id]
    );
    setOpenedItem(id); 
  };

  return (
   <div>
    <h1 className='text-2xl font-bold text-left text-orange-800'>Desserts</h1>
     <div className='flex flex-wrap justify-center gap-3 p-2'>
      
      {Dessert.map((item) => (
        <div 
          key={item.id} 
          className='flex flex-col gap-2 m-3 text-left bg-[#fffcf9] text-black p-4 rounded-lg shadow-lg  ' 
        >
          <img 
            src={item.src} 
            alt={item.name} 
            className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-lg ${borderedImages.includes(item.id) ? 'border-4 border-orange-500' : ''}`} 
          />
          <Button 
            Dessert={item} 
            openimage={() => handleButtonClick(item.id)} 
            isOpen={openedItem === item.id} 
          />
          <p className='text-xs sm:text-sm font-light text-left '>{item.gender}</p>
          <h1 className='text-lg sm:text-xl font-bold'>{item.name}</h1>
          <p className='font-bold text-orange-800'>${item.price}</p>
        </div>
      ))}
    </div>
   </div>
  );
};

export default Cards;
  