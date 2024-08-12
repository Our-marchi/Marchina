import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

interface Product {
  productid: string;
  name: string;
  price: number;
  categorie: string;
  images: { imageurl: string }[];
  rating?: number;
  reviews?: number;
}

type FilteredProductsProps = {
  category: string;
  products: Product[];
}


const FilterProduct: React.FC<FilteredProductsProps> = ({ category, products: initialProducts }) => {

  const params = useParams();
  const categoryName = params.category as string || category;
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    if (categoryName && initialProducts.length === 0) {
      fetchProducts();
    } else {
      setProducts(initialProducts);
    }
  }, [categoryName, initialProducts]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/product/getall');
      const allProducts: Product[] = response.data.products;
      const filteredProducts = allProducts.filter(
        product => product.categorie.toLowerCase() === categoryName.replace(/-/g, ' ').toLowerCase()
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = (product: Product) => {
    console.log(`Added ${product.name} to cart`);
    // Implement your add to cart logic here
  };

  if (!categoryName) return null;

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 capitalize">
        {categoryName.replace(/-/g, ' ')} Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.productid} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="h-64 relative overflow-hidden">
              <Image 
                src={product.images && product.images[0] ? product.images[0].imageurl : 'https://via.placeholder.com/300x300'} 
                alt={product.name} 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-red-600 font-bold text-xl">
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-400">{'★'.repeat(Math.floor(product.rating || 0))}{'☆'.repeat(5 - Math.floor(product.rating || 0))}</span>
                  <span className="text-gray-500 text-sm ml-1">({product.reviews || 0})</span>
                </div>
              </div>
              <button 
                className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default FilteredProducts;

