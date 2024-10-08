'use client'
import React, { useState, useEffect } from 'react';
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaAngleDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';


interface DecodedToken {
  role: string;
  [key: string]: any;
}

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storeRole = localStorage.getItem('role');
    if (storedUserId && storeRole) {
      setId(Number(storedUserId));
      setRole(storeRole);
    }
  }, []);

  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setRole(decodedToken.role);
      console.log(decodedToken);
      localStorage.setItem('userid',decodedToken.userid)
    }

    const cartCount = localStorage.getItem('cartItemCount');
    if (cartCount) {
      setCartItemCount(parseInt(cartCount, 10));
    }
  }, [refresh]);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCartClick = () => {
    const id = localStorage.getItem('userid');
    if (id) {
      router.push('/Cart');
    } else {
      router.push('/Login');

      router.push(`/Cart/${id}`);
      console.log('cart id passed');
    } else {
      router.push('/Login');
      console.log('cart id didn\'t pass');

    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setRefresh(!refresh);
    router.push('/LogIn');
  };

  const handleAddToCart = () => {
    const newCount = cartItemCount + 1;
    setCartItemCount(newCount);
    localStorage.setItem('cartItemCount', newCount.toString());
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/product/name`, {
        params: { name: search }
      });
      if (response.data) {
        setSearchResults([response.data]);
      } else {
        alert('Product not found');
      }
    } catch (error) {
      console.error('Error searching for product:', error);
      alert('Error searching for product');
    }
  };

  return (
    <div className="bg-white shadow-md">
      <div className="w-full h-12 px-32 py-3 bg-black flex justify-end items-center">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <div className="text-neutral-50 text-sm font-normal font-poppins leading-tight">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            </div>
            <div className="text-center text-neutral-50 text-sm font-semibold font-poppins underline leading-normal cursor-pointer">
              ShopNow
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-neutral-50 text-sm font-normal font-poppins leading-tight">English</div>
            <div className="w-6 h-6 px-1.5 py-2 flex justify-center items-center">
              <FaAngleDown className="text-neutral-50" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 flex justify-between items-center px-32 bg-white shadow-md">
        <div className="flex items-center gap-40">
          <div className="w-28 h-6 flex justify-center items-center">
            <div className="text-black text-2xl font-bold font-inter leading-normal tracking-wide">Exclusive</div>
          </div>
          <div className="flex items-center gap-12">
            <div className="relative group">
              <Link href="/Homepage" className="text-center text-black text-base font-normal font-poppins leading-normal cursor-pointer transition-colors duration-300">Home</Link>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
            <div className="relative group">
              <Link href="/contact" className="text-center text-black text-base font-normal font-poppins leading-normal cursor-pointer transition-colors duration-300">Contact</Link>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
            <div className="relative group">
              <Link href="/About" className="text-center text-black text-base font-normal font-poppins leading-normal cursor-pointer transition-colors duration-300">About</Link>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
            <div className="relative group">
              {!role && <Link href="/SignUp" className="text-center text-black text-base font-normal font-poppins leading-normal cursor-pointer transition-colors duration-300">Sign Up</Link>}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="pl-5 pr-3 py-1.5 bg-neutral-100 rounded flex items-center gap-2.5">
            <input
              type="text"
              className="bg-neutral-100 text-black text-xs font-normal font-poppins leading-none outline-none"
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="text-black cursor-pointer" onClick={handleSearch} />
          </div>
          <div className="flex items-center gap-4">
            {role && <FaHeart onClick={() => router.push('/Homepage/Wishlist')} className="text-black w-6 h-6 cursor-pointer transition-colors duration-300 hover:text-red-600" />}
            <div className="relative cursor-pointer group">
              <FaShoppingCart onClick={handleCartClick} className="text-black w-6 h-6 transition-colors duration-300 group-hover:text-red-600" />
              <div className="w-4 h-4 absolute top-0 right-0 bg-red-500 rounded-full flex justify-center items-center transition-transform duration-300 group-hover:scale-110"></div>

            </div>
            <div className="relative cursor-pointer group" onClick={toggleDropdown}>
              <FaUser className="text-black w-6 h-6 transition-colors duration-300 group-hover:text-red-600" />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
                  <div className="flex flex-col p-4">
                    {!role && <button onClick={() => router.push('/LogIn')} className="text-left text-black text-sm font-normal font-poppins leading-tight hover:text-red-600 p-2 rounded transition-colors duration-300">Login</button>}
                    {role && <button onClick={() => router.push('/Update')} className="text-left text-black text-sm font-normal font-poppins leading-tight hover:text-red-600 p-2 rounded transition-colors duration-300">Profile</button>}
                    {role && <button onClick={handleLogout} className="text-left text-black text-sm font-normal font-poppins leading-tight hover:text-red-600 p-2 rounded transition-colors duration-300">Logout</button>}
                    {role === 'seller' && <button onClick={() => router.push('/sellerDashboard')} className="text-left text-black text-sm font-normal font-poppins leading-tight hover:text-red-600 p-2 rounded transition-colors duration-300">My Shop</button>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-32 py-4">
        {searchResults.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold">Search Results:</h2>
            <ul>
              {searchResults.map((product) => (
                <li key={product.productid} className="py-2">
                  <div className="font-bold">{product.name}</div>
                  <div>{product.description}</div>
                  <div>Price: ${product.price}</div>
                  <div>Stock: {product.stock}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          search && <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
