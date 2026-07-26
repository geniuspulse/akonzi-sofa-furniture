// Server component — reads settings on the server and passes to client
import { getSettings } from '@/lib/settings';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { CartProvider } from '@/components/CartProvider';
import ContactClient from '@/components/ContactClient';

export const metadata = {
  title: 'Contact | Akonzi Furniture & General Dealers',
  description: 'Get in touch with Akonzi Furniture. Order via WhatsApp or send us a message.',
};

export default function ContactPage() {
  const settings = getSettings();
  return (
    <CartProvider>
      <Navbar />
      <ContactClient settings={settings} />
      <Footer settings={settings} />
      <WhatsAppFloat whatsapp={settings.whatsapp} businessName={settings.name} />
    </CartProvider>
  );
}
