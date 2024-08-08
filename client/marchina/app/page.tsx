import React from "react";
import Navbar from './Homepage/Navbar/page';
import Homepage from './Homepage/page';
import Footer from './Homepage/Footer/page';
import Cart from '../app/Cart/page'
import AllProducts from './AllProducts/page';


export default function Home() {
    return (
      <div>
        <Navbar/>
         <main>
            
      {/* <Homepage /> /}
        {/ <Cart/> */}
        <AllProducts/>
      </main>
      <Footer/>
    );
      </div>

    );
  }