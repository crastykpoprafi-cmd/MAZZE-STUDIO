
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 animate-in fade-in">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold tracking-tighter mb-4">Support Hub</h1>
        <p className="text-gray-500">Find answers to the most common questions.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex justify-between items-center p-8 text-left hover:bg-gray-100 transition-colors"
            >
              <span className="font-bold text-lg">{faq.question}</span>
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-300">
                <p className="text-gray-600 leading-loose">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-24 text-center p-12 bg-black text-white rounded-[40px]">
         <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
         <p className="text-gray-400 mb-8">Our support specialist are standing by.</p>
         <div className="flex justify-center gap-4">
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-gray-200">Live Chat</button>
            <button className="border border-white/20 px-8 py-3 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-white/10">Email Us</button>
         </div>
      </div>
    </div>
  );
};

export default FAQ;
