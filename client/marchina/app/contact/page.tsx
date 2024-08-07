import React from 'react';

const Contact: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-3 h-5">
        <div className="text-sm font-normal text-black opacity-50">Home</div>
        <div className="w-3.5 h-px border border-black/50 transform rotate-[117.05deg]"></div>
        <div className="text-sm font-normal text-black">Contact</div>
      </div>
      <div className="w-96 h-96 p-10 bg-white rounded shadow flex justify-center items-center">
        <div className="flex flex-col items-end gap-8 w-full">
          <div className="flex gap-4">
            <div className="relative w-60 h-12">
              <div className="absolute w-full h-full bg-neutral-100 rounded"></div>
              <div className="section">
                <span className="text-black text-base font-normal">Your Name </span>
                <span className="text-red-500 text-base font-normal">*</span>
              </div>
            </div>
            <div className="relative w-60 h-12">
              <div className="absolute w-full h-full bg-neutral-100 rounded"></div>
              <div className="absolute left-4 top-3 opacity-50">
                <span className="text-black text-base font-normal">Your Email </span>
                <span className="text-red-500 text-base font-normal">*</span>
              </div>
            </div>
            <div className="relative w-60 h-12">
              <div className="absolute w-full h-full bg-neutral-100 rounded"></div>
              <div className="absolute left-4 top-3 opacity-50">
                <span className="text-black text-base font-normal">Your Phone </span>
                <span className="text-red-500 text-base font-normal">*</span>
              </div>
            </div>
          </div>
          <div className="relative w-full h-52">
            <div className="absolute w-full h-full bg-neutral-100 rounded"></div>
            <div className="absolute left-4 top-3 opacity-50 text-black text-base font-normal">Your Message</div>
          </div>
          <div className="px-12 py-4 bg-red-500 rounded flex justify-center items-center gap-2.5">
            <div className="text-neutral-50 text-base font-medium">Send Message</div>
          </div>
        </div>
      </div>
      <div className="w-80 h-96 p-10 bg-white rounded shadow flex flex-col items-center">
        <div className="flex flex-col items-start gap-8 w-full">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 p-2.5 bg-red-500 rounded-3xl flex justify-center items-center"></div>
              <div className="text-black text-base font-medium">Call To Us</div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="w-64 text-black text-sm font-normal">We are available 24/7, 7 days a week.</div>
              <div className="text-black text-sm font-normal">Phone: +8801611112222</div>
            </div>
          </div>
          <div className="w-64 h-px opacity-50 flex justify-center items-center">
            <div className="w-64 h-px border border-black"></div>
          </div>
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 p-2.5 bg-red-500 rounded-3xl flex justify-center items-center"></div>
              <div className="text-black text-base font-medium">Write To Us</div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <div className="w-64 text-black text-sm font-normal">Fill out our form and we will contact you within 24 hours.</div>
              <div className="text-black text-sm font-normal">Emails: customer@exclusive.com</div>
              <div className="text-black text-sm font-normal">Emails: support@exclusive.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
