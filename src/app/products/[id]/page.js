import { getProducts, getProductById, getCategories } from '@/lib/data';
import { getSettings } from '@/lib/settings';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ProductCard from '@/components/ProductCard';
import ProductDetailClient from '@/components/ProductDetailClient';
import { CartProvider } from '@/components/CartProvider';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const products = getProducts();
  return products.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | Akonzi Furniture`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Akonzi Furniture`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const allProducts = getProducts();
  const settings = getSettings();
  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <CartProvider>
      <Navbar settings={settings} />

      <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
            <span>/</span>
            <Link href="/products" style={{ color: 'var(--text-muted)' }}>Collection</Link>
            <span>/</span>
            <span style={{ color: 'var(--brown)', fontWeight: 500 }}>{product.name}</span>
          </div>

          {/* Product Detail */}
          <ProductDetailClient product={product} />

          {/* Related Products */}
          {related.length > 0 && (
            <section style={{ marginTop: '80px' }}>
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '40px' }}>
                <p className="section-eyebrow">You May Also Like</p>
                <h2 className="section-title">Related Products</h2>
              </div>
              <div className="products-grid">
                {related.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer settings={settings} />
      <WhatsAppFloat whatsapp={settings.whatsapp} businessName={settings.name} />
    </CartProvider>
  );
}
