import React from "react";
import Navbar from './Homepage/Navbar/page';
import Homepage from './Homepage/page';
import Footer from './Homepage/Footer/page';
import Cart from '../app/Cart/page'
import AllProducts from './AllProducts/page';
import ContactForm from "./contact/page";
import AddProd from "./addProduct/page";

import ProductDetailsPage from "./ProductDetailsPage/page"
import ErrorPage from "./ErrorPage/page";
import About from "./About/page";
import Wishlist from "./Wishlist/page";
export default function Home() {
 

    return (
      <div>
        <Navbar/>
         <main>
             {/* <About/> */}
             {/* <Wishlist/> */}
  {/* <ErrorPage/> */}
 {/* < ProductDetailsPage/> */}
      <Homepage />
        {/* <Cart/> */}
        {/* <AllProducts/> */} 
        {/* <ContactForm /> */}
       {/* <Homepage />  */}
    
        {/* <AllProducts/> */}
        {/* <AddProd /> */}
      </main>
      <Footer/>
    
      </div>
    );
      

   
  }