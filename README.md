# 🪑 Furniture Store Template

A production-ready Next.js storefront template for furniture businesses — like WooCommerce, but purpose-built for furniture stores. Features cart, multi-step checkout, WhatsApp ordering, product variations, and an admin panel.

Built by [Brandfletch Media](https://brandfletch.com).

---

## ✨ Features

### Storefront
- **Product catalog** with categories, search, and sorting
- **Product detail pages** with image gallery, variation selectors (fabric, color, size), specifications table, and related products
- **Shopping cart** with quantity management, variation tracking, and localStorage persistence
- **Multi-step checkout** — Customer info → Delivery details → Order review → WhatsApp order
- **WhatsApp ordering** — structured order details sent via WhatsApp
- **Sale pricing** with strikethrough original prices
- **Stock indicators** (in stock, low stock, out of stock)
- **Responsive design** — mobile-first, warm earthy aesthetic

### Admin Panel (JWT-protected)
- **Dashboard** with product & order stats, revenue, low-stock alerts
- **Product management** — add/edit/delete products with variations, specs, images, sale prices, stock
- **Order management** — view all orders, update fulfillment status
- **Blog CMS** — create/edit/delete blog posts (stored as markdown in the repo)
- **Site settings** — business name, contact info, social links, hours

### Technical
- **Next.js 14** App Router
- **GitHub as database** — products, orders, settings, and blog posts stored in the repo
- **Vercel deployment** — auto-deploys on Git push
- **No external database** required
- **Themeable** — all colors, fonts, and branding in one config file

---

## 🚀 Quick Start

### Option 1: Use as GitHub Template
1. Click "Use this template" on the GitHub repo page
2. Clone your new repo: `git clone https://github.com/yourusername/your-repo.git`
3. Run the setup script: `node scripts/setup.js`
4. `npm install && npm run dev`

### Option 2: Clone & Configure Manually
```bash
git clone https://github.com/yourusername/furniture-template.git my-store
cd my-store
node scripts/setup.js
npm install
npm run dev
```

### The Setup Script
`node scripts/setup.js` asks for:
- **Business info** — name, tagline, WhatsApp, phone, email, address, hours, socials
- **Theme colors** — primary color, dark variant, accent color
- **Admin password** — for the admin panel (generates a random one if blank)
- **GitHub repo** — owner and repo name for content management
- **Agency credits** — your agency name and website in the footer

It automatically updates all config files, CSS variables, and metadata.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_PASSWORD` | Yes | Password for admin panel JWT auth |
| `GITHUB_TOKEN` | Yes | GitHub PAT with `repo` scope (for saving orders/products/posts) |
| `GITHUB_OWNER` | No | GitHub username/org (default: configured by setup) |
| `GITHUB_REPO` | No | Repo name (default: configured by setup) |
| `GITHUB_BRANCH` | No | Branch name (default: `main`) |

### Creating a GitHub Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Create a token with `Contents: Read and write` permission for your repo
3. Add it as `GITHUB_TOKEN` in `.env.local` (dev) or Vercel env vars (production)

---

## 📁 Project Structure

```
├── data/
│   ├── products.json       # Product catalog (admin-managed)
│   ├── orders.json         # Customer orders (auto-generated)
│   └── settings.json       # Business settings (admin-managed)
├── content/
│   └── blog/               # Blog posts as markdown files
├── public/
│   └── images/             # Product images, logo, hero
├── scripts/
│   └── setup.js            # Template setup script
├── src/
│   ├── app/
│   │   ├── page.js         # Homepage (categories, sale, featured)
│   │   ├── products/       # Product listing & detail pages
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Multi-step checkout
│   │   ├── admin/          # Admin panel (dashboard, products, orders, blog, settings)
│   │   ├── api/            # API routes (orders, products, posts, settings, auth)
│   │   ├── blog/           # Blog pages
│   │   └── globals.css     # All styles (themed with CSS variables)
│   ├── components/         # React components
│   └── lib/                # Utilities (data, config, settings, github, orders, auth)
├── template.config.json    # Central branding config
└── .env.example            # Environment variable reference
```

---

## 🎨 Customizing the Theme

All theme colors are CSS variables in `src/app/globals.css`:

```css
:root {
  --brown: #6B4226;        /* Primary brand color */
  --brown-dark: #4A2C17;   /* Darker variant */
  --amber: #D4A574;        /* Accent color */
  --cream: #F5E6D3;        /* Background tint */
  --text-dark: #2C1810;    /* Headings */
  --text-body: #5A3E2B;    /* Body text */
  /* ...more in globals.css */
}
```

Change these in `globals.css` or run `node scripts/setup.js` to configure interactively.

Fonts are loaded in `src/app/layout.js` from Google Fonts:
- **Headings**: Playfair Display (serif)
- **Body**: DM Sans (sans-serif)

---

## 🛒 How Ordering Works

1. Customer browses products, adds to cart with variations (fabric, color, size)
2. Customer proceeds to checkout, fills in delivery details
3. Order is saved to `data/orders.json` via GitHub API
4. A structured WhatsApp message with all order details opens
5. Admin sees the order in the admin panel and updates status

Order statuses: `pending` → `confirmed` → `processing` → `delivered` (or `cancelled`)

---

## 📦 Product Data Model

```json
{
  "id": "3-seater-sofa",
  "name": "3-Seater Sofa",
  "description": "...",
  "price": 16000,
  "salePrice": null,
  "currency": "MWK",
  "image": "/images/sofa.png",
  "images": ["/images/sofa.png", "/images/sofa-2.png"],
  "category": "Sofas",
  "badge": "Popular",
  "inStock": true,
  "stockCount": 5,
  "featured": true,
  "specifications": {
    "Dimensions": "210cm × 90cm × 85cm",
    "Material": "Solid hardwood",
    "Warranty": "12 months"
  },
  "variations": [
    { "name": "Fabric Color", "options": ["Grey", "Beige", "Navy"] },
    { "name": "Size", "options": ["2-Seater", "3-Seater"] }
  ]
}
```

---

## 🚢 Deploying to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Add environment variables (see above)
4. Deploy — Vercel auto-detects Next.js
5. Every push to `main` triggers a new deployment
6. Admin changes (products, orders, blog posts) commit to the repo via GitHub API, which triggers rebuilds

---

## 🔄 Using This Template for a New Client

1. **Create a new repo from the template** (GitHub → "Use this template")
2. **Run `node scripts/setup.js`** — enter client's business details, colors, etc.
3. **Replace the logo** at `public/images/akonzi-logo.png` (keep the same filename or update references)
4. **Add product images** to `public/images/`
5. **Update products** via the admin panel or directly in `data/products.json`
6. **Set environment variables** on Vercel (ADMIN_PASSWORD, GITHUB_TOKEN)
7. **Deploy** — connect the repo to Vercel

Total setup time: ~15 minutes per client.

---

## 📝 License

This template is proprietary to Brandfletch Media. Each deployment for a client should have its own repo and configuration.

---

## 🆘 Support

Built and maintained by [Brandfletch Media](https://brandfletch.com).
