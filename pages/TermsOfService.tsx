
import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 animate-in fade-in">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Terms of Service.</h1>
        <p className="text-gray-500 text-lg leading-relaxed font-light">
          By accessing or using Mazzé Studio, you agree to the following Terms of Service. Please read them carefully.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">01</span>
            Use of Website
          </h2>
          <p className="pl-11 text-gray-600 leading-relaxed">
            You agree to use our website for lawful purposes only. Any misuse, hacking, or harmful activity is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">02</span>
            Product Information
          </h2>
          <p className="pl-11 text-gray-600 leading-relaxed">
            We strive to display accurate product descriptions, prices, and images. However, slight variations may occur. Mazzé Studio reserves the right to correct errors at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">03</span>
            Orders & Payments
          </h2>
          <div className="pl-11 text-gray-600 leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li>All orders are subject to availability and confirmation</li>
              <li>Prices are listed in BDT unless stated otherwise</li>
              <li>We reserve the right to cancel any order if necessary</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">04</span>
            Shipping & Delivery
          </h2>
          <p className="pl-11 text-gray-600 leading-relaxed">
            Delivery times are estimated and may vary due to location, weather, or courier issues. Mazzé Studio is not responsible for delays beyond our control.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">05</span>
            Returns & Exchanges
          </h2>
          <p className="pl-11 text-gray-600 leading-relaxed">
            Return or exchange policies will apply as stated on the website or communicated at the time of purchase. Products must meet eligibility conditions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">06</span>
            Intellectual Property
          </h2>
          <p className="pl-11 text-gray-600 leading-relaxed">
            All content on this website, including logos, designs, images, and text, is the property of Mazzé Studio. Unauthorized use is prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">07</span>
            Limitation of Liability
          </h2>
          <p className="pl-11 text-gray-600 leading-relaxed">
            Mazzé Studio is not liable for indirect or incidental damages arising from the use of our products or website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">08</span>
            Account & Communication
          </h2>
          <p className="pl-11 text-gray-600 leading-relaxed">
            You are responsible for providing accurate contact information. We are not responsible for issues caused by incorrect details.
          </p>
        </section>
      </div>

      <div className="mt-20 pt-10 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">
          Last Updated: May 2024
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
