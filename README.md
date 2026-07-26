# Akonzi Sofa Furniture — Full-Stack Website

A robust furniture showcase, blog, and online store for **Akonzi Sofa Furniture**, a furniture maker based in Lilongwe, Malawi.

## Features

- **Product Catalog & Online Store** — Browse furniture, add to cart, checkout via WhatsApp
- **Blog with CMS** — Blog posts stored as markdown, managed through admin panel via GitHub API
- **Admin Dashboard** — Protected admin panel for managing blog posts and products
- **Authentication** — JWT-based admin authentication with HTTP-only cookies
- **WhatsApp Ordering** — One-click order buttons with pre-filled messages
- **Contact Form** — Sends inquiries directly to WhatsApp
- **Fully Responsive** — Optimized for mobile, tablet, and desktop
- **SEO Optimized** — Meta tags, Open Graph, semantic HTML, static generation

## Tech Stack

- **Next.js 14** (App Router) — Full-stack React framework
- **React 18** — UI library
- **GitHub API** — Headless CMS for blog and product management
- **JWT (jose)** — Admin authentication
- **gray-matter** — Markdown frontmatter parsing
- **marked** — Markdown rendering
- **Vercel** — Deployment and hosting
- **Google Fonts** — Playfair Display + DM Sans

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/geniuspulse/akonzi-sofa-furniture.git
   cd akonzi-sofa-furniture
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   # .env.local
   ADMIN_PASSWORD=your-admin-password
   GITHUB_TOKEN=your-github-personal-access-token
   GITHUB_OWNER=geniuspulse
   GITHUB_REPO=akonzi-sofa-furniture
   GITHUB_BRANCH=main
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Admin Access

- Navigate to `/admin/login`
- Enter the admin password (set via `ADMIN_PASSWORD` env var)
- Default password: `akonzi-admin-2026` (change in production!)

## Blog Management

Blog posts are stored as markdown files in `content/blog/`. The admin panel uses the GitHub API to commit changes, which triggers a Vercel rebuild — making the changes live automatically.

## Product Management

Products are stored in `data/products.json`. The admin panel can add, edit, and remove products via the GitHub API.

## WhatsApp Configuration

Update the WhatsApp number in `src/lib/data.js` (the `siteConfig.whatsapp` field). Currently set to a placeholder — replace with Akonzi's real number.

## Deployment

This site auto-deploys to Vercel on push to the `main` branch. Set the following environment variables in your Vercel dashboard:
- `ADMIN_PASSWORD`
- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_BRANCH`

---

Built by [Brandfletch Media](https://www.brandfletch.com) — Growing local businesses through digital presence.
