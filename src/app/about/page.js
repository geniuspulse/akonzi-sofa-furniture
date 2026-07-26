import { getSettings } from '@/lib/settings';
import Link from 'next/link';
import { siteConfig, whatsappLink } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export default function AboutPage() {
  const settings = getSettings();
  const aboutWhatsappMessage = "Hello Akonzi Sofa Furniture, I would like to discuss a custom furniture design.";
  const aboutWhatsappUrl = whatsappLink(aboutWhatsappMessage, settings.whatsapp);

  return (
      <>
        <Navbar />
      
      {/* Page Header */}
      <section className="section section-cream" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '0' }}>
            <span className="section-eyebrow">About Us</span>
            <h1 className="section-title">The Akonzi Story</h1>
            <p className="section-subtitle">
              We make and supply quality, affordable & durable furniture of your choice, right here in Lilongwe, Malawi.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section section-warm">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src="/images/hero-showroom.png" alt="Akonzi Sofa Furniture Workshop" />
              <div className="about-image-badge">
                <span className="badge-number">5+</span>
                <span className="badge-text">Years of Quality</span>
              </div>
            </div>
            <div>
              <span className="section-eyebrow">Our Journey</span>
              <h2 className="section-title">From a Small Workshop to Your Living Room</h2>
              <p className="about-lead">
                Akonzi Sofa Furniture started with a simple mission: to design and build high-quality, comfortable furniture that regular Malawians can afford.
              </p>
              <div className="about-body">
                <p style={{ marginBottom: '16px' }}>
                  We realized that many families in Lilongwe were forced to choose between cheap, imported furniture that breaks in a few months, and custom furniture that is prohibitively expensive. We set out to change that.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  By combining local Malawian talent with carefully selected raw materials, we created a streamlined process for crafting sofas, dining tables, beds, and coffee tables. Every piece of furniture that leaves our workshop is custom-made to order, ensuring that our customers get the exact dimensions, fabric, and colors they desire.
                </p>
                <p>
                  Today, we have served hundreds of families across Lilongwe and neighboring districts, building a reputation for integrity, attention to detail, and unmatched durability.
                </p>
              </div>
              <div className="about-stats" style={{ marginTop: '24px' }}>
                <div className="stat">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Years Active</span>
                </div>
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Happy Homes</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Locally Handcrafted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Features Section */}
      <section className="section section-cream">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Why Akonzi</span>
            <h2 className="section-title">Our Core Principles</h2>
            <p className="section-subtitle">
              We hold ourselves to the highest standard of carpentry and customer service. Here is what we promise with every order.
            </p>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="feature-title">Quality Craftsmanship</h3>
              <p className="feature-desc">
                Every frame is assembled using treated local hardwood, joined with precision, and stuffed with high-density comfort foam.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <h3 className="feature-title">Affordable Pricing</h3>
              <p className="feature-desc">
                By selling directly from our workshop to your home, we cut out middlemen markup and pass the savings on to you.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="feature-title">Built to Last</h3>
              <p className="feature-desc">
                We design and build furniture to withstand heavy daily use. No creaks, no sagging, and no compromises.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </div>
              <h3 className="feature-title">Free Local Delivery</h3>
              <p className="feature-desc">
                We offer free delivery, offloading, and setup for all orders delivered within Lilongwe city limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-warm" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span className="section-eyebrow">Get Started</span>
          <h2 className="section-title">Ready to Design Your Custom Piece?</h2>
          <p className="section-subtitle" style={{ marginBottom: '32px' }}>
            We customize dimensions, colors, and materials. Speak directly to our design team and get a free quote on WhatsApp.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={aboutWhatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-large">
              Consult on WhatsApp
            </a>
            <Link href="/products" className="btn btn-primary btn-large">
              Browse Our Collection
            </Link>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
      <WhatsAppFloat whatsapp={settings.whatsapp} businessName={settings.name} />
    </>

  );
}
