'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { jwtDecode } from "jwt-decode";
import Image from 'next/image';


interface DecodedToken {
    userid: string;
  
  }

interface Product {
  name: string;
  description: string;
  price: string;
  stock: string;
  categorie: string;
  userid: string;
}

interface DecodedToken {
  userid: string;
}

const FaCloudUploadAlt = dynamic(() => import('react-icons/fa').then(mod => mod.FaCloudUploadAlt), {
  ssr: false,
});

const AddProd: React.FC = () => {
  const [userid, setUserid] = useState<string>('');
  const [productId, setProductId] = useState<string>('');
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    price: '',
    stock: '',
    categorie: '',
    userid: ''
  });
  const [url, setUrl] = useState<string>('');
  const [showImageUpload, setShowImageUpload] = useState<boolean>(false);

  useEffect(() => {
    const getToken = () => {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
      }
      return null;
    };

    const token = getToken();
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUserid(decodedToken.userid);
      setProduct(prev => ({ ...prev, userid: decodedToken.userid }));
    }
  }, []);

  const convertBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadSingleImage = async (base64: string) => {
    try {
      const res = await axios.post('http://localhost:5000/api/uploadImage', { image: base64 });
      setUrl(res.data);
      if (res.data) {
        await axios.post(`http://localhost:5000/api/product/images/${productId}`, { imageurl: res.data });
      } else {
        console.error('No URL received from image upload');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const uploadMultipleImages = async (images: string[]) => {
    try {
      const res = await axios.post('/api/uploadMultipleImages', { images });
      setUrl(res.data);
      if (res.data) {
        await axios.post(`http://localhost:5000/api/product/images/${productId}`, { imageurl: JSON.stringify(res.data) });
      } else {
        console.error('No URL received from image upload');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }

    const base64s: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const base = await convertBase64(files[i]);
      base64s.push(base);
    }
    uploadMultipleImages(base64s);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.stock) {
      alert('Please fill in all required fields (name, price, stock)');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/product/add', product);
      const newProductId = response.data.product.productid;
      setProductId(newProductId);
      setShowImageUpload(true);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please check the console for more details.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-3">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New Product</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    name="categorie"
                    value={product.categorie}
                    onChange={handleInputChange}
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="price">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={product.price}
                      onChange={handleInputChange}
                      className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="stock">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                    className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    placeholder="Enter stock quantity"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="Enter product description"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
              >
                Add Product
              </button>
            </div>
          </form>

          {showImageUpload && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6 text-center">Upload Product Images</h2>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                    >
                      <span>Upload a file</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only" 
                        onChange={uploadImage} 
                        disabled={!productId}
                        multiple
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {url && (
                <div className="mt-6 max-w-xs mx-auto">
                  <img
                    src={url || "https://via.placeholder.com/300"} 
                    alt="Product" 
                    width={300} 
                    height={300} 
                    className="rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProd;