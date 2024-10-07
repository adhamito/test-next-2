import React from 'react'; 
import Cards from "../components/Cards";
import CardPayment from "../components/CardPaiment"; 


export default function Home() {
 return (
  <div className="w-full flex flex-col md:flex-row m-6 justify-center md:items-start lg:items-start sm:items-center px-6 sm:bg-[#f0f0f0'] bg-#fcf8f5">
    
    <div className="flex flex-col md:flex-row md:w-full sm:w-full items-center sm:bg[#fcf8f5]"> 
      <Cards />
    </div>
    
    <div className="md:w-1/2 sm:w-full flex justify-center">
      <CardPayment />
    </div>
  </div>
);

}
