import React from 'react';
import { X } from 'lucide-react';

export default function HamburgerMenu({ isOpen, onClose, links = [] }) {
  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        role="dialog"
        aria-label="Main menu"
        aria-hidden={!isOpen}
        className={`fixed top-0 left-0 z-50 h-full w-72 max-w-[80%] bg-compass-cream shadow-xl
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <span className="font-display text-xl text-compass-ink">Compass</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -mr-2 text-compass-ink hover:opacity-60 transition-opacity"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-4 font-body">
          {links.length > 0 ? (
            links.map((link) => (
              
                <a
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="py-3 text-[15px] text-compass-ink/80 hover:text-compass-ink border-b border-black/5"
              >
                {link.label}
              </a>
            ))
          ) : (
            <>
              <a href="#" className="py-3 text-[15px] text-compass-ink/80 hover:text-compass-ink border-b border-black/5">
                Home
              </a>
              <a href="#" className="py-3 text-[15px] text-compass-ink/80 hover:text-compass-ink border-b border-black/5">
                How it works
              </a>
              <a href="#" className="py-3 text-[15px] text-compass-ink/80 hover:text-compass-ink border-b border-black/5">
                About
              </a>
              <a href="#" className="py-3 text-[15px] text-compass-ink/80 hover:text-compass-ink">
                Contact
              </a>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}