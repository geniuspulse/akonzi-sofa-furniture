import Link from 'next/link';
import { getProducts, getCategories, siteConfig } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ProductCard from '@/components/ProductCard';
import { CartProvider } from '@/components/CartProvider';

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const currentCategory = resolvedSearchParams?.category || '';

  const allProducts = getProducts();
  const categories = getCategories();

  const filteredProducts = currentCategory
    ? allProducts.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase())
    : allProducts;

  return (
    <CartProvider>
      <Navbar />

      {/* Page Header */}
      <section className="section section-cream" style={{ paddingTop: '140px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '20px' }}>
            <span className="section-eyebrow">Our Collection</span>
            <h1 className="section-title">Handcrafted Furniture Range</h1>
            <p className="section-subtitle">
              Browse our premium, durable and affordable products. Each piece can be customized to match your space, style, and fabric preference.
            </p>
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', margin: '20px auto 40px', maxWidth: '800px' }}>
            <Link 
              href="/products" 
              className={`btn btn-sm ${!currentCategory ? 'btn-primary' : 'btn-outline'}`}
            >
              All Collection
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className={`btn btn-sm ${currentCategory.toLowerCase() === cat.toLowerCase() ? 'btn-primary' : 'btn-outline'}`}
              >
                {cat === 'Tables' ? 'Coffee Tables' : cat === 'Bedroom' ? 'Beds & Bedroom' : cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="section section-warm" style={{ paddingTop: '40px', minHeight: '400px' }}>
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '12px' }}>
                No Products Found
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                We couldn't find any products in the "{currentCategory}" category.
              </p>
              <Link href="/products" className="btn btn-primary">
                View All Products
              </Link>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </CartProvider>
  );
}
