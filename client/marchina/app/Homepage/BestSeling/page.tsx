import React from 'react';
import Image from 'next/image';

type Product ={
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
}

const BestSelling: React.FC = () => {
  const products: Product[] = [
    {
      name: 'Fitness Tracker Pro',
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
      price: 149,
      rating: 4.6,
      reviews: 78
    },
    {
      name: 'Smartphone X1',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      price: 799,
      rating: 4.8,
      reviews: 120
    },
    {
      name: 'RGB liquid CPU cooler',
      image: 'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      price: 260,
      rating: 4.5,
      reviews: 65
    },
    {
      name: 'Wireless headphones',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80',
      price: 260,
      rating: 4.5,
      reviews: 65
    },
  ];

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Best Selling Products</h2>
        <button className="bg-red-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-red-600 hover:shadow-lg">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border rounded-lg p-4 flex flex-col">
            <div className="h-48 mb-2 overflow-hidden rounded-lg relative">
              <Image 
                src={product.image} 
                alt={product.name} 
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-110"
              />
            </div>
            <h3 className="font-semibold flex-grow">{product.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-red-500 font-medium">${product.price}</span>
              <div className="flex items-center">
                <span className="text-yellow-500">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                <span className="text-gray-500 text-sm ml-1">({product.reviews})</span>
              </div>
            </div>
            <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600 transition duration-300">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSelling;