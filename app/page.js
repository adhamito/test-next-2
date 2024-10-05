'use client'

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Cards from "../components/Cards";
import MobileCards from "../components/MobileCards"; 
import CardPayment from "../components/CardPaiment"; 
import MobileCardPayment from "../components/MobileCardPayment"; 

export default function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // State for mobile detection

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    window.addEventListener('resize', handleResize); 

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-row justify-between m-6 w-full">
      <div>
        
        {isMobile ? <MobileCards /> : <Cards />} 
      </div>
      <div>
        {isMobile ? <MobileCardPayment /> : <CardPayment className="flex flex-row justify-between" />} {/* Render based on mobile state */}
      </div>
    </div>
  );
}
