import React from 'react'

const MobileCardPayment = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-lg space-y-4">
          <h3 className="text-lg font-bold">Your Cart (7)</h3>
          
         
          <div className="flex justify-between items-center">
            <p>Classic Tiramisu</p>
            <p>$5.50</p>
          </div>
    
          
          <div className="flex justify-between items-center">
            <p>Vanilla Bean Crème Brûlée (4x)</p>
            <p>$28.00</p>
          </div>
    
         
          <div className="flex justify-between items-center">
            <p>Vanilla Panna Cotta (2x)</p>
            <p>$13.00</p>
          </div>
    
          <div className="border-t pt-4">
            <div className="flex justify-between items-center font-bold">
              <p>Total</p>
              <p>$46.50</p>
            </div>
            <p className="text-sm text-gray-500">This is a carbon-neutral delivery</p>
          </div>
    
          <button className="bg-orange-500 text-white py-2 px-4 rounded-full w-full hover:bg-orange-600">
            Confirm Order
          </button>
        </div>
      );
}

export default MobileCardPayment