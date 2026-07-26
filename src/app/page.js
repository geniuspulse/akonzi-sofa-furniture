import Link from 'next/link';
import { getFeaturedProducts, getSaleProducts, getCategories, getProducts, siteConfig, whatsappLink, formatPrice, getEffectivePrice } from '@/lib/data';
import { getSettings } from '@/lib/settings';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ProductCard from '@/components/ProductCard';
import { CartProvider } from '@/components/CartProvider';

// Category icons mapping
const categoryIcons = {
  'Sofas': '🛋️',
  'Sofa Sets': '🛋️',
  'Dining': '🍽️',
  'Tables': '🪵',
  'Bedroom': '🛏️',
};

export default function HomePage() {
  const settings = getSettings();
  const featuredProducts = getFeaturedProducts();
  const saleProducts = getSaleProducts();
  const categories = getCategories();
  const allProducts = getProducts();

  // Count products per category
  const categoryCounts = {};
  allProducts.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  // Get representative product image for each category
  const categoryImages = {};
  categories.forEach(cat => {
    const product = allProducts.find(p => p.category === cat);
    if (product) categoryImages[cat] = product.image || (product.images && product.images[0]);
  });

  const heroWhatsappMessage = "Hello Akonzi Sofa Furniture, I would like to make an inquiry or order some furniture.";
  const heroWhatsappUrl = whatsappLink(heroWhatsappMessage, settings.whatsapp);

  return (
    <CartProvider>
      <Navbar settings={settings} />
      
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-eyebrow">Handcrafted in Lilongwe</span>
          <h1 className="hero-title">{settings.name}</h1>
          <p className="hero-tagline">{settings.tagline}</p>
          <div className="hero-cta">
            <Link href="/products" className="btn btn-primary btn-large">
              Browse Collection
            </Link>
            <a href={heroWhatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-large">
              Order via WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Feature Bar */}
      <section className="feature-bar">
        <div className="feature-bar-inner">
          <div className="feature-bar-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Quality Craftsmanship</span>
          </div>
          <div className="feature-bar-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
            <span>Affordable Prices</span>
          </div>
          <div className="feature-bar-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>Built to Last</span>
          </div>
          <div className="feature-bar-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <span>Free Delivery in Lilongwe</span>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="section section-cream" style={{ paddingTop: '100px' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Shop by Category</span>
            <h2 className="section-title">Explore Our Range</h2>
            <p className="section-subtitle">
              From cozy sofas to elegant dining sets — find the perfect piece for every room.
            </p>
          </div>
          <div className="category-grid">
            {categories.map(cat => (
              <Link href={`/products?category=${encodeURIComponent(cat)}`} key={cat} className="category-card">
                <div className="category-card-image">
                  <img src={categoryImages[cat]} alt={cat} />
                </div>
                <div className="category-card-info">
                  <span className="category-icon">{categoryIcons[cat] || '🪑'}</span>
                  <h3>{cat}</h3>
                  <span className="category-count">{categoryCounts[cat]} {categoryCounts[cat] === 1 ? 'product' : 'products'}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* On Sale Section */}
      {saleProducts.length > 0 && (
        <section className="section section-warm" style={{ background: 'linear-gradient(135deg, #fef3e2 0%, #faf7f2 100%)' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-eyebrow" style={{ color: '#dc2626' }}>Limited Time Offers</span>
              <h2 className="section-title">On Sale Now</h2>
              <p className="section-subtitle">
                Save big on selected furniture pieces. Limited stock available!
              </p>
            </div>
            <div className="products-grid">
              {saleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Preview */}
      <section className="section section-cream">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/hero-showroom.png" alt="Akonzi Sofa Showroom" />
              <div className="about-image-badge">
                <span className="badge-number">5+</span>
                <span className="badge-text">Years Crafting Comfort</span>
              </div>
            </div>
            <div>
              <span className="section-eyebrow">Our Story</span>
              <h2 className="section-title">Handcrafted Comfort for Your Home</h2>
              <p className="about-lead">
                At Akonzi Sofa Furniture, we make and supply quality, affordable & durable furniture of your choice.
              </p>
              <p className="about-body">
                What started as a small workshop in Lilongwe, Malawi has grown into a trusted furniture brand. 
                We handcraft each piece of furniture—be it a plush 3-seater sofa set, a solid wood dining table, or an 
                elegant upholstered bed frame—using premium locally-sourced hardwood, high-density foam, and exquisite fabrics. 
                Our team of passionate artisans is dedicated to bringing your unique vision to life.
              </p>
              <div className="about-stats" style={{ marginBottom: '32px' }}>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Malawian Owned</span>
                </div>
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Homes Furnished</span>
                </div>
                <div className="stat">
                  <span className="stat-number">Free</span>
                  <span className="stat-label">Lilongwe Delivery</span>
                </div>
              </div>
              <Link href="/about" className="btn btn-outline">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section section-warm">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Collection</span>
            <h2 className="section-title">Featured Pieces</h2>
            <p className="section-subtitle">
              Take a look at some of our best-selling and most-loved furniture pieces handcrafted to perfection.
            </p>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/products" className="btn btn-primary btn-large">
              View Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section section-cream-bg">
        <div className="container">
          <div className="process-section">
            <h2 className="process-title">How It Works</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <h4>Browse Collection</h4>
                <p>Explore our range of premium handcrafted furniture online.</p>
              </div>
              <span className="process-arrow" style={{ display: 'none' }} aria-hidden="true">&rarr;</span>
              <div className="process-step">
                <div className="step-number">2</div>
                <h4>Add to Cart & Checkout</h4>
                <p>Add items to your cart, complete the checkout form with your delivery details.</p>
              </div>
              <span className="process-arrow" style={{ display: 'none' }} aria-hidden="true">&rarr;</span>
              <div className="process-step">
                <div className="step-number">3</div>
                <h4>WhatsApp Confirmation</h4>
                <p>Your order is sent via WhatsApp for confirmation. We build, deliver, and set up — free in Lilongwe!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-cream" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span className="section-eyebrow">Ready to Order?</span>
          <h2 className="section-title" style={{ marginBottom: '16px' }}>Let's Create Your Dream Home</h2>
          <p className="section-subtitle" style={{ marginBottom: '32px' }}>
            Whether you want to customize one of our designs, choose a different fabric, or inquire about pricing, we are just a WhatsApp message away.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={heroWhatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-large">
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="btn btn-outline btn-large">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
      <WhatsAppFloat whatsapp={settings.whatsapp} businessName={settings.name} />
    </CartProvider>
  );
}
