import { getSettings } from '@/lib/settings';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { CartProvider } from '@/components/CartProvider';
import CartContent from '@/components/CartContent';

export default async function CartPage() {
  const settings = getSettings();

  return (
    <CartProvider>
      <Navbar settings={settings} />
      <CartContent settings={settings} />
      <Footer settings={settings} />
      <WhatsAppFloat whatsapp={settings.whatsapp} businessName={settings.name} />
    </CartProvider>
  );
}
