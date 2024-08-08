'use client'

import React, { useState, useEffect } from 'react';
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaAngleDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';

type DecodedToken = {
  role: string;
  [key: string]: any;
}

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');
  const router = useRouter();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token) as DecodedToken;
      setRole(decodedToken.role);
      console.log(decodedToken);
    }
  }, [refresh]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setRefresh(!refresh);
    router.push('/Login');
  };

  return (
    <div className="bg-white shadow-md">
      {/* Top Header */}
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

      {/* Main Header */}
      <div className="h-16 flex justify-between items-center px-32 bg-white shadow-md">
        <div className="flex items-center gap-40">
          <div className="w-28 h-6 flex justify-center items-center">
            <div className="text-black text-2xl font-bold font-inter leading-normal tracking-wide">Exclusive</div>
          </div>
          <div className="flex items-center gap-12">
            <div className="relative group">
              <Link href="/" className="text-center text-black text-base font-normal font-poppins leading-normal cursor-pointer transition-colors duration-300">Home</Link>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
            <div className="relative group">
              <Link href="/Contact" className="text-center text-black text-base font-normal font-poppins leading-normal cursor-pointer transition-colors duration-300">Contact</Link>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
            <div className="relative group">
              <Link href="/About" className="text-center text-black text-base font-normal font-poppins leading-normal cursor-pointer transition-colors duration-300">About</Link>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
            <div className="relative group">
              {!role && <Link href="/Signup" className="text-center text-black text-base font-normal font-poppins leading-normal cursor-pointer transition-colors duration-300">Sign Up</Link>}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="pl-5 pr-3 py-1.5 bg-neutral-100 rounded flex items-center gap-2.5">
            <div className="opacity-50 text-black text-xs font-normal font-poppins leading-none">What are you looking for?</div>
            <FaSearch className="text-black" />
          </div>
          <div className="flex items-center gap-4">
            {role && <FaHeart onClick={() => router.push('/Wishlist')} className="text-black w-6 h-6 cursor-pointer transition-colors duration-300 hover:text-red-600" />}
            <div className="relative cursor-pointer group">
              {role && <FaShoppingCart onClick={() => router.push('/Cart')} className="text-black w-6 h-6 transition-colors duration-300 group-hover:text-red-600" />}
              <div className="w-4 h-4 absolute top-0 right-0 bg-red-500 rounded-full flex justify-center items-center transition-transform duration-300 group-hover:scale-110">
                {/* <div className="text-neutral-50 text-xs font-normal font-poppins leading-none">2</div> */}
              </div>
            </div>
            <div className="relative cursor-pointer group" onClick={toggleDropdown}>
              <FaUser className="text-black w-6 h-6 transition-colors duration-300 group-hover:text-red-600" />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
                  <div className="flex flex-col p-4">
                    {!role && <button onClick={() => router.push('/Login')} className="text-left text-black text-sm font-normal font-poppins leading-tight hover:text-red-600 p-2 rounded transition-colors duration-300">Login</button>}
                    {role && <button onClick={() => router.push('/Update')} className="text-left text-black text-sm font-normal font-poppins leading-tight hover:text-red-600 p-2 rounded transition-colors duration-300">Profile</button>}
                    {role && <button onClick={handleLogout} className="text-left text-black text-sm font-normal font-poppins leading-tight hover:text-red-600 p-2 rounded transition-colors duration-300">Logout</button>}
                    {role === 'admin' && <button onClick={() => router.push('/admin-dashboard')} className="text-left text-black text-sm font-normal font-poppins leading-tight hover:text-red-600 p-2 rounded transition-colors duration-300">Dashboard</button>}
                    {role === 'seller' && <button onClick={() => router.push('/MyShop')} className="text-left text-black text-sm font-normal font-poppins leading-tight hover:text-red-600 p-2 rounded transition-colors duration-300">My Shop</button>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;