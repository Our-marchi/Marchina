'use client';

import React, { useState, useEffect } from 'react';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import axios from 'axios';

type CartProps = {
  className?: string;
};

type CartItem = {
  cartid: number;
  productid: number;
  userid: number;
  createdAt: string;
  updatedAt: string;
  Product: {
    productid: number;
    name: string;
    price: string; 
    images: {imageurl: string;
    }[];
  };
};


const Cart: React.FC<CartProps> = ({ className = '' }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userId, setIdd] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIdd(storedUserId);
    }
  }, []);
  
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/cart/${userId}`)
        .then((response) => {
          setCartItems(response.data || []);
        })
        .catch((error) => console.error('Error fetching cart items:', error));
    }
  }, [userId]);
  
console.log(cartItems)
  const deleteItem = (cartid: number) => {
    axios.delete(`http://localhost:5000/api/cart/${cartid}`)
      .then(() => {
        
        setCartItems(cartItems.filter(item => item.cartid !== cartid));
      })
      .catch((error) => console.error('Error deleting cart item:', error));
  }

  return (
    <div className={`cart ${className} min-h-screen bg-gray-100`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-black">Shopping Cart</h1>

        <div className="flex flex-col gap-8">
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-4">Product</th>
                    <th className="text-right pb-4">Price</th>
                    <th className="text-right pb-4">Quantity</th>
                    <th className="text-right pb-4">Subtotal</th>
                    <th className="text-right pb-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <tr key={item.cartid} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center">
                            <img className="w-16 h-16 mr-4" src={item.Product.images[0]?.imageurl} alt={item.Product.name} />
                            <span className="font-semibold">{item.Product.name}</span>
                          </div>
                        </td>
                        <td className="text-right py-4">${parseFloat(item.Product.price).toFixed(2)}</td>
                        <td className="text-right py-4">
                          <div className="flex items-center justify-end">
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                              <FaMinus />
                            </button>
                            <input className="mx-2 border text-center w-12" type="text" value={1} readOnly />  {/* Assuming quantity is 1 for simplicity */}
                            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                              <FaPlus />
                            </button>
                          </div>
                        </td>
                        <td className="text-right py-4">${parseFloat(item.Product.price).toFixed(2)}</td>
                        <td className="text-right py-4">
                          <button className="text-red-500 focus:outline-none" onClick={() => deleteItem(item.cartid)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4">No items in cart</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mb-8">
              <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300">
                Continue Shopping
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                Update Cart
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Apply Coupon</h2>
                <div className="flex flex-col">
                  <input 
                    className="bg-gray-100 text-gray-800 placeholder-gray-500 p-3 rounded-lg mb-3 focus:outline-none" 
                    placeholder="Enter coupon code" 
                    type="text" 
                  />
                  <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Cart Total</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${cartItems.reduce((total, item) => total + parseFloat(item.Product.price), 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between mb-4">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-semibold text-lg">${cartItems.reduce((total, item) => total + parseFloat(item.Product.price), 0).toFixed(2)}</span>
                </div>
                <button className="bg-red-500 text-white py-3 px-6 rounded-lg w-full hover:bg-red-600 transition duration-300 text-lg font-semibold">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
