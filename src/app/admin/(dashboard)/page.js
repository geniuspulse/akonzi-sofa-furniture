import Link from 'next/link';
import { getProducts, getAllPosts } from '@/lib/data';

export default function AdminDashboardPage() {
  const products = getProducts() || [];
  const posts = getAllPosts() || [];

  const totalProducts = products.length;
  const totalPosts = posts.length;
  const categories = [...new Set(products.map(p => p.category))].length;
  const featuredProducts = products.filter(p => p.featured).length;

  // Get recent 3 posts
  const recentPosts = posts.slice(0, 3);
  // Get recent 3 products
  const recentProducts = products.slice(-3).reverse();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p className="subtitle">Welcome back, Administrator! Here is the overview of your furniture website.</p>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="label">Total Products</div>
          <div className="value">{totalProducts}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Blog Posts</div>
          <div className="value">{totalPosts}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Categories</div>
          <div className="value">{categories}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Featured Items</div>
          <div className="value">{featuredProducts}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="admin-card">
          <h3>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/admin/products" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
              Manage Products Catalog
            </Link>
            <Link href="/admin/posts" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
              Manage Blog Posts
            </Link>
            <Link href="/admin/posts/new" className="btn btn-whatsapp" style={{ display: 'block', textAlign: 'center' }}>
              Write New Blog Post
            </Link>
          </div>
        </div>

        <div className="admin-card">
          <h3>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h4 style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '8px' }}>Latest Blog Posts</h4>
              {recentPosts.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No blog posts yet.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {recentPosts.map(post => (
                    <li key={post.slug} style={{ fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                      <Link href={`/admin/posts/${post.slug}`} className="hover-underline" style={{ color: 'var(--brown)', fontWeight: '500' }}>
                        {post.title}
                      </Link>
                      <span style={{ color: 'var(--text-muted)' }}>{post.date ? new Date(post.date).toLocaleDateString('en-GB') : 'No date'}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
              <h4 style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: '8px' }}>Recently Added Products</h4>
              {recentProducts.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No products yet.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {recentProducts.map(prod => (
                    <li key={prod.id} style={{ fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>{prod.name}</span>
                      <span style={{ color: 'var(--amber)', fontWeight: '600' }}>
                        MWK {typeof prod.price === 'number' ? prod.price.toLocaleString() : prod.price}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
