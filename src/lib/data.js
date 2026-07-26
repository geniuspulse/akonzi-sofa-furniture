import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { siteConfig, whatsappLink } from './config';

export { siteConfig, whatsappLink };

// ===== Products =====
const productsPath = path.join(process.cwd(), 'data', 'products.json');

export function getProducts() {
  const rawData = fs.readFileSync(productsPath, 'utf-8');
  return JSON.parse(rawData);
}

export function getProductById(id) {
  const products = getProducts();
  return products.find(p => p.id === id);
}

export function getFeaturedProducts() {
  return getProducts().filter(p => p.featured);
}

export function getCategories() {
  const products = getProducts();
  return [...new Set(products.map(p => p.category))];
}

// ===== Blog Posts =====
const postsDir = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts() {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
  const posts = files.map(filename => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    const slug = filename.replace('.md', '');
    return {
      slug,
      title: frontmatter.title || slug,
      date: frontmatter.date || '',
      excerpt: frontmatter.excerpt || '',
      author: frontmatter.author || 'Akonzi Team',
      content,
    };
  });
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return posts;
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  const post = posts.find(p => p.slug === slug);
  if (!post) return null;
  return {
    ...post,
    htmlContent: marked.parse(post.content),
  };
}
