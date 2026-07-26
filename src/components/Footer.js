import { siteConfig } from '@/lib/config';
import Link from 'next/link';
import Image from 'next/image';


export default function Footer({ settings: propSettings }) {
  const settings = { ...siteConfig, ...propSettings };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/">
              <Image
                src="/images/akonzi-logo.png"
                alt={settings.name}
                width={140}
                height={60}
                style={{ objectFit: 'contain', height: '60px', width: 'auto', filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p className="footer-tagline">{settings.tagline}</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '8px' }}>{settings.address}</p>
          </div>

          {/* Explore */}
          <div className="footer-links">
            <h4>Explore</h4>
            <Link href="/about">About Us</Link>
            <Link href="/products">Collection</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Products */}
          <div className="footer-links">
            <h4>Products</h4>
            <Link href="/products?category=Sofas">Sofa Sets</Link>
            <Link href="/products?category=Dining">Dining Sets</Link>
            <Link href="/products?category=Tables">Coffee Tables</Link>
            <Link href="/products?category=Bedroom">Bed Frames</Link>
          </div>

          {/* Connect */}
          <div className="footer-links">
            <h4>Connect</h4>
            <a href={settings.facebook} target="_blank" rel="noopener">Facebook</a>
            <a href={settings.instagram} target="_blank" rel="noopener">Instagram</a>
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener">WhatsApp</a>
            <a href={`tel:${settings.phone}`}>{settings.phone}</a>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {settings.name}. All rights reserved.</p>
          <p>Website by <a href="https://brandfletch.com" target="_blank" rel="noopener" className="footer-credit">Brandfletch Media</a></p>
        </div>
      </div>
    </footer>
  );
}
