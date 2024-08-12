"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

interface WishlistItem {
  productid: number;
  Product: {
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    images: { imageurl: string }[];
    isNew?: boolean;
    rating?: number;
    reviewCount?: number;
  };
  wishlistid: number;
}

interface JustForYouItem {
  id: number;
  name: string;
  price: number;
  image: string;
  originalPrice?: number;
  discount?: number;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: { userid: number } = jwtDecode(token);
      setUserId(decodedToken.userid);
    }
  }, []);
  

  const fetchWishlist = async () => {
    try {
      if (userId) {
        const response = await axios.get(`http://localhost:5000/api/WhishList/${userId}`);
        setWishlistItems(response.data);
      }
    } catch (error) {
      console.error("Error in fetching wishlist", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchWishlist();
    }
  }, [userId]);

  const addToWishlist = async (productId: number) => {
    try {
      const response = await axios.post('http://localhost:5000/api/WhishList/addWishlist', {
        userid: userId,
        productid: productId
      });
      setWishlistItems(response.data);
    } catch (error) {
      console.error("Error adding product to wishlist", error);
    }
  };

  const removeFromWishlist = async (wishlistId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/WhishList/del/${wishlistId}`);
      fetchWishlist();
    } catch (error) {
      console.error("Error removing product from wishlist", error);
    }
  };

  const justForYouItems: JustForYouItem[] = [
    {
      id: 1,
      name: "Stylish Watch",
      price: 199.99,
      image: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
      discount: 10,
      isNew: true,
      rating: 4.5,
      reviewCount: 120
    },
    {
      id: 2,
      name: "Leather Bag",
      price: 149.99,
      image: "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
      originalPrice: 179.99,
      rating: 4.2,
      reviewCount: 85
    },
    {
      id: 3,
      name: "Sunglasses",
      price: 79.99,
      image: "https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg",
      isNew: true,
      rating: 4.8,
      reviewCount: 200
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 129.99,
      image: "https://fps.cdnpk.net/home/cover/image-14-sm.webp?w=438&h=438",
      discount: 15,
      rating: 4.6,
      reviewCount: 150
    }
  ];

  const Wishlist: React.FC<{ product: WishlistItem; isWishlist: boolean }> = ({ product, isWishlist }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-[400px] relative group flex-shrink-0 w-[280px] transition-all duration-300 ease-in-out hover:scale-105">
        <div className="relative h-3/4">
          <img 
            src={product.Product.images[0].imageurl}
            alt={product.Product.name} 
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
          {product.Product.discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
              -{product.Product.discount}%
            </span>
          )}
          {product.Product.isNew && (
            <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
              NEW
            </span>
          )}
          <button className="absolute top-2 right-2 bg-white p-1 rounded-full" onClick={() => removeFromWishlist(product.wishlistid)}>
            {isWishlist ? (
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.68 1.662-1.196 2.385C18.268 16.057 14.477 19 10 19c-4.477 0-8.268-2.943-9.542-7 .274-.857.68-1.662 1.196-2.385z"></path>
              </svg>
            )}
          </button>
        </div>
        <div className="p-4 h-1/4">
          <h3 className="font-semibold text-lg mb-2 truncate">{product.Product.name}</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-red-500 font-bold">${product.Product.price}</span>
              {product.Product.originalPrice && (
                <span className="text-gray-500 line-through ml-2">${product.Product.originalPrice}</span>
              )}
            </div>
            {product.Product.rating && (
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"></path>
                    </svg>
                  ))}
                </div>
                <span className="text-gray-500 text-sm ml-1">({product.Product.reviewCount})</span>
              </div>
            )}
          </div>
        </div>
        <button className="w-full bg-black text-white py-2 absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          Add To Cart
        </button>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Wishlist ({wishlistItems.length})</h2>
          <button className="bg-white text-black px-4 py-2 rounded border border-black hover:bg-gray-100 transition-colors">
            Move All To Bag
          </button>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
          {wishlistItems.map(item => (
            <Wishlist key={item.productid} product={item} isWishlist={true} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <span className="bg-red-500 w-1 h-8 mr-2"></span>
            Just For You
          </h2>
          <button className="bg-white text-black px-4 py-2 rounded border border-black hover:bg-gray-100 transition-colors">
            See All
          </button>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
          {justForYouItems.map(item => (
            <img
              key={item.id}
              src={item.image}
              alt={item.name}
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "5px",
                width: "150px"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
