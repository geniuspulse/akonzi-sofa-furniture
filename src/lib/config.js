// ===== Site Config (Client-Safe) =====
// Default values used as fallback. Actual values come from data/settings.json (server-side).
// This file has NO Node.js imports — it's safe to use in client components.

export const siteConfig = {
  name: 'Akonzi Furniture & General Dealers',
  tagline: 'Quality Starts Here!!!',
  description: 'We make and supply quality, affordable & durable furniture of your choice. Free delivery within Lilongwe.',
  location: 'Lilongwe, Malawi',
  whatsapp: '265000000000',
  phone: '+265 000 000 000',
  email: 'info@akonzifurniture.com',
  address: 'Lilongwe, Malawi',
  hours: 'Mon-Sat: 8:00 AM - 5:00 PM',
  facebook: 'https://www.facebook.com/61588092507889/',
  instagram: 'https://www.instagram.com/akonzisofa/',
};

export function whatsappLink(message, whatsapp) {
  const num = whatsapp || siteConfig.whatsapp;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${num}?text=${encoded}`;
}
