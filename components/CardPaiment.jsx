'use client';

import React, { useEffect, useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Dialog, DialogTitle, DialogPanel, DialogBackdrop } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { TbTruckDelivery } from "react-icons/tb";
import { GrValidate } from "react-icons/gr";
import Button from './Button';
import { RemoveFromCart } from '../Action';

const CardPayment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const [openedItem, setOpenedItem] = useState(null); 

  const handleButtonClick = (itemId) => {
    setOpenedItem(itemId === openedItem ? null : itemId); 
  };
useEffect(() => {
    const fetchCartItems = () => {
      const storedItems = localStorage.getItem('cartItems');
      if (storedItems) {
        try {
          const items = JSON.parse(storedItems);
          setCartItems(items);
          const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
          setTotalAmount(total);
        } catch (error) {
          console.error('Failed to parse cart items from localStorage:', error);
          localStorage.removeItem('cartItems');
          router.reload();  
        }
      } else {
        setCartItems([]);
        setTotalAmount(0);
      }
    };
   fetchCartItems();
 const intervalId = setInterval(fetchCartItems, 1000);
return () => clearInterval(intervalId);
  }, [router]);

  const removeFromCart = (itemToRemove) => {

    RemoveFromCart(itemToRemove.id);
    

    const updatedItems = cartItems.filter(item => item.id !== itemToRemove.id);
    setCartItems(updatedItems);

    
    const total = updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalAmount(total);
    router.refresh();
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleConfirmOrder = () => {
    localStorage.removeItem('cartItems');
    setCartItems([]);
    setTotalAmount(0);
    setOpenModal(false);
  };

  return (
    <div className='p-6 bg-[#ffffff]   rounded-lg shadow-md mt-6 max-w-md md:max-w-lg lg:max-w-xl '>
      <h1 className='text-2xl font-bold text-left text-[#cb3a11] lg:block sm:hidden md:block    '>
        {cartItems.length === 0 
          ? 'Your cart is empty' 
          : `Your Cart (${cartItems.reduce((total, item) => total + item.quantity, 0)})`
        }
      </h1>
      <div className='lg:hidden sm:block md:hidden text-center px-4 py-2 m-2 '>
  {cartItems.length > 0 && (
    <>
    
  <div className='flex flex-col justify-center items-center'>
  <img src={cartItems[0].src} alt={cartItems[0].name} className=' object-cover w-52 h-36 rounded-lg border border-orange-400' />
      <Button 
        Dessert={cartItems[0]} 
        openimage={() => handleButtonClick(cartItems[0].id)} 
        isOpen={openedItem === cartItems[0].id}  
        className="w-full items-center"
      />
  </div>
      <div className='text-left'>
      <p className='text-sm text-gray-400 font-light'>{cartItems[0].gender}</p>
      <h1 className='text-sm text-gray-600 font-bold' >{cartItems[0].name}</h1>
      <h3 className='text-xl text-gray-800 font-bold'>${cartItems[0].price}</h3>
      </div>
    </>
  )}
</div>
      <div className='space-y-2'>
      <h1 className='text-xl font-bold text-left text-[#cb3a11] lg:hidden sm:block md:hidden '>
        {cartItems.length === 0 
          ? 'Your cart is empty' 
          : `Your Cart (${cartItems.reduce((total, item) => total + item.quantity, 0)})`
        }
      </h1>
  {cartItems.length > 0 && (
    <div className='flex flex-col gap-3'>
      {cartItems.map((item) => (
        <div key={item.id} className='flex flex-row md:flex-row justify-between items-start md:items-center p-4 bg-white shadow rounded-lg'>
          <div className='mb-2 md:mb-0'>
            <h2 className='text-sm font-bold text-gray-800'>{item.name}</h2>
            <p className='text-sm text-gray-400'>
              <span className='text-[#cb3a11] font-bold'>{item.quantity}X</span> {item.price}$ 
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <div className='md:ml-4'>
            <button
              className=' hover:bg-red-700 text-gray-500 font-bold rounded-full p-2'
              onClick={() => removeFromCart(item)}
            >
              <IoMdCloseCircleOutline size={20} />
            </button>
          </div>
        </div>
      ))}
      
      <div className='flex justify-between items-center mt-4 p-4 bg-gray-50 rounded-lg'>
        <h2 className='text-sm font-bold text-gray-400'>Order Total:</h2>
        <p className='text-xl font-bold text-gray-700'>${totalAmount.toFixed(2)}</p>
      </div>
      
      <div className='bg-[#faf9f5] p-4 rounded-lg'>
        <div className='flex justify-center items-center'>
          <TbTruckDelivery className='text-green-300' size={24} />
          <p className='text-sm text-gray-500 ml-2'>This order includes natural delivery</p>
        </div>
      </div>

      <button
        className='bg-orange-700 text-white rounded-3xl py-4 sm:py-1  px-4 w-full md:w-auto'
        onClick={handleOpenModal}
      >
        Confirm Order
      </button>
    </div>
  )}
</div>

      {openModal && (
        <Dialog open={openModal} onClose={handleCloseModal} className="relative z-10">
          <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
                <div className="flex flex-col p-6">
                  <GrValidate className="h-16 w-24 text-green-600" />
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    <h1 className="text-3xl font-bold">Order Confirmed</h1>
                    <p className="text-sm font-thin text-gray-400">We have received your order, enjoy!</p>
                  </DialogTitle>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border-b bg-[#fcf8f5]">
                      <div className="flex items-center">
                        <img src={item.src} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="ml-4">
                          <h2 className="text-base font-semibold text-gray-800">{item.name}</h2>
                          <p className="text-sm text-gray-500">
                            <span className="text-[#cb3a11] font-bold">{item.quantity}x</span>
                            <span className="ml-2 text-gray-400">@ ${item.price.toFixed(2)}</span>
                          </p>
                        </div>
                      </div>
                      <p className="text-lg font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center bg-[#fcf8f5] px-3 py-1">
                    <h2 className="text-sm font-light text-gray-400">Order Total</h2>
                    <p className="text-lg font-bold text-gray-900">${totalAmount.toFixed(2)}</p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleConfirmOrder}
                    className="bg-orange-700 text-white rounded-3xl py-3 px-3 w-full sm:w-auto"
                  >
                    Start New Order
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
  
  
};

export default CardPayment;
