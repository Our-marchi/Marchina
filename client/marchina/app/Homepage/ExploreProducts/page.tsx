'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiHeart, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';

type Product = {
  productid: string;
  name: string;
  price: number;
  images: { imageurl: string }[];
  rating?: number;
  reviews?: number;
}

type ExploreProductsProps = {
  products: Product[];
}

const ExploreProducts: React.FC<ExploreProductsProps> = ({ products }) => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/product/getall');
        setAllProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleImageClick = (product: Product) => {
    router.push(`/product/${product.productid}`);
  };

  const handleFavorite = (product: Product) => {
    console.log(`Added ${product.name} to favorites`);
  };

  const handleAddToCart = (product: Product) => {
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Explore Our Products</h2>
        <div className="flex space-x-2">
          <button
            className="p-2 border rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setVisibleProducts((prev) => Math.max(prev - 8, 8))}
          >
            <FiArrowLeft className="text-gray-600" />
          </button>
          <button
            className="p-2 border rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setVisibleProducts((prev) => Math.min(prev + 8, allProducts.length))}
          >
            <FiArrowRight className="text-gray-600" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allProducts.slice(0, visibleProducts).map((product) => (
          <div key={product.productid} className="border rounded-lg p-4 relative">
            <div className="relative h-48 mb-2 group">
              <Image
                className="object-cover cursor-pointer rounded"
                src={product.images && product.images[0] ? product.images[0].imageurl : 'https://via.placeholder.com/150x150'}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                onClick={() => handleImageClick(product)}
              />
              <button
                className="absolute top-2 right-2 p-1 rounded-full bg-white"
                onClick={() => handleFavorite(product)}
              >
                <FiHeart className="text-gray-500 hover:text-red-500" />
              </button>
              <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="text-white text-base font-medium font-['Poppins'] p-2 bg-black rounded-full hover:bg-gray-800 transition-colors mb-4"
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <h3 className="font-semibold truncate">{product.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-red-500 font-semibold">
                ${product.price || '0.00'}
              </span>
              <div className="flex items-center">
                <span className="text-yellow-500 text-sm">
                  {'★'.repeat(Math.floor(product.rating || 0))}
                  {'☆'.repeat(5 - Math.floor(product.rating || 0))}
                </span>
                <span className="text-gray-500 text-xs ml-1">({product.reviews || 0})</span>
              </div>
            </div>
            {product.price < 500 && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">New</span>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded transition duration-300 ease-in-out hover:bg-red-600 hover:shadow-lg"
          onClick={() => router.push('/AllProducts')}
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default ExploreProducts;