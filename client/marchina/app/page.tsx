import React from "react";
import Navbar from './Homepage/Navbar/page';
import Homepage from './Homepage/page';
import Footer from './Homepage/Footer/page';
import Cart from '../app/Cart/page';
import AllProducts from './AllProducts/page';
import ContactForm from "./contact/page";
// import AddProduct from './AddProduct/page' ;
import Login from "./LogIn/page";
import ProductDetailsPage from "./ProductDetailsPage/page";
import ErrorPage from "./ErrorPage/page";
import About from "./About/page";
import Wishlist from "./Wishlist/page";
// import AddProductModal from "./addprodModel/pages";
import Link from 'next/link';
import EditProfile from "./EditProfile/page";

export default function Home() {
  return (
    <div>
      
      <main>
        {/* <About/> */}
        {/* <Wishlist/> */}
        {/* <ErrorPage/> */}
        {/* <ProductDetailsPage/> */}
        <Homepage />
        {/* <Cart/> */}
        {/* <AllProducts/> */}
        {/* <ContactForm /> */}
        {/* <Cart/> */}
        {/* <ContactForm /> */}
        {/* <AddProduct/> */}
        {/* <EditProfile /> */}
        {/* <AddProductModal isOpen={true} onClose={() => {}} /> */}
      </main>
    
    </div>
  );
}