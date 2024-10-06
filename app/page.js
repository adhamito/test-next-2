'use client';

import React, { useState, useEffect } from 'react'; 
import Cards from "../components/Cards";
import MobileCards from "../components/MobileCards"; 
import CardPayment from "../components/CardPaiment"; 
import MobileCardPayment from "../components/MobileCardPayment"; 

export default function Home() {
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check the window width initially

    window.addEventListener('resize', handleResize); // Update on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
    };
  }, []);

  return (
    <div className={`flex flex-row ${isMobile ? 'space-y-4' : 'flex-row justify-between space-x-6'} m-6 w-full px-6 py-4`}>
      <div className={`${isMobile ? 'w-[500px]' : 'w-1/2'}`}> 
        {/* Adjust width based on mobile state */}
        {isMobile ? <MobileCards /> : <Cards />} 
      </div>
      <div className={`${isMobile ? 'w-[500px]' : 'w-1/2'}`}>
        {isMobile ? <MobileCardPayment /> : <CardPayment />} 
        
      </div>
    </div>
  );
}
