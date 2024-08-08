import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NewArrival: React.FC = () => {
  return (
    <section className="mb-8">
      <div className="flex items-center mb-4">
        <div className="w-1 h-6 bg-red-500 mr-2"></div>
        <h2 className="text-2xl font-bold">New Arrival</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="PlayStation 5"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 p-6 flex flex-col justify-end">
            <h3 className="text-white text-2xl font-bold mb-2">PlayStation 5</h3>
            <p className="text-gray-200 mb-4">Black and White version of the PS5 coming out on sale.</p>
            <Link href="/product/playstation5" className="text-white underline hover:text-gray-200">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "Women's Collections", description: "Featured woman collections that give you another vibe.", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" },
            { title: "Speakers", description: "Amazon wireless speakers", image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
            { title: "Perfume", description: "GUCCI INTENSE OUD EDP", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" },
          ].map((item, index) => (
            <div key={index} className="relative h-[240px] md:h-[240px] overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-end">
                <h3 className="text-white text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-gray-200 text-sm mb-2">{item.description}</p>
                <Link href={`/category/${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-white text-sm underline hover:text-gray-200">
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;