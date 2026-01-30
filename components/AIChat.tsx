
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useProducts } from '../context/ProductContext';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

type Mode = 'finder' | 'chat';
type FinderStep = 1 | 2 | 3 | 'result';

const AIChat: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('finder');
  
  // Finder States
  const [step, setStep] = useState<FinderStep>(1);
  const [selections, setSelections] = useState({
    category: '',
    budget: '',
    priority: ''
  });
  const [manualBudget, setManualBudget] = useState('');

  // Chat States
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hi! I am the Mazzé Studio Concierge. How can I help you find the perfect tech today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, step, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are the Mazzé Studio customer concierge. Mazzé Studio is a high-end, premium tech boutique. 
          Be sophisticated, minimalist, and extremely helpful. 
          The user is likely tech-savvy and appreciates fine design.
          Prices are in Taka (৳). 
          Available categories: Earbuds, Headphones, Smart Watch, Speakers, Watches, Mobile Phones, Accessories, Gaming Consoles, Controllers, Camera.
          Mention specific products when relevant. 
          Keep responses concise and professional.`,
        },
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'I apologize, I am having trouble connecting with the studio servers.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'The studio concierge is currently unavailable. Please try again in a moment.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['Earbuds', 'Headphones', 'Smart Watch', 'Speakers', 'Watches', 'Mobile Phones', 'Accessories', 'Gaming Consoles', 'Controllers', 'Camera'];
  const priorities = ['Performance', 'Design Aesthetic', 'Reliability', 'Value'];

  const matches = useMemo(() => {
    if (step !== 'result') return [];
    const budgetNum = parseFloat(selections.budget);
    
    // Use the dynamic products from context instead of static constants
    let filtered = products.filter(p => p.category === selections.category);
    
    if (!isNaN(budgetNum)) {
      // STRICT FILTER: Always filter by price, no fallback to showing over-budget items
      filtered = filtered.filter(p => p.price <= budgetNum);
    }
    
    return filtered.slice(0, 3);
  }, [step, selections, products]);

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    navigate('/checkout');
    setIsOpen(false);
  };

  const resetFinder = () => {
    setStep(1);
    setSelections({ category: '', budget: '', priority: '' });
    setManualBudget('');
  };

  const handleBudgetSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!manualBudget || isNaN(parseFloat(manualBudget))) return;
    setSelections({ ...selections, budget: manualBudget });
    setStep(3);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-[380px] max-w-[92vw] h-[600px] shadow-2xl rounded-[3rem] border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500 mb-4 ring-1 ring-black/5">
          <div className="p-6 border-b flex justify-between items-center bg-black text-white">
            <div className="flex gap-6">
              <button 
                onClick={() => setMode('finder')} 
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${mode === 'finder' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
              >
                Mazzé Finder
                {mode === 'finder' && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-white rounded-full"></span>}
              </button>
              <button 
                onClick={() => setMode('chat')} 
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${mode === 'chat' ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
              >
                Concierge
                {mode === 'chat' && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-white rounded-full"></span>}
              </button>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-50 p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto bg-gray-50/50 flex flex-col">
            {mode === 'finder' ? (
              <div className="p-8 flex-1 flex flex-col">
                {step === 'result' ? (
                  <div className="animate-in fade-in duration-700">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6">Your Recommended Tools</h3>
                    <div className="space-y-4">
                      {matches.length > 0 ? matches.map(p => (
                        <div key={p.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-5 group transition-all hover:shadow-xl hover:shadow-black/5">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-50 shrink-0">
                            <img src={p.images[0]} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm tracking-tight truncate">{p.name}</h4>
                            <p className="text-xs font-black tracking-tighter text-black/80">৳{p.price.toLocaleString()}</p>
                            <div className="flex gap-2 mt-3">
                              <button 
                                onClick={() => handleBuyNow(p)}
                                className="bg-black text-white text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest hover:opacity-80 transition-all"
                              >
                                Buy Now
                              </button>
                              <button 
                                onClick={() => { navigate(`/product/${p.id}`); setIsOpen(false); }}
                                className="bg-gray-100 text-black text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
                              >
                                View
                              </button>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="text-center py-16 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest italic">No {selections.category} matches found <br/> within ৳{parseFloat(selections.budget).toLocaleString()}.</p>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={resetFinder}
                      className="w-full mt-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] border-2 border-black/5 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
                    >
                      Refine Selection
                    </button>
                  </div>
                ) : (
                  <div className="animate-in slide-in-from-right-4 h-full flex flex-col">
                    <div className="mb-8">
                       <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.6em] mb-3 block">Process {step} / 3</span>
                       <h3 className="text-3xl font-bold tracking-tighter leading-tight">
                         {step === 1 && "Find your perfect gadget."}
                         {step === 2 && "Enter your max budget."}
                         {step === 3 && "Select your core priority."}
                       </h3>
                    </div>

                    <div className="flex-1 flex flex-col overflow-y-auto pr-2 custom-scrollbar">
                      {step === 2 ? (
                        <form onSubmit={handleBudgetSubmit} className="space-y-6">
                          <div className="bg-white p-8 rounded-[2rem] border-2 border-gray-100 shadow-sm transition-all focus-within:border-black focus-within:shadow-xl focus-within:shadow-black/5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">Maximum Amount (৳)</label>
                            <input 
                              autoFocus
                              type="number"
                              placeholder="e.g. 50000"
                              value={manualBudget}
                              onChange={(e) => setManualBudget(e.target.value)}
                              className="w-full bg-transparent border-none p-0 text-3xl font-bold tracking-tighter focus:ring-0 placeholder-gray-100"
                            />
                          </div>
                          <button 
                            type="submit"
                            disabled={!manualBudget || isNaN(parseFloat(manualBudget))}
                            className="w-full py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-black/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                          >
                            Set Budget
                          </button>
                        </form>
                      ) : (
                        <div className="grid grid-cols-1 gap-3 pb-6">
                          {(step === 1 ? categories : priorities).map(opt => (
                            <button
                              key={opt}
                              onClick={() => {
                                if (step === 1) {
                                  setSelections({ ...selections, category: opt });
                                  setStep(2);
                                }
                                if (step === 3) {
                                  setSelections({ ...selections, priority: opt });
                                  setStep('result');
                                }
                              }}
                              className={`text-left p-6 rounded-[2rem] border-2 transition-all group relative overflow-hidden ${
                                (step === 1 && selections.category === opt) || (step === 3 && selections.priority === opt)
                                  ? 'bg-black text-white border-black shadow-xl shadow-black/10'
                                  : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-md'
                              }`}
                            >
                              <div className="relative z-10 flex justify-between items-center">
                                <span className="text-sm font-bold tracking-tight">{opt}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                                    (step === 1 && selections.category === opt) || (step === 3 && selections.priority === opt) ? 'opacity-100' : 'opacity-0'
                                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col h-full">
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-5 rounded-[2rem] text-xs leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-5 rounded-[2rem] shadow-sm">
                        <span className="flex gap-2">
                          <span className="w-2 h-2 bg-gray-200 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-gray-200 rounded-full animate-bounce delay-150"></span>
                          <span className="w-2 h-2 bg-gray-200 rounded-full animate-bounce delay-300"></span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 border-t bg-white flex gap-3">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask the Concierge..."
                    className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-4 text-xs focus:ring-1 focus:ring-black font-medium"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className="bg-black text-white px-5 rounded-2xl hover:opacity-80 disabled:opacity-50 transition-all active:scale-90 shadow-lg shadow-black/10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black text-white w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group relative ring-4 ring-white"
        aria-label="Toggle Mazzé Assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 md:h-7 md:w-7 transition-all duration-500 ${isOpen ? 'rotate-90 opacity-0' : 'opacity-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        {isOpen && (
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-6 w-6 md:h-7 md:w-7 transition-all duration-500 rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default AIChat;
