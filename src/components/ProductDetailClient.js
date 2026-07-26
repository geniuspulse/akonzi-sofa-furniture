'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/components/CartProvider';
import { whatsappLink } from '@/lib/config';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailClient({ product, relatedProducts }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [selectedVariations, setSelectedVariations] = useState({});
  const [addedMessage, setAddedMessage] = useState('');

  // Handle dynamic product transitions (e.g. from related products)
  useEffect(() => {
    if (product) {
      setMainImage(product.image || (product.images && product.images[0]) || '');
      
      const initial = {};
      if (product.variations && product.variations.length > 0) {
        product.variations.forEach(v => {
          initial[v.name] = v.options && v.options.length > 0 ? v.options[0] : '';
        });
      }
      setSelectedVariations(initial);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const formatLocalPrice = (val) => {
    if (val === null || val === undefined) return 'Price on request';
    return `MWK ${Number(val).toLocaleString('en-US')}`;
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity, selectedVariations);
    setAddedMessage(`Added ${quantity}x ${product.name} to cart!`);
    setTimeout(() => setAddedMessage(''), 3000);
  };

  const handleWhatsAppOrder = () => {
    let message = `Hello Akonzi Sofa Furniture, I would like to order:\n`;
    message += `*Product:* ${product.name}\n`;
    message += `*Quantity:* ${quantity}\n`;
    if (Object.keys(selectedVariations).length > 0) {
      message += `*Options:*\n`;
      Object.entries(selectedVariations).forEach(([key, value]) => {
        message += ` - ${key}: ${value}\n`;
      });
    }
    const url = whatsappLink(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <div className="product-detail-grid">
        {/* Left Column: Image Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="product-detail-image">
            <img src={mainImage} alt={product.name} />
          </div>
          {product.images && product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  style={{
                    border: mainImage === img ? '2px solid var(--brown)' : '2px solid transparent',
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    padding: 0,
                    cursor: 'pointer',
                    flexShrink: 0,
                    width: '80px',
                    height: '80px',
                    background: 'none',
                  }}
                >
                  <img src={img} alt={`${product.name} gallery ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info & Actions */}
        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>
          
          <div className="product-detail-price">
            {product.salePrice && product.salePrice < product.price ? (
              <>
                <span
                  style={{
                    textDecoration: 'line-through',
                    color: 'var(--text-muted)',
                    fontSize: '1.4rem',
                    marginRight: '12px',
                    fontWeight: 'normal',
                  }}
                >
                  {formatLocalPrice(product.price)}
                </span>
                <span>{formatLocalPrice(product.salePrice)}</span>
              </>
            ) : (
              formatLocalPrice(product.price)
            )}
          </div>

          <p className="product-detail-desc">{product.description}</p>
          
          <div className="product-detail-meta">
            <div className="meta-item">
              <span className="meta-label">Category</span>
              <span className="meta-value">{product.category}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Stock Status</span>
              <span
                className="meta-value"
                style={{
                  color: !product.inStock
                    ? '#dc3545'
                    : product.stockCount <= 3
                    ? '#e05a47'
                    : 'var(--whatsapp-dark)',
                }}
              >
                {!product.inStock ? 'Out of Stock' : product.stockCount <= 3 ? `Only ${product.stockCount} left!` : 'In Stock'}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Delivery</span>
              <span className="meta-value" style={{ color: 'var(--brown-light)' }}>Free in Lilongwe</span>
            </div>
          </div>

          {/* Dynamic Variation Selectors */}
          {product.variations && product.variations.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {product.variations.map((v) => (
                <div key={v.name} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span className="meta-label" style={{ fontWeight: '600', color: 'var(--text-dark)' }}>
                    {v.name}
                  </span>
                  <select
                    value={selectedVariations[v.name] || ''}
                    onChange={(e) => setSelectedVariations(prev => ({ ...prev, [v.name]: e.target.value }))}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius)',
                      border: '2px solid var(--border)',
                      backgroundColor: 'var(--warm-white)',
                      color: 'var(--text-dark)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      width: '100%',
                      maxWidth: '300px',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {v.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* Quantity Selector */}
          <div className="quantity-selector" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="meta-label" style={{ fontWeight: '600', color: 'var(--text-dark)', marginBottom: '8px' }}>
              Quantity
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button className="quantity-btn" onClick={handleDecrease} aria-label="Decrease quantity">-</button>
              <span className="quantity-value">{quantity}</span>
              <button className="quantity-btn" onClick={handleIncrease} aria-label="Increase quantity">+</button>
            </div>
          </div>

          {/* Added to Cart confirmation message */}
          {addedMessage && (
            <div style={{
              backgroundColor: 'rgba(37, 211, 102, 0.1)',
              color: 'var(--whatsapp-dark)',
              border: '1px solid var(--whatsapp)',
              padding: '12px 16px',
              borderRadius: 'var(--radius)',
              fontSize: '0.95rem',
              fontWeight: '600',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {addedMessage}
            </div>
          )}

          {/* Action Buttons */}
          <div className="product-detail-actions">
            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              style={{ flex: '1', minWidth: '180px', opacity: !product.inStock ? 0.5 : 1, cursor: !product.inStock ? 'not-allowed' : 'pointer' }}
            >
              Add to Cart
            </button>
            <button
              onClick={handleWhatsAppOrder}
              className="btn btn-whatsapp"
              style={{ flex: '1', minWidth: '180px' }}
            >
              Order via WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div style={{ marginTop: '50px', borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '20px' }}>
            Product Specifications
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <tbody>
              {Object.entries(product.specifications).map(([key, value]) => (
                <tr key={key} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 16px 14px 0', fontWeight: '600', color: 'var(--text-dark)', width: '30%' }}>{key}</td>
                  <td style={{ padding: '14px 0', color: 'var(--text-body)' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Related Products Grid */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section style={{ marginTop: '80px', borderTop: '1px solid var(--border)', paddingTop: '60px' }}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
            <p className="section-eyebrow">You May Also Like</p>
            <h2 className="section-title">Related Products</h2>
          </div>
          <div className="products-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
