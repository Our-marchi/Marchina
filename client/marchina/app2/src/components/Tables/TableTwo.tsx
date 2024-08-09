import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the ProductData type based on the data structure you're using
interface ProductData {
  name: string;
  price: string; // Assuming price is a string from your data
  categorie: string;
  stock: number;
  productid: number;
  images: {
    imageurl: string;
  }[]; // Assuming images is an array of objects with imageurl
}

const TableTwo: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/product/getAll')
      .then((response) => {
        const data = response.data.products;
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Expected 'products' to be an array but got:", data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (productid: number) => {
    axios.delete(`http://localhost:5000/api/product/delete/${productid}`)
      .then(() => {
        
        setProducts(products.filter(product => product.productid !== productid));
      })
      .catch((error) => console.error("Failed to delete product:", error));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          All Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Stock</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {products.map((product, index) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={index}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={product.images[0]?.imageurl || "/images/product/default.png"} alt={product.name} />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.categorie}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.price} DT
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.stock}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <button
              onClick={() => handleDelete(product.productid)}
              className="px-2 py-1 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
