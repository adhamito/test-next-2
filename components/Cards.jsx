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
    <div className='sm:shadow-lg shadow-none rounded-2xl m-2 border-none'>
    <h1 className='text-2xl md:text-3xl
      mb-3 font-bold text-left md:text-orange-800 text-black '>
      Desserts
      </h1>
    <div className="grid grid-cols-1 sm:grid-cols-1
     md:grid-cols-2 lg:grid-cols-3 gap-4 p-4
      ">
      {Dessert.map((item) => (
        <div 
          key={item.id} 
          className="flex flex-col gap-6 
           sm:bg-[#fcf8f5]
            text-black
             p-4 rounded-lg
              sm:shadow-none  transition-transform transform hover:scale-105"
        > 
         <div className='flex flex-col justify-center items-center'>
         <img 
            src={item.src} 
            alt={item.name} 
            className={`w-full h-32 sm:h-40 md:h-48 lg:h-52 object-cover rounded-xl ${borderedImages.includes(item.id) ? 'border-4 border-orange-200' : ''}`} 
          />
          <Button 
            Dessert={item} 
            openimage={() => handleButtonClick(item.id)} 
            isOpen={openedItem === item.id} 
            className=" w-1/2"
          />
         </div>
          <p className="text-xs sm:text-sm font-light">{item.gender}</p>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">{item.name}</h1>
          <p className="font-bold text-orange-800">${item.price}</p>
        </div>
      ))}
    </div>
  </div>
  );
  
};

export default Cards;
  