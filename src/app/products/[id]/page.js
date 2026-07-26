import { getProductById, getRelatedProducts, getSettings, getProducts } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { CartProvider } from '@/components/CartProvider';
import ProductDetailClient from '@/components/ProductDetailClient';
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
      images: [product.image || (product.images && product.images[0])],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);
  const settings = getSettings();

  return (
    <CartProvider>
      <Navbar settings={settings} />

      <main style={{ paddingTop: '140px', paddingBottom: '60px' }}>
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
            <span>/</span>
            <Link href="/products" style={{ color: 'var(--text-muted)' }}>Collection</Link>
            <span>/</span>
            <span style={{ color: 'var(--brown)', fontWeight: 500 }}>{product.name}</span>
          </div>

          <ProductDetailClient product={product} relatedProducts={related} settings={settings} />
        </div>
      </main>

      <Footer settings={settings} />
      <WhatsAppFloat whatsapp={settings.whatsapp} businessName={settings.name} />
    </CartProvider>
  );
}
