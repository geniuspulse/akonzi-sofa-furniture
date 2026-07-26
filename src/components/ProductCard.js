import Link from 'next/link';
import { whatsappLink } from '@/lib/data';

export default function ProductCard({ product }) {
  const { id, name, description, price, image, badge } = product;

  // Format price
  const formattedPrice = price === null || price === undefined
    ? 'Price on request'
    : `MWK ${Number(price).toLocaleString('en-US')}`;

  const orderMessage = `Hello Akonzi Sofa Furniture, I would like to order: ${name}.`;
  const orderUrl = whatsappLink(orderMessage);

  return (
    <div className="product-card">
      <div className="product-image">
        {badge && <span className="product-badge">{badge}</span>}
        <img src={image} alt={name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-desc">{description}</p>
        <div className="product-footer">
          <span className="product-price">{formattedPrice}</span>
          <div className="product-actions">
            <Link href={`/products/${id}`} className="btn-cart">
              Add to Cart
            </Link>
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-order"
            >
              Order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
