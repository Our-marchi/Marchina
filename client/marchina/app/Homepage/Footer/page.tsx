'use client'
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight, FaGooglePlay, FaQrcode } from 'react-icons/fa';
import { IoLogoAppleAppstore } from 'react-icons/io5';

const Footer: React.FC = () => {
  const openExternalLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-custom-black text-text-secondary py-6 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          {/* Exclusive Column */}
          <div>
            <h2 className="text-base font-bold mb-2">Exclusive</h2>
            <p className="mb-1">Subscribe</p>
            <p className="mb-2">Get 10% off your first order</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-neutral-800 border border-neutral-700 rounded-l-md py-1 px-2 w-full focus:outline-none"
              />
              <button className="bg-neutral-700 px-2 rounded-r-md hover:bg-neutral-600">
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* Support Column */}
          <div>
            <h2 className="text-base font-bold mb-2">Support</h2>
            <p>111 Bijoy sarani, Dhaka,</p>
            <p>DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>

          {/* Account Column */}
          <div>
            <h2 className="text-base font-bold mb-2">Account</h2>
            <ul>
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </div>

          {/* Quick Link Column */}
          <div>
            <h2 className="text-base font-bold mb-2">Quick Link</h2>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Download App Column */}
          <div>
            <h2 className="text-base font-bold mb-2">Download App</h2>
            <p className="mb-2">Save $3 with App New User Only</p>
            <div className="flex space-x-2">
              <div className="w-16 h-16 bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-lg flex items-center justify-center">
                <FaQrcode className="text-3xl" />
              </div>
              <div className="flex flex-col justify-center space-y-1">
                <div 
                  onClick={() => openExternalLink('https://play.google.com/store')}
                  className="flex items-center space-x-1 bg-custom-black px-2 py-1 rounded-md hover:bg-neutral-800 cursor-pointer transition duration-300"
                >
                  <FaGooglePlay className="text-sm text-accent-2" />
                  <span className="text-xs">Google Play</span>
                </div>
                <div 
                  onClick={() => openExternalLink('https://www.apple.com/app-store/')}
                  className="flex items-center space-x-1 bg-custom-black px-2 py-1 rounded-md hover:bg-neutral-800 cursor-pointer transition duration-300"
                >
                  <IoLogoAppleAppstore className="text-sm text-sky-100" />
                  <span className="text-xs">App Store</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mt-4">
          <FaFacebook className="text-lg hover:text-indigo-500 cursor-pointer" />
          <FaTwitter className="text-lg hover:text-sky-100 cursor-pointer" />
          <FaInstagram className="text-lg hover:text-accent-1 cursor-pointer" />
          <FaLinkedin className="text-lg hover:text-indigo-600 cursor-pointer" />
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 text-xs text-neutral-400">
          <p>© Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;