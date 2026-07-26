'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactClient({ settings }) {
  const [form, setForm] = useState({ name: '', phone: '', product: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    let msg = `Hello ${settings.name}!\n\n`;
    msg += `Name: ${form.name}\n`;
    msg += `Phone: ${form.phone}\n`;
    if (form.product) msg += `Interested in: ${form.product}\n`;
    if (form.message) msg += `Message: ${form.message}\n`;
    window.open(`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const waLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hello ${settings.name}! I'd like to place an order.`)}`;

  return (
    <main>
      <section className="section section-cream" style={{ paddingTop: '140px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">Get in Touch</p>
            <h1 className="section-title">We'd love to hear from you</h1>
            <p className="section-subtitle">Ready to order or have questions? Reach out — we respond fastest on WhatsApp.</p>
          </div>
        </div>
      </section>
      <section className="section section-warm" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="contact-grid">
            <div>
              <p className="section-eyebrow">Contact Details</p>
              <h2 className="section-title">Ready to order?</h2>
              <p className="contact-lead">Message us on WhatsApp for the fastest response.</p>
              <a href={waLink} className="btn btn-whatsapp btn-large" target="_blank" rel="noopener" style={{ marginBottom: '32px', display: 'inline-flex' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
              <div className="contact-details">
                <div className="contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <a href={`tel:${settings.phone}`} style={{ color: 'inherit' }}>{settings.phone}</a>
                </div>
                <div className="contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <a href={`mailto:${settings.email}`} style={{ color: 'inherit' }}>{settings.email}</a>
                </div>
                <div className="contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <span>{settings.address}</span>
                </div>
                <div className="contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  <span>{settings.hours}</span>
                </div>
              </div>
              <div className="contact-socials" style={{ marginTop: '24px' }}>
                <a href={settings.facebook} target="_blank" rel="noopener" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href={settings.instagram} target="_blank" rel="noopener" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
            <div className="contact-form-wrap">
              <h3 className="form-title">Send us a message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Enter your name" required value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" pattern="[+]?[0-9 ]{7,15}" placeholder="+265 ..." required value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} />
                </div>
                <div className="form-group">
                  <label>Interested In</label>
                  <select value={form.product} onChange={e => setForm(p => ({...p, product: e.target.value}))}>
                    <option value="">Select a product</option>
                    <option>3-Seater Sofa — MWK 16,000</option>
                    <option>3+2+ Seater Sofa Set — MWK 26,000</option>
                    <option>3+1+1 Seater Sofa Set — MWK 26,000</option>
                    <option>Dining Set — Price on request</option>
                    <option>Coffee Table — Price on request</option>
                    <option>Upholstered Bed Frame — Price on request</option>
                    <option>Custom Order</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows={4} placeholder="Tell us what you're looking for..." value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} />
                </div>
                <button type="submit" className="btn btn-primary btn-full">Send via WhatsApp</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
