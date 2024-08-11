'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import jwtDecode from 'jwt-decode';

interface Product {
  productid: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categorie: string;
  salesCount?: number;
  images: { imageurl: string }[];
}

interface Stats {
  totalProducts: number;
  totalSales: number;
  revenue: number;
}

const SallerDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [stats, setStats] = useState<Stats>({ totalProducts: 0, totalSales: 0, revenue: 0 });
  const [userid, setUserid] = useState<number | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    const userIdd = localStorage.getItem('userId');
    if (userIdd) {
      setUserid(Number(userIdd));
    }
  }, []);

  useEffect(() => {
    if (userid !== null) {
      fetchUserProducts();
    }
  }, [userid]);

  const fetchUserProducts = async () => {
    try {
      const response = await axios.get<{ products: Product[] }>(`http://localhost:5000/api/product/user/${userid}`);
      const fetchedProducts = response.data.products;
      setProducts(fetchedProducts);
      setStats({
        totalProducts: fetchedProducts.length,
        totalSales: fetchedProducts.reduce((acc, product) => acc + (product.salesCount || 0), 0),
        revenue: fetchedProducts.reduce((acc, product) => acc + (product.price * (product.salesCount || 0)), 0),
      });
    } catch (error) {
      console.error('Error fetching user products:', error);
    }
  };

  const handleViewAll = () => {
    setVisibleProducts(products.length);
  };

  const toggleProductDetails = (product: Product) => {
    setSelectedProduct(selectedProduct && selectedProduct.productid === product.productid ? null : product);
  };

  const deleteProduct = async (productid: number) => {
    await axios.delete(`http://localhost:5000/api/product/delete/${productid}`);
    await fetchUserProducts();
  };

  const handleCloseModal = () => {
    setIsAddProductModalOpen(false);
    fetchUserProducts();
  };

  const handleSubmitNewProduct = async (newProduct: Product) => {
    console.log('New product submitted:', newProduct);
    setIsAddProductModalOpen(false);
    await fetchUserProducts();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="w-full p-6">
        <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Products</h2>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
            <p className="text-3xl font-bold">{stats.totalSales}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
            <p className="text-3xl font-bold">${stats.revenue.toFixed(2)}</p>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-8">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4">
              <div className="w-6 h-12 bg-red-600 rounded"></div>
              <div className="text-red-600 text-xl font-semibold font-['Poppins']">Your Products</div>
            </div>
            <div className="text-black text-3xl font-bold font-['Inter'] leading-tight tracking-wide">Manage Your Products</div>
          </div>
          <Link href="/addProduct" className="mt-4 lg:mt-0 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out flex items-center">
            <FaPlus className="mr-2" /> Add New Product
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, visibleProducts).map((product) => (
            <div key={product.productid} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                className="w-full h-48 object-cover"
                src={product.images && product.images[0] ? product.images[0].imageurl : 'https://via.placeholder.com/150x150'}
                alt={product.name}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">Price: ${product.price}</p>
                <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
                <button
                  onClick={() => toggleProductDetails(product)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {selectedProduct && selectedProduct.productid === product.productid ? 'Hide Details' : 'Show Details'}
                </button>
                <button
                  onClick={() => deleteProduct(product.productid)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
                {selectedProduct && selectedProduct.productid === product.productid && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Category:</strong> {product.categorie}</p>
                    <p><strong>Sales:</strong> {product.salesCount || 0}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {visibleProducts < products.length && (
          <div className="mt-8 text-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out"
              onClick={handleViewAll}
            >
              View All Your Products
            </button>
          </div>
        )}
      </div>

      {/* <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitNewProduct}
      /> */}
    </div>
  );
};

export default SallerDashboard;
