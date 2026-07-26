import './globals.css';
import { siteConfig } from '@/lib/data';
import { CartProvider } from '@/components/CartProvider';

export const metadata = {
  metadataBase: new URL('https://akonzi-sofa-furniture.vercel.app'),
  title: 'Akonzi Sofa Furniture | Quality, Affordable & Durable Furniture in Lilongwe, Malawi',
  description: 'Akonzi Sofa Furniture — We make and supply quality, affordable & durable furniture of your choice. Sofa sets, dining sets, coffee tables & beds. Free delivery within Lilongwe, Malawi.',
  keywords: 'furniture, sofa, Lilongwe, Malawi, dining set, coffee table, bed frame, Akonzi, affordable furniture',
  openGraph: {
    title: 'Akonzi Sofa Furniture | Quality Furniture in Lilongwe, Malawi',
    description: 'We make and supply quality, affordable & durable furniture of your choice. Free delivery within Lilongwe.',
    images: ['/images/hero-showroom.png'],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%236B4226'/><text y='.9em' x='50%' text-anchor='middle' font-size='65' fill='%23D4A574' font-family='serif' font-weight='bold'>A</text></svg>" />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
