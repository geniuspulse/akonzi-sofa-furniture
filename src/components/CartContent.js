'use client';
import { useCart } from '@/components/CartProvider';
import Link from 'next/link';
import { whatsappLink } from '@/lib/config';

export default function CartContent({ settings }) {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, hasPriceItems } = useCart();

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    let msg = `Hello ${settings?.name || 'Akonzi Furniture'}! I'd like to order:\n\n`;
    cart.forEach(item => {
      const price = item.price ? `MWK ${item.price.toLocaleString()}` : 'Price on request';
      msg += `• ${item.name} (x${item.quantity}) — ${price}\n`;
      if (item.selectedVariations) {
        Object.entries(item.selectedVariations).forEach(([k, v]) => {
          msg += `   - ${k}: ${v}\n`;
        });
      }
    });
    if (cartTotal > 0) {
      msg += `\nSubtotal: MWK ${cartTotal.toLocaleString()}\n`;
    }
    msg += `\nPlease confirm availability and delivery details. Thank you!`;
    const url = whatsappLink(msg, settings?.whatsapp);
    window.open(url, '_blank');
  };

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛒</div>
            <h3>Your cart is empty</h3>
            <p>Browse our collection and add some beautiful furniture to your cart.</p>
            <Link href="/products" className="btn btn-primary">Browse Collection</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
          <p className="section-eyebrow">Your Selection</p>
          <h1 className="section-title">Shopping Cart</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
          {/* Cart Items */}
          <div className="cart-table">
            <div className="cart-header">
              <span>Product</span><span>Price</span><span>Quantity</span><span>Total</span><span></span>
            </div>
            {cart.map(item => (
              <div className="cart-row" key={item.key}>
                <div className="cart-item-info">
                  <img src={item.image} alt={item.name} width={60} height={60} style={{ objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <div className="cart-item-name">{item.name}</div>
                    {item.selectedVariations && Object.keys(item.selectedVariations).length > 0 && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {Object.entries(item.selectedVariations).map(([k, v]) => (
                          <span key={k} style={{ display: 'block' }}>{k}: {v}</span>
                        ))}
                      </div>
                    )}
                    <div className="cart-item-price">{item.price ? `MWK ${item.price.toLocaleString()}` : 'Price on request'}</div>
                  </div>
                </div>
                <span>{item.price ? `MWK ${item.price.toLocaleString()}` : '—'}</span>
                <div className="quantity-selector" style={{ margin: 0 }}>
                  <button className="quantity-btn" onClick={() => updateQuantity(item.key, item.quantity - 1)}>−</button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => updateQuantity(item.key, item.quantity + 1)}>+</button>
                </div>
                <span>{item.price ? `MWK ${(item.price * item.quantity).toLocaleString()}` : '—'}</span>
                <button className="cart-remove" onClick={() => removeFromCart(item.key)} title="Remove">×</button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '20px', color: 'var(--text-dark)' }}>Order Summary</h3>
            {hasPriceItems && (
              <div className="cart-summary-row">
                <span>Subtotal</span><span>MWK {cartTotal.toLocaleString()}</span>
              </div>
            )}
            <div className="cart-summary-row">
              <span>Delivery (Lilongwe)</span><span style={{ color: '#16a34a' }}>FREE</span>
            </div>
            {hasPriceItems && (
              <div className="cart-summary-row cart-total">
                <span>Total</span><span>MWK {cartTotal.toLocaleString()}</span>
              </div>
            )}
            {!hasPriceItems && (
              <div className="cart-summary-row cart-total">
                <span>Total</span><span>Price on request</span>
              </div>
            )}
            <div className="cart-actions" style={{ flexDirection: 'column' }}>
              <Link href="/checkout" className="btn btn-primary btn-full" style={{ textAlign: 'center', textDecoration: 'none' }}>
                Proceed to Checkout
              </Link>
              <button onClick={handleWhatsAppCheckout} className="btn btn-whatsapp btn-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Quick WhatsApp Order
              </button>
              <Link href="/products" className="btn btn-outline btn-full" style={{ textAlign: 'center' }}>Continue Shopping</Link>
              <button onClick={clearCart} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline', marginTop: '8px' }}>Clear Cart</button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '16px', lineHeight: '1.5' }}>
              Checkout generates a structured order and opens WhatsApp with all details. You can also use Quick WhatsApp Order for a faster flow.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
