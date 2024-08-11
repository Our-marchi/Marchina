import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

interface Slide {
  image: string;
  title: string;
  description: string;
}

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides: Slide[] = [
    { image: 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907.jpg.og.jpg?202405161715', title: 'iPhone 14 Series', description: 'Up to 10% off Voucher' },
    { image: 'https://s.isanook.com/hi/0/ui/303/1516981/gal-1516981-20201125110042-476d797.jpg', title: 'MacBook Pro', description: 'Supercharged for pros' },
    { image: 'https://iphonewired.com/wp-content/uploads/2022/10/221004-51100-1.png', title: 'AirPods Pro', description: 'Magic like youve never heard' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <section className="relative bg-black text-white rounded-lg overflow-hidden mb-8 h-[500px]">
      <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <Image
              src={slide.image}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-xl mb-4">{slide.description}</p>
                <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={goToPrevSlide} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 text-black p-2 rounded-full hover:bg-white/75 transition duration-300"
      >
        <FaChevronLeft size={24} />
      </button>
      <button 
        onClick={goToNextSlide} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 text-black p-2 rounded-full hover:bg-white/75 transition duration-300"
      >
        <FaChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;