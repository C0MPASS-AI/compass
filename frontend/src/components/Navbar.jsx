import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import HamburgerMenu from './HamburgerMenu';

export default function Navbar({ variant = 'light' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const textColor = variant === 'light' ? 'text-white' : 'text-compass-ink';

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-30">
        <div className="flex items-center gap-3 px-5 py-4">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className={`${textColor} p-1 -ml-1 hover:opacity-70 transition-opacity`}
          >
            <Menu size={22} strokeWidth={2} />
          </button>
          <span className={`font-body text-[15px] tracking-wide ${textColor}`}>
            Compass
          </span>
        </div>
      </header>

      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}