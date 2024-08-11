'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt } from 'react-icons/fa';
import Link from 'next/link';
import { Router } from 'next/router';

// Define types for your state
interface Product {
  name: string;
  description: string;
  price: string;
  stock: string;
  categorie: string;
  userid: string;
}

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
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserid(storedUserId);
      setProduct(prev => ({ ...prev, userid: storedUserId }));
    }
  }, []);

  const convertBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadSingleImage = async (base64: string | ArrayBuffer | null) => {
    try {
      const res = await axios.post<string>('http://localhost:5000/uploadImage', { image: base64 });
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

  const uploadMultipleImages = async (images: (string | ArrayBuffer | null)[]) => {
    try {
      const res = await axios.post<string[]>('http://localhost:5000/uploadMultipleImages', { images });
      setUrl(res.data[0]);
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
      await uploadSingleImage(base64);
      return;
    }

    const base64s: (string | ArrayBuffer | null)[] = [];
    for (let i = 0; i < files.length; i++) {
      const base = await convertBase64(files[i]);
      base64s.push(base);
    }
    await uploadMultipleImages(base64s);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!product.name || !product.price || !product.stock) {
      alert('Please fill in all required fields (name, price, stock)');
      return;
    }

    try {
      const response = await axios.post<{ product: { productid: string } }>('http://localhost:5000/api/product/add', product);
      const newProductId = response.data.product.productid;
      setProductId(newProductId);
      setShowImageUpload(true);
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
      alert('Failed to add product. Please check the console for more details.');
    }
  };
const handleCancel =()=>{
  router.push('/sellerDashboard')
}
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
              <Link href="/sellerDashboard"className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
              >
              cancel
              </Link>
              {/* <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
              >
                Cancel
              </button> */}
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
                <div className="text-center">
                  <FaCloudUploadAlt className="text-4xl text-gray-400" />
                  <p className="mt-1 text-sm text-gray-600">
                    <label htmlFor="file-upload" className="cursor-pointer font-medium text-red-600 hover:text-red-500">
                      Upload a single image or multiple images
                    </label>
                  </p>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={uploadImage}
                    className="hidden"
                  />
                </div>
              </div>
              {url && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">Uploaded Images</h3>
                  <div className="mt-2 flex flex-wrap gap-4 justify-center">
                    {url.split(',').map((imageUrl, index) => (
                      <img key={index} src={imageUrl} alt={`Product Image ${index + 1}`} className="w-32 h-32 object-cover rounded-lg shadow-md" />
                    ))}
                  </div>
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
