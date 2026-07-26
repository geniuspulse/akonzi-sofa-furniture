'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartProvider';

export default function Navbar({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <Image
            src="/images/akonzi-logo.png"
            alt="Akonzi Furniture & General Dealers"
            width={120}
            height={52}
            style={{ objectFit: 'contain', height: '52px', width: 'auto', filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <ul className={`nav-menu${menuOpen ? ' active' : ''}`} id="navMenu">
          {['/', '/about', '/products', '/blog', '/contact'].map((href, i) => (
            <li key={href}>
              <Link href={href} className="nav-link" onClick={() => setMenuOpen(false)}>
                {['Home', 'About', 'Collection', 'Blog', 'Contact'][i]}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/cart" className="nav-link cart-badge" onClick={() => setMenuOpen(false)} aria-label="Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </li>
          <li><Link href="/contact" className="nav-link nav-cta" onClick={() => setMenuOpen(false)}>Order Now</Link></li>
        </ul>

        {/* Hamburger */}
        <button
          className={`nav-toggle${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  );
}
