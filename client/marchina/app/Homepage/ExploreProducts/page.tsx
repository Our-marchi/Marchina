'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiHeart, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

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
  console.log('Number of products:', products.length);
  const router = useRouter();

  const handleAddToCart = (product: Product) => {
    // Implement your add to cart logic here
    console.log(`Added ${product.name} to cart`);
  };

  const handleImageClick = (product: Product) => {
    router.push(`/product/${product.productid}`);
  };

  const handleFavorite = (product: Product) => {
    // Implement your favorite logic here
    console.log(`Added ${product.name} to favorites`);
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Explore Our Products</h2>
        <div className="flex space-x-2">
          <button className="p-2 border rounded-full hover:bg-gray-100 transition-colors">
            <FiArrowLeft className="text-gray-600" />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-100 transition-colors">
            <FiArrowRight className="text-gray-600" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
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
                  className="text-white text-base font-medium font-['Poppins'] p-2 bg-black rounded-full hover:bg-gray-800 transition-colors mb-4">
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
          onClick={() => router.push('/all-products')}
        >
          View All Products
        </button>
      </div>
    </section>
  );
};

export default ExploreProducts;