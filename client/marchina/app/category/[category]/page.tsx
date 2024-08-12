"use client";

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import FilteredProducts from '../../Homepage/FilterProduct/page';

const CategoryPage = () => {
  const params = useParams();
  const category = params.category as string;

 
  const validCategories = [
    'electronics', 
    'accessories', 
    'mobile-phones', 
    'audio', 
    'wearables', 
    'health-personal-care', 
    'photography'
  ];


  if (!validCategories.includes(category)) {
    notFound();
  }

  return <FilteredProducts category={category} products={[]} />;
};

export default CategoryPage;