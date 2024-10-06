'use client';
import React, { useEffect, useState } from 'react';
import { getDesserts } from '../Action';
import { useRouter } from 'next/navigation';
import MobileButton from './MobileButton';
import { TbTruckDelivery } from "react-icons/tb";

const MobileCardPayment = () => {
    const [desserts, setDesserts] = useState([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const dessertsFromStorage = getDesserts();
        setDesserts(dessertsFromStorage);

        const totalAmount = dessertsFromStorage.reduce((sum, dessert) => {
            return sum + (dessert.price * dessert.quantity); 
        }, 0);
        setTotal(totalAmount);
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-xl flex flex-col w-[250px] p-6">
          
          
          <div className="mb-6 bg-[#fcf8f5 ] p-4 rounded-lg">
            {desserts.length > 0 && (
              <div className="relative w-36 h-28 mx-auto mb-6 bg-rose-50s rounded-lg  shadow-md">
                <img 
                  src={desserts[0].src} 
                  alt={desserts[0].name} 
                  className="w-full h-full object-cover border border-orange-300 transition-transform hover:scale-105"
                />
    
                {/* Mobile Button */}
                <MobileButton 
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-orange-600 transition-colors" 
                  key={desserts[0].id} 
                  item={desserts[0]} 
                />
    
                {/* Dessert Info */}
                <div className="text-left mt-2">
                  <h3 className="text-sm font-light text-gray-400">{desserts[0].gender}</h3>
                  <h1 className="text-base font-bold text-gray-800">{desserts[0].name}</h1>
                  <p className="text-orange-600 font-semibold text-sm">${desserts[0].price}</p>
                </div>
              </div>
            )}
          </div>
          
          <br />
          <br />
          <div className="flex flex-col space-y-4 w-full">
            <div className='bg-white rounded-lg shadow-md border '>
              <h3 className="text-lg font-bold text-orange-500 text-center py-3">Your Cart ({desserts.length})</h3>
              {desserts.length > 0 && (
                <div className="flex flex-col space-y-2">
                  {desserts.map((dessert) => (
                    <div key={dessert.id} className="flex justify-between text-left border-orange-200 text-gray-700 px-4 py-2 ">
                      <div className='flex flex-col justify-between mr-2'>
                        <h1 className='text-xs font-bold'>{dessert.name}</h1>
                        <p>
                          <span className='text-[#cb3a11] font-bold'>{dessert.quantity}X</span> 
                        </p>
                      </div>
                      <div className='ml-2 text-xs flex items-center'>
                        <p>${(dessert.price * dessert.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
    
            {/* Total Section */}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center font-bold text-lg text-gray-800">
                <p className='text-xs font-bold text-gray-400'>order Total</p>
                <p className='text-l font-bold text-gray-700'>${total.toFixed(2)}</p>
              </div>
             <div className='flex flex-row justify-center mx-auto mt-2'>
            
             <TbTruckDelivery className='text-green-300' size={24} />
             <p className="text-xs text-gray-800 mt-1">
                This is a carbon-neutral delivery
                </p>
             </div>
            </div>
          </div>
    
          
          <button 
            className="bg-orange-500 text-white py-1 px-6 rounded-full w-full font-bold shadow-lg hover:bg-orange-600 transition duration-300 mt-4"
            onClick={() => console.log("Order confirmed!")}
          >
            Confirm Order
          </button>
        </div>
    );
    
      
    
}

export default MobileCardPayment;
