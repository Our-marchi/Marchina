'use client';

import React from 'react';
import { FiMonitor, FiHeadphones, FiPhone, FiWatch, FiHeart, FiCamera } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

type Category = {
  name: string;
  icon: React.ElementType;
}

type CategoriesProps = {
  setSelectedCategory: (category: string | null) => void;
}

const categories: Category[] = [
  { name: 'Electronics', icon: FiMonitor },
  { name: 'Accessories', icon: FiHeadphones },
  { name: 'Mobile Phones', icon: FiPhone },
  { name: 'Audio', icon: FiHeadphones },
  { name: 'Wearables', icon: FiWatch },
  { name: 'Health & Personal Care', icon: FiHeart },
  { name: 'Photography', icon: FiCamera },
];

const Categories: React.FC<CategoriesProps> = ({ setSelectedCategory }) => {
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    router.push(`/Homepage/Categories/FiltredPC/${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="my-8 border border-gray-200 rounded-lg p-4 md:p-6">
      <div className="flex items-center mb-4">
        <div className="w-1 h-10 bg-red-500 mr-2"></div>
        <span className="text-red-500 font-semibold">Categories</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-4">
        {categories.map((category) => (
          <div 
            key={category.name}
            className="p-2 md:p-4 text-center rounded-lg transition duration-300 flex flex-col items-center justify-center border border-gray-200 hover:border-red-500 hover:bg-red-50 group cursor-pointer"
            onClick={() => handleCategoryClick(category.name)}
          >
            <category.icon className="w-6 h-6 md:w-10 md:h-10 mb-1 md:mb-2 text-gray-600 group-hover:text-red-500 transition duration-300" />
            <span className="text-xs md:text-sm font-medium group-hover:text-red-500 transition duration-300">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;