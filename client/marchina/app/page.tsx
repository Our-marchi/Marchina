import React from "react";
import Link from 'next/link';

import Homepage from '../app/Homepage/page';
import AddProductModal from "./addprodModel/pages";


export default function Home() {
  return (
    <div>
  
      <main>
        
        
        <Homepage />
        <AddProductModal isOpen={true} onClose={() => {}} />
        
       
      </main>
      
    </div>
  );
}