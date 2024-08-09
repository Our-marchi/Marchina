'use client'


import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStore, FaChartLine, FaUsers, FaDollarSign, FaTruck, FaHeadset, FaShieldAlt, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IconType } from 'react-icons';

const About: React.FC = () => {
    
interface TeamMember {
    name: string;
    role: string;
    image: string;
  }
  
  interface Statistic {
    number: string;
    text: string;
    icon: IconType;
  }
  
  interface Service {
    title: string;
    description: string;
    icon: IconType;
  }


  
  const teamMembers: TeamMember[] = [
    { name: "Tom Cruise", role: "Founder & Chairman", image: "https://play-lh.googleusercontent.com/ai7FC9zp1bG8zLcl97w9rNde_oZ5s086XP1ZkBFdwf72d_owIiUVJu1-XNp6eOO-AGg" },
    { name: "Emma Watson", role: "Managing Director", image: "https://play-lh.googleusercontent.com/ai7FC9zp1bG8zLcl97w9rNde_oZ5s086XP1ZkBFdwf72d_owIiUVJu1-XNp6eOO-AGg" },
    { name: "Will Smith", role: "Product Designer", image: "https://play-lh.googleusercontent.com/ai7FC9zp1bG8zLcl97w9rNde_oZ5s086XP1ZkBFdwf72d_owIiUVJu1-XNp6eOO-AGg" }
  ];

  const statistics: Statistic[] = [
    { number: "10.5k", text: "Sellers active our site", icon: FaStore },
    { number: "33k", text: "Monthly Product Sale", icon: FaChartLine },
    { number: "45.5k", text: "Customer active in our site", icon: FaUsers },
    { number: "25k", text: "Annual gross sale in our site", icon: FaDollarSign }
  ];

  const services: Service[] = [
    { title: "FREE AND FAST DELIVERY", description: "Free delivery for all orders over $140", icon: FaTruck },
    { title: "24/7 CUSTOMER SERVICE", description: "Friendly 24/7 customer support", icon: FaHeadset },
    { title: "MONEY BACK GUARANTEE", description: "We return money within 30 days", icon: FaShieldAlt }
  ];

  const renderTeamMember = (member: TeamMember, index: number): JSX.Element => (
    <div key={index} className="bg-white">
      <Image src={member.image} alt={member.name} width={400} height={300} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{member.name}</h3>
        <p className="text-gray-600">{member.role}</p>
        <div className="flex space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-gray-600"><FaTwitter /></a>
          <a href="#" className="text-gray-400 hover:text-gray-600"><FaInstagram /></a>
          <a href="#" className="text-gray-400 hover:text-gray-600"><FaLinkedin /></a>
        </div>
      </div>
    </div>
  );

  const renderStatistic = (stat: Statistic, index: number): JSX.Element => (
    <motion.div 
      key={index} 
      className={`p-6 rounded-lg  'bg-red-500 text-white' : 'bg-white border border-gray-200'}`}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        backgroundColor: index === 1 ? "#C13030" : "#DB4444",
        color: "white"
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="text-3xl mb-2"
        whileHover={{ scale: 1.1 }}
      >
        <stat.icon />
      </motion.div>
      <h3 className="text-2xl font-bold mb-2">{stat.number}</h3>
      <p className="text-sm">{stat.text}</p>
    </motion.div>
  );

  const renderService = (service: Service, index: number): JSX.Element => (
    <div key={index} className="flex flex-col items-center text-center">
      <div className="text-4xl mb-4"><service.icon /></div>
      <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
      <p className="text-gray-600">{service.description}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center space-x-2 mb-8 text-sm">
        <span className="text-gray-500">Home</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900">About</span>
      </nav>

      <section className="flex flex-col md:flex-row justify-between items-start mb-16">
        <div className="w-full md:w-1/2 pr-8">
          <h1 className="text-4xl font-bold mb-6">Our Story</h1>
          <p className="text-base mb-4">
            Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.
          </p>
          <p className="text-base">
            Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer electronics to fashion.
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 overflow-hidden rounded-lg">
          <Image src=  "https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
 alt="Shopping" width={600} height={400} className="rounded-lg transition-transform duration-300 ease-in-out hover:scale-110" />
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {statistics.map(renderStatistic)}
      </section>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map(renderTeamMember)}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {services.map(renderService)}
      </section>
    </div>
  );
}

export default About;