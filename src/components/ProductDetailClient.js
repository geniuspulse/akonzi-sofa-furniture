'use client';

import React, { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import { whatsappLink } from '@/lib/data';

export default function ProductDetailClient({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const formattedPrice = product.price === null || product.price === undefined
    ? 'Price on request'
    : `MWK ${Number(product.price).toLocaleString('en-US')}`;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Use custom style notification or browser alert
    alert(`Added ${quantity}x ${product.name} to your cart.`);
  };

  const orderMessage = `Hello Akonzi Sofa Furniture, I would like to order ${quantity}x ${product.name}.`;
  const orderUrl = whatsappLink(orderMessage);

  return (
    <div className="product-detail-grid">
      <div className="product-detail-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <h1 className="product-detail-name">{product.name}</h1>
        <div className="product-detail-price">{formattedPrice}</div>
        <p className="product-detail-desc">{product.description}</p>
        
        <div className="product-detail-meta">
          <div className="meta-item">
            <span className="meta-label">Category</span>
            <span className="meta-value">{product.category}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Availability</span>
            <span className="meta-value" style={{ color: 'var(--whatsapp-dark)' }}>
              In Stock / Made to Order
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Delivery</span>
            <span className="meta-value" style={{ color: 'var(--brown-light)' }}>Free in Lilongwe</span>
          </div>
        </div>

        <div className="quantity-selector">
          <span className="meta-label" style={{ fontWeight: '600', color: 'var(--text-dark)', marginRight: '8px' }}>Quantity</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="quantity-btn" onClick={handleDecrease} aria-label="Decrease quantity">-</button>
            <span className="quantity-value">{quantity}</span>
            <button className="quantity-btn" onClick={handleIncrease} aria-label="Increase quantity">+</button>
          </div>
        </div>

        <div className="product-detail-actions">
          <button className="btn btn-primary" onClick={handleAddToCart} style={{ flex: '1', minWidth: '180px' }}>
            Add to Cart
          </button>
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ flex: '1', minWidth: '180px' }}
          >
            Order via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
