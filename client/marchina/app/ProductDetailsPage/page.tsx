"use client"
import React, { useState, useEffect } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Use Next.js router
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


// Define TypeScript interfaces for props
interface Product {
  productid: string;
  name: string;
  categorie: string;
  description: string;
  price: number;
  images: { imageurl: string }[];
  ratings: { rating: number }[];
};

interface DecodedToken {
  userid: number;
}

interface ProductDetailsPageProps {
  product: Product;
}



const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({product}) => {
  const [quantity, setQuantity] = useState(1);
  const [hover, setHover] = useState<number | null>(null);
  const [userId, setUserId] = useState<number>(0);
  const [image, setImage] = useState<string>(product.images[0]?.imageurl || '');


  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setUserId(decodedToken.userid);
    }
  }, []);

  const calculateRating = () => {
    let sum = 0;
    product.ratings.forEach(rating => {
      sum += rating.rating;
    });
    return sum / product.ratings.length;
  };

  const [rating, setRating] = useState(calculateRating());

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleRating = (rate: number) => {
    axios.post('http://localhost:5000/api/RatingRouter/addRating', { userid: userId, productid: product.productid, rating: rate })
      .then(response => {
        console.log('Rating added');
      })
      .catch(error => {
        console.error('Error adding Rating:', error);
      });
  };

  const handleAddToCart = () => {
    axios.post('http://localhost:5000/api/CartRouter/addCart', { userid: userId, productid: product.productid })
      .then(response => {
        console.log('Product added to Cart');
      })
      .catch(error => {
        console.error('Error adding product to Cart:', error);
      });
  };

  const handleBuyNow = () => {
    router.push('/checkout'); 
  };
  // { state: { product } }

  const handleAddToWishlist = () => {
    axios.post('http://localhost:5000/api/WhishList/addWishlist', { userid: userId, productid: product.productid })
      .then((response) => {
        console.log('Product added to wishlist');
      })
      .catch((error) => {
        console.error('Error adding product to wishlist:', error);
      });
  };

  return (
    <div className="ProductDetailsPage container mx-auto p-4">
      {/* Roadmap */}
      <div className="Roadmap flex items-center gap-3 mb-4">
        <a href="/account">
          <a className="Account text-black text-sm font-normal font-['Poppins'] leading-tight hover:text-red-500 transition-colors duration-300 hover:underline cursor-pointer">
            Account
          </a>
        </a>
        <div className="Line13 w-3.5 h-px origin-top-left rotate-[117.05deg] opacity-50 border border-black"></div>
        <a href={`/category/${product.categorie}`}>
          <a className="Gaming text-black text-sm font-normal font-['Poppins'] leading-tight hover:text-red-500 transition-colors duration-300 hover:underline cursor-pointer">
            {product.categorie}
            
          </a>
        </a>
        <div className="Line16 w-3.5 h-px origin-top-left rotate-[117.05deg] opacity-50 border border-black"></div>
        <div className="ProductName text-black text-sm font-normal font-['Poppins'] leading-tight">{product.name}</div>
      </div>

      <div className="flex">
        {/* Smaller Images */}
        <div className="flex flex-col gap-4">
          {product.images[0]?.imageurl && (
            <div className="Frame895 w-44 h-36 bg-neutral-100 rounded flex justify-center items-center hover:shadow-lg transition-shadow duration-300">
              <img className="Image57 w-32 h-28" src={product.images[0].imageurl} alt="Thumbnail 1" onClick={() => setImage(product.images[0].imageurl)} />
            </div>
          )}
          {product.images[1]?.imageurl && (
            <div className="Frame896 w-44 h-36 bg-neutral-100 rounded flex justify-center items-center hover:shadow-lg transition-shadow duration-300">
              <img className="Image58 w-28 h-24" src={product.images[1].imageurl} alt="Thumbnail 2" onClick={() => setImage(product.images[1].imageurl)} />
            </div>
          )}
          {product.images[2]?.imageurl && (
            <div className="Frame897 w-44 h-36 bg-neutral-100 rounded flex justify-center items-center hover:shadow-lg transition-shadow duration-300">
              <img className="Image61 w-32 h-24" src={product.images[2].imageurl} alt="Thumbnail 3" onClick={() => setImage(product.images[2].imageurl)} />
            </div>
          )}
          {product.images[3]?.imageurl && (
            <div className="Frame919 w-44 h-36 bg-neutral-100 rounded flex justify-center items-center hover:shadow-lg transition-shadow duration-300">
              <img className="Image59 w-32 h-28" src={product.images[3].imageurl} alt="Thumbnail 4" onClick={() => setImage(product.images[3].imageurl)} />
            </div>
          )}
        </div>

        {/* Main Image */}
        <div className="Frame894 flex-1 bg-neutral-100 rounded flex justify-center items-center mx-4">
          <img className="Image63 w-96 h-80 object-contain" src={image} alt="Product" />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="HavicHvG92Gamepad text-black text-2xl font-semibold font-['Inter'] leading-normal tracking-wide">{product.name}</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="FourStar flex items-center">
              {/* Rating Div */}
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => handleRating(ratingValue)}
                      className="hidden"
                    />
                    <FaStar
                      className="text-yellow-500 cursor-pointer"
                      size={20}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                      color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    />
                  </label>
                );
              })}
            </div>
            <div className="150Reviews opacity-50 text-black text-sm font-normal font-['Poppins'] leading-tight">(150 Reviews)</div>
            <div className="Line17 w-4 h-px origin-top-left rotate-90 opacity-50 border border-black mx-2"></div>
            <div className="InStock opacity-60 text-green-500 text-sm font-normal font-['Poppins'] leading-tight">In Stock</div>
          </div>
          <div className="19200 text-black text-2xl font-normal font-['Inter'] leading-normal tracking-wide mt-4">${product.price.toFixed(2)}</div>
          <div className="Playstation5ControllerSkinHighQualityVinylWithAirChannelAdhesiveForEasyBubbleFreeInstallMessFreeRemovalPressureSensitive text-black text-sm font-normal font-['Poppins'] leading-tight mt-4">
            {product.description}
          </div>
          <div className="Underline w-full h-px mt-4 opacity-50">
            <div className="Line1 w-full h-px border border-black"></div>
          </div>

          {/* Quantity Selector */}
          <div className="Frame926 flex items-center mt-4">
            <div className="Frame906 w-10 h-11 px-2 py-2.5 rounded-tl rounded-bl border border-black/50 flex justify-center items-center cursor-pointer" onClick={handleDecrement}>
              <div className="IconMinus self-stretch grow shrink basis-0 px-1 justify-center items-center inline-flex">-</div>
            </div>
            <div className="Frame908 h-11 py-2 border-t border-b border-black/50 flex justify-center items-center">
              <div className="text-black text-xl font-medium font-['Poppins'] leading-7">{quantity}</div>
            </div>
            <div className="Frame907 w-10 h-11 px-2 py-2.5 bg-red-500 rounded-tr rounded-br flex justify-center items-center cursor-pointer" onClick={handleIncrement}>
              <div className="IconPlus self-stretch grow shrink basis-0 p-1 justify-center items-center inline-flex">+</div>
            </div>
          </div>

          {/* Buy Now, Add to Cart, and Add to Wishlist Buttons */}
          <div className="flex items-center mt-4">
            <button className="Button px-12 py-2.5 bg-red-500 rounded text-neutral-50 text-base font-medium font-['Poppins'] leading-normal cursor-pointer" onClick={()=>{router.push('/handleBuyNow',)}}>Buy Now </button>
            <button className="Button px-12 py-2.5 bg-blue-500 rounded text-neutral-50 text-base font-medium font-['Poppins'] leading-normal cursor-pointer ml-4" onClick={handleAddToCart}>Add to Cart</button>
            <button className="Button px-4 py-2.5 bg-gray-200 rounded text-black text-base font-medium font-['Poppins'] leading-normal cursor-pointer ml-4 flex items-center" onClick={handleAddToWishlist} >
              <FaHeart className="mr-2" /> Add to Wishlist
            </button>
          </div>

          {/* Delivery and Return Information */}
          <div className="Frame911 w-full h-44 mt-4 rounded border border-black/50 p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="IconDelivery w-10 h-10 relative" />
              <div className="flex flex-col">
                <div className="FreeDelivery text-black text-base font-medium font-['Poppins'] leading-normal">Free Delivery</div>
                <div className="EnterYourPostalCodeForDeliveryAvailability text-black text-xs font-medium font-['Poppins'] underline leading-none">Enter your postal code for Delivery Availability</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="IconReturn w-10 h-10 relative" />
              <div className="flex flex-col">
                <div className="ReturnDelivery text-black text-base font-medium font-['Poppins'] leading-normal">Return Delivery</div>
                <div className="Free30DaysDeliveryReturnsDetails">
                  <span style={{ color: 'black', fontSize: '12px', fontWeight: '500', fontFamily: 'Poppins', lineHeight: 'none' }}>Free 30 Days Delivery Returns. </span>
                  <span style={{ color: 'black', fontSize: '12px', fontWeight: '500', fontFamily: 'Poppins', textDecoration: 'underline', lineHeight: 'none' }}>Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items */}
      <div className="Frame925 mt-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="CategoryRectangle w-5 h-7 rounded bg-red-500"></div>
          <div className="RelatedItems text-black text-2xl font-semibold font-['Inter'] leading-normal tracking-wide">Related Items</div>
        </div>
        <div className="flex gap-6">
          {[
            'https://www.shutterstock.com/image-photo/japan-june-11-2020-presentation-260nw-1757485868.jpg',
            'https://www.shutterstock.com/image-photo/japan-june-11-2020-presentation-260nw-1757485868.jpg',
            'https://www.shutterstock.com/image-photo/japan-june-11-2020-presentation-260nw-1757485868.jpg',
            'https://www.shutterstock.com/image-photo/japan-june-11-2020-presentation-260nw-1757485868.jpg'
          ].map((src, index) => (
            <div key={index} className="Frame897 w-44 h-36 bg-neutral-100 rounded flex justify-center items-center relative group">
              <img className="Image59 w-32 h-28 object-cover" src={src} alt={`Related Item ${index + 1}`} />
              <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black to-transparent flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-full py-2 bg-red-500 text-white text-sm rounded-b-lg shadow-md hover:bg-red-600 transition-colors duration-300">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};




export default ProductDetailsPage;
