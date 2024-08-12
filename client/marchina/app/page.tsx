import React from "react";
import Link from 'next/link';
import ProductDetailsPage from './ProductDetailsPage/page'
import Homepage from '../app/Homepage/page';
// import AddProductModal from "./addprodModel/pages";


export default function Home() {
  return (
    <div>
  
      <main>
        
        
        <Homepage />
        {/* <AddProductModal /> */}
       {/* < ProductDetailsPage/> */}
       
      </main>
      


    </div>
  );
}