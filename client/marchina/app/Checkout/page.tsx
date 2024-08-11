"use client"
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Product {
  name: string;
  price: number;
  images: { imageurl: string }[];
}

interface CheckoutProps {
  product: Product;
}

const Checkout: React.FC<CheckoutProps> = ({ product }) => {
  const router = useRouter();

  // This effect is just to show the product in the console, remove if not needed.
  React.useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <div className="checkout-container bg-white text-gray-800 p-6 max-w-4xl mx-auto shadow-lg rounded-lg flex">
      <div className="w-2/3 pr-8">
        <h1 className="text-2xl font-bold text-red-600 mb-6">Checkout</h1>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="name" name="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" id="address" name="address" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
          </div>

          <div>
            <label htmlFor="card" className="block text-sm font-medium text-gray-700">Card Information</label>
            <input type="text" id="card" name="card" placeholder="1234 5678 9012 3456" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
          </div>

          <button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors">
            Pay ${product.price}
          </button>
        </form>
      </div>

      <div className="w-1/3 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-red-500 mb-4">Order Summary</h2>
        <ul className="space-y-4">
          <li className="flex items-center space-x-4">
            {/* <img src={product.images[0].imageurl} alt={product.name} style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "5px", width: "150px" }} className="w-15 h-15 object-cover rounded" /> */}
            <img src='' alt='' style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "5px", width: "150px" }} className="w-15 h-15 object-cover rounded" />
            <div className="flex-grow">
              <p className="font-medium">{product.name}</p>
            </div>
          </li>
        </ul>
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-red-600">${product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps<{ product: Product }> = async (context) => {
//   const { productId } = context.query;

//   // Replace with your data fetching logic
//   const product = {
//     name: 'Sample Product',
//     price: 29.99,
//     images: [{ imageurl: '/path/to/image.jpg' }]
//   };

//   return {
//     props: {
//       product
//     }
//   };
// };

export default Checkout;
