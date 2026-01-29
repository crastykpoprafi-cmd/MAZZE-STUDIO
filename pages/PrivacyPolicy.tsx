
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 animate-in fade-in">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">Privacy Policy.</h1>
        <p className="text-gray-500 text-lg leading-relaxed font-light">
          Welcome to Mazzé Studio. Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit or shop from our website or contact us through any platform.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">01</span>
            Information We Collect
          </h2>
          <div className="pl-11 text-gray-600 leading-relaxed space-y-2">
            <p>We may collect the following information when you use our services:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Shipping address</li>
              <li>Order and payment details</li>
              <li>Messages or inquiries you send us</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">02</span>
            How We Use Your Information
          </h2>
          <div className="pl-11 text-gray-600 leading-relaxed space-y-2">
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Process and deliver your orders</li>
              <li>Communicate with you about orders, updates, or support</li>
              <li>Improve our products and services</li>
              <li>Prevent fraud and ensure secure transactions</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">03</span>
            Payment Information
          </h2>
          <p className="pl-11 text-gray-600 leading-relaxed">
            We do not store your payment details. Payments are processed securely through trusted payment gateways such as Cash on Delivery, bKash, Nagad, or other supported methods.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">04</span>
            Data Protection
          </h2>
          <p className="pl-11 text-gray-600 leading-relaxed">
            We take reasonable security measures to protect your personal data from unauthorized access, misuse, or loss.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">05</span>
            Sharing of Information
          </h2>
          <div className="pl-11 text-gray-600 leading-relaxed space-y-2">
            <p>We do not sell or rent your personal information. Your data may only be shared with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Delivery partners (for shipping purposes)</li>
              <li>Payment providers (for transaction processing)</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">06</span>
            Cookies
          </h2>
          <p className="pl-11 text-gray-600 leading-relaxed">
            Our website may use cookies to improve user experience and analyze website traffic. You can disable cookies in your browser settings if you prefer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-xs font-black">07</span>
            Your Rights
          </h2>
          <div className="pl-11 text-gray-600 leading-relaxed space-y-4">
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Request access to your personal data</li>
              <li>Ask for correction or deletion of your information</li>
            </ul>
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <p className="text-xs font-black uppercase tracking-widest text-black mb-2">Request Access</p>
              <p className="text-sm">To do so, contact us at: <a href="https://wa.me/8801995112279" target="_blank" className="font-bold underline">Whatsapp: +8801995112279</a></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
