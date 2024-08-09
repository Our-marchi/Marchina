import React from "react";
import Navbar from './Homepage/Navbar/page';
import Homepage from './Homepage/page';
import Footer from './Homepage/Footer/page';
import Cart from '../app/Cart/page'
import AllProducts from './AllProducts/page';
import ContactForm from "./contact/page";
import AddProd from "./addProduct/page";


export default function Home() {
    return (
      <div>
        <Navbar/>
         <main>
          {/* <ContactForm /> */}
       {/* <Homepage />  */}
        {/* {/ <Cart/> */} 
        {/* <AllProducts/> */}
        <AddProd />
      </main>
      <Footer/>
    
      </div>

    );
  }