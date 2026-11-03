import { Mail, Phone, MapPin, Heart, Users } from 'lucide-react';
import Instagram from './icons/InstagramIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneNumber = "95948 50590";
  const rawPhone = "9594850590";
  const whatsAppGroupLink = "https://chat.whatsapp.com/BtqpfBROCHJ4t3MGSK429I";
  const directChatLink = `https://wa.me/91${rawPhone}?text=Hi%20Dripzy%20Store%2C%20I%20have%20an%20inquiry!`;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo/dripzy_logo.jpg"
                alt="Dripzy Store"
                className="h-10 w-10 rounded-xl object-cover"
              />
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Dripzy
                </span>
                <span className="text-[10px] block text-gray-500 -mt-1 font-medium tracking-widest">
                  STORE
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Your destination for premium watches that define style and sophistication.
              Curated luxury timepieces at unbeatable prices with PAN-India delivery.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/dripzystore.ghansoli/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-800 rounded-xl hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 text-gray-300 hover:text-white transition-all duration-300"
                aria-label="Instagram"
                title="Instagram @dripzystore.ghansoli"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={directChatLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-800 rounded-xl hover:bg-emerald-600 text-gray-300 hover:text-white transition-all duration-300"
                aria-label="WhatsApp Direct"
                title="Chat on WhatsApp (+91 95948 50590)"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={whatsAppGroupLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-800 rounded-xl hover:bg-purple-600 text-gray-300 hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="WhatsApp VIP Group"
                title="Join VIP WhatsApp Community"
              >
                <Users className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#watches" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                  All Watches
                </a>
              </li>
              <li>
                <a href="#categories" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#instagram" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                  Community & VIP Group
                </a>
              </li>
              <li>
                <a
                  href={whatsAppGroupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5" />
                  Join VIP WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Policies & Trust</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                  Return & Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                  Shipping & Delivery Info
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Direct Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:+91${rawPhone}`}
                  className="text-sm text-white hover:text-emerald-400 font-medium transition-colors"
                >
                  +91 {phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={directChatLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-emerald-400 hover:underline transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">
                  Ghansoli, Navi Mumbai,<br />Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href="mailto:contact@dripzystore.com" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                  contact@dripzystore.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔒</span>
              Secure Payments
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🚚</span>
              Free Delivery
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">↩️</span>
              7-Day Returns
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              Genuine Products
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💳</span>
              COD Available
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {currentYear} Dripzy Store. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
