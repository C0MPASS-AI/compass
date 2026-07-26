import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'signup', onSubmit }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: '', email: '', password: '', acceptedTerms: false });

  if (!isOpen) return null;

  const handleChange = (field) => (e) => {
    const value = field === 'acceptedTerms' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit?.(mode, form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-row">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 text-slate-400 hover:text-slate-600"
        >
          <X size={20} />
        </button>

        {/* Colored panel */}
        <div
          className="w-2/5 px-4 py-6 sm:px-8 sm:py-12 flex flex-col justify-center text-white"
          style={{ background: 'linear-gradient(160deg, #4A55C7 0%, #6EA8E8 100%)' }}
        >
          <h2 className="text-lg sm:text-3xl font-medium mb-2 sm:mb-4">
            {mode === 'signup' ? 'Welcome Back!' : 'Hello, Friend!'}
          </h2>
          <p className="hidden sm:block text-white/85 text-[15px] leading-relaxed mb-8">
            {mode === 'signup'
              ? 'To keep connected with us please login with your personal info'
              : "Enter your personal details and start your journey with us"}
          </p>
          <button
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="self-start border-2 border-white rounded-full px-4 sm:px-8 py-1.5 sm:py-2.5 text-xs sm:text-sm
              hover:bg-white hover:text-blue-600 transition-colors"
          >
            {mode === 'signup' ? 'LOG IN' : 'SIGN UP'}
          </button>
        </div>

        {/* Form panel */}
        <div className="w-3/5 px-4 py-6 sm:px-8 sm:py-12">
          <h2 className="text-lg sm:text-3xl text-slate-800 mb-3 sm:mb-6">
            {mode === 'signup' ? 'Sign Up' : 'Log In'}
          </h2>

          <div className="flex flex-col gap-2.5 sm:gap-4">
            {mode === 'signup' && (
              <input
                type="text"
                placeholder="name"
                value={form.name}
                onChange={handleChange('name')}
                className="bg-slate-200 rounded-md px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-slate-700 placeholder-slate-500
                  focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
            <input
              type="email"
              placeholder="email"
              value={form.email}
              onChange={handleChange('email')}
              className="bg-slate-200 rounded-md px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-slate-700 placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange('password')}
              className="bg-slate-200 rounded-md px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-slate-700 placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {mode === 'signup' && (
              <label className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 mt-1">
                <input
                  type="checkbox"
                  checked={form.acceptedTerms}
                  onChange={handleChange('acceptedTerms')}
                  className="w-4 h-4 accent-blue-600"
                />
                I accept terms
              </label>
            )}

            <button
              onClick={handleSubmit}
              className="mt-1 sm:mt-2 bg-blue-600 text-white font-medium tracking-wide rounded-md
                py-2 sm:py-3 text-sm sm:text-base hover:bg-blue-700 transition-colors"
            >
              {mode === 'signup' ? 'REGISTER' : 'LOG IN'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}