"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaEye, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Product = {
  productid: string;
  name: string;
  price: string;
  reviewsCount: number;
  description: string;
  categorie: string;
  stock: number;
  images: { imageurl: string }[];
};

interface Wishlist {
  userid: number;
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

type DecodedToken = {
  role: string;
};

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();


  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10)); 
    }

    axios.get('http://localhost:5000/api/product/getall')
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleImageClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const addToWishlist = async (productId: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/WhishList/addWishlist', {
        userid: userId,
        productid: productId,
      });
      setWishlist(response.data);
    } catch (error) {
      console.error("Error adding product to wishlist", error);
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        userid: userId,
        productid: product.productid,
      });

      if (response.status === 200) {
        console.log(`Added ${product.name} to cart`);
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const toggleProductDetails = (product: Product) => {
    if (selectedProduct && selectedProduct.productid === product.productid) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <div className="w-full p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-8">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4">
              <div className="w-6 h-12 bg-red-600 rounded"></div>
              <div className="text-red-600 text-xl font-semibold font-['Poppins']">Our Products</div>
            </div>
            <div className="text-black text-3xl font-bold font-['Inter'] leading-tight tracking-wide">Explore Our Products</div>
          </div>
          <div className="flex gap-4 mt-4 lg:mt-0">
            <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center">
              <FaArrowLeft className="text-gray-600 w-5 h-5" />
            </div>
            <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center">
              <FaArrowRight className="text-gray-600 w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 p-4">
          {products.map((product) => (
            <div key={product.productid} className="relative flex flex-col items-start bg-white rounded-lg shadow-lg overflow-hidden w-60">
              <div className="relative w-full h-64 bg-neutral-100 rounded">
                <img
                  className="w-full h-full object-cover cursor-pointer"
                  src={product.images && product.images[0] ? product.images[0].imageurl : 'https://via.placeholder.com/150x150'}
                  alt={product.name}
                  onClick={() => handleImageClick(product)}
                />
                <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 hover:opacity-100">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="text-white text-base font-medium font-['Poppins'] p-2 bg-black rounded-full hover:bg-gray-800 transition-colors">
                    Add To Cart
                  </button>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <FaHeart className="text-black" onClick={() => addToWishlist(product.productid)} />
                  </div>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Link href={{ pathname: '/ProductDetailsPage', query: { product: JSON.stringify(product) } }}>
                      <FaEye className="text-black" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-4 gap-2 w-full">
                <div
                  className="text-black text-sm font-medium cursor-pointer hover:text-red-500"
                  onClick={() => toggleProductDetails(product)}
                >
                  {product.name}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-red-500 text-base font-medium">${product.price}</div>
                  <div className="text-gray-600 text-sm">{product.reviewsCount}</div>
                </div>
                {selectedProduct && selectedProduct.productid === product.productid && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Category:</strong> {product.categorie}</p>
                    <p><strong>Stock:</strong> {product.stock}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;