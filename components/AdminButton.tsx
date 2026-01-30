
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminButton: React.FC = () => {
  const navigate = useNavigate();
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '4048') {
      setShowPinModal(false);
      setPin('');
      setError(false);
      navigate('/admin');
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPinModal(true)}
        className="fixed bottom-6 left-6 z-[60] bg-white text-black w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 border border-gray-100 group ring-4 ring-black/5"
        aria-label="Admin Access"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 text-gray-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      </button>

      {showPinModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold tracking-tighter">Studio Override</h2>
              <p className="text-gray-400 text-xs font-black uppercase tracking-[0.3em] mt-2">Authorization Required</p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-6">
              <input
                autoFocus
                type="password"
                maxLength={4}
                placeholder="••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className={`w-full bg-gray-50 border-2 rounded-2xl px-6 py-5 text-3xl text-center tracking-[1em] focus:ring-0 outline-none transition-all ${error ? 'border-red-500 animate-shake' : 'border-gray-100 focus:border-black'}`}
              />
              {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-pulse">Invalid Authorization Code</p>}
              
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => { setShowPinModal(false); setPin(''); setError(false); }}
                  className="flex-1 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] bg-black text-white py-4 rounded-full font-black text-[10px] tracking-[0.3em] uppercase shadow-xl shadow-black/10 active:scale-95 transition-transform"
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default AdminButton;
