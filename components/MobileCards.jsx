import React from 'react';
import data from '../data.json';
import MobileButton from './MobileButton';

const MobileCards = () => {
  const Dessert = data;

  const half = Math.ceil(Dessert.length / 2);
  const firstHalf = Dessert.slice(0, half);
  const secondHalf = Dessert.slice(half);

  return (
    <div className="flex justify-between space-x-4 p-4  rounded  gap-3 m-3">
      
      <div className="w-1/2 space-y-6 shadow-md rounded-lg bg-[#fcf8f5]">
      <h1 className="text-2xl font-bold text-black">Dessert</h1>
        {firstHalf.map((item) => (
          <div key={item.id} className=" rounded-lg p-4  m-2">
            
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-32 object-cover rounded-lg"
            />
              <MobileButton className="absolute bottom-0 left-1/2 transform
               -translate-x-1/2 translate-y-1/2  bg-orange-50 text-white py-2 px-4
                rounded-full hover:bg-orange-600" key={item.id} item={item} />
            
            
            <div className="mt-2">
              <h3 className="text-lg font-light text-gray-300">{item.gender}</h3>
                <h1 className="text-lg font-bold text-black">
                {item.name}
                </h1>
              <p className="text-orange-600">${item.price}</p>
            </div> </div>
        ))}
      </div>
      <div className="w-1/2 space-y-6 m-2 shadow-md rounded-lg bg-[#fcf8f5]">
        {secondHalf.map((item) => (
          <div key={item.id} className="rounded-lg p-4 gap-3  ">
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-32 object-cover rounded-lg"
            />  
        <MobileButton className="absolute bottom-0 left-1
         transform -translate-x-1/2 translate-y-1/2 bg-orange-50
          text-white py-2 px-4 rounded-full hover:bg-orange-600
          w-36" key={item.id} item={item} />
          <div className="mt-4">
            <h3 className="text-lg font-light text-gray-300">{item.gender}</h3>
            <h1 className="text-lg font-bold text-black">{item.name}</h1>
            <p className="text-orange-600">${item.price}</p>
          </div>
        
        </div>
        ))}
      </div>
    </div>
  );
};

export default MobileCards;
