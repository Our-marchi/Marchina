import React from 'react';
import Image from 'next/image';
import jbL from '../../../public/images/jbl-boombox-loudspeaker-wireless-speaker-audio-boombox-removebg-preview.png'

const Photo: React.FC = () => {
  const timeUnits = [
    { label: 'Days', value: '05' },
    { label: 'Hours', value: '23' },
    { label: 'Minutes', value: '59' },
    { label: 'Seconds', value: '35' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white p-8 rounded-3xl flex items-center justify-between">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.03)_50%,rgba(255,255,255,0.03)_75%,transparent_75%,transparent)] bg-[length:100px_100px]"></div>
      
      <div className="relative z-10 flex flex-col gap-4">
        <p className="text-green-500 text-sm font-semibold">Enhance Your</p>
        <h2 className="text-2xl font-bold">Music Experience</h2>
        <div className="flex gap-4">
          {timeUnits.map((unit, index) => (
            <div key={index} className="w-14 h-20 bg-white rounded-full flex flex-col items-center justify-center text-black">
              <div className="font-bold text-lg">{unit.value}</div>
              <span className="text-xs">{unit.label}</span>
            </div>
          ))}
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold w-max transition duration-300 ease-in-out hover:bg-green-600 hover:shadow-lg">
          Buy Now!
        </button>
      </div>
      <div className="relative z-10 w-64 h-48">
        <Image
          src={jbL}
          alt="JBL Boombox Speaker"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};

export default Photo;