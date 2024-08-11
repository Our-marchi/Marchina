'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation/page';
import HeroCarousel from './HeroCarousel/page';
import Categories from '../Homepage/Categories/index';
import ServiceFeatures from './ServiceFeature/page';
import BestSelling from './BestSeling/page';
import Photo from './Photo/page';
import ExploreProducts from './ExploreProducts/page';
// import FilteredProducts from '../Homepage/Categories/FiltredProdc/[categoryName]/page';
import NewArrival from './NewArrival/page';



type Product = {
  productid: string;
  name: string;
  price: number;
  categorie: string;
  images: { imageurl: string }[];
  rating?: number;
  reviews?: number;
}

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/product/getall');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="e-commerce-homepage bg-white max-w-full overflow-x-hidden">
      <div className="flex flex-col md:flex-row">
      
        <Navigation />
        <div className="flex-1 p-4 overflow-x-hidden">
          <HeroCarousel />
          <Categories setSelectedCategory={setSelectedCategory} />
           <BestSelling />
              <Photo />
              <ExploreProducts products={products} />
              <NewArrival />
            
       
          <ServiceFeatures />
        </div>
      </div>
    </div>
  );
};

export default HomePage;