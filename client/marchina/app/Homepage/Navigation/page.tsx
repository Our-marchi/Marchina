
import React from 'react';

const Navigation: React.FC = () => (
  <nav className="w-64 bg-white border-r p-4">
    <ul className="space-y-2">
      {[
        "Woman's Fashion",
        "Men's Fashion",
        "Electronics",
        "Home & Lifestyle",
        "Medicine",
        "Sports & Outdoor",
        "Baby's & Toys",
        "Groceries & Pets",
        "Health & Beauty"
      ].map((item, index) => (
        <li key={index} className="flex items-center justify-between hover:bg-gray-100 p-2 rounded-md transition duration-300">
          <span className="text-gray-700 hover:text-black">{item}</span>
          <span className="text-gray-400">›</span>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;