import { ExternalLink, Users, PhoneCall } from 'lucide-react';
import Instagram from './icons/InstagramIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function InstagramSection() {
  const [ref, isVisible] = useScrollAnimation();
  const whatsAppGroupLink = "https://chat.whatsapp.com/BtqpfBROCHJ4t3MGSK429I";
  const phoneNumber = "9594850590";
  const directChatLink = `https://wa.me/91${phoneNumber}?text=Hi%20Dripzy%20Store%2C%20I'd%20like%20to%20know%20more%20about%20your%20watches!`;

  return (
    <section id="instagram" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social & Community Cards */}
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-[0.2em]">
              Connect With Us
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              Join the Dripzy Community
            </h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto">
              Follow us for new drops, customer reviews, weekly giveaways & fast customer support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Instagram Card */}
            <div className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-3xl p-8 sm:p-10 text-center overflow-hidden flex flex-col justify-between shadow-xl shadow-pink-500/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
                  <Instagram className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Follow on Instagram
                </h3>
                <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">
                  Stay updated with our latest drops, wrist-check videos, and customer reviews.
                </p>

                <a
                  href="https://www.instagram.com/dripzystore.ghansoli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-purple-600 font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  @dripzystore.ghansoli
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Follower Stats */}
                <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-around text-white/90">
                  <div>
                    <p className="text-xl font-bold">1K+</p>
                    <p className="text-[11px] text-white/70">Followers</p>
                  </div>
                  <div className="w-px h-6 bg-white/20" />
                  <div>
                    <p className="text-xl font-bold">50+</p>
                    <p className="text-[11px] text-white/70">Watch Models</p>
                  </div>
                  <div className="w-px h-6 bg-white/20" />
                  <div>
                    <p className="text-xl font-bold">200+</p>
                    <p className="text-[11px] text-white/70">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp VIP Community & Support Card */}
            <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600 rounded-3xl p-8 sm:p-10 text-center overflow-hidden flex flex-col justify-between shadow-xl shadow-emerald-500/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
                  <WhatsAppIcon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  WhatsApp VIP Group
                </h3>
                <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">
                  Instant drops, secret discounts & direct personal contact with our team.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <a
                    href={whatsAppGroupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-emerald-700 font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-sm"
                  >
                    <Users className="w-4 h-4" />
                    Join VIP Group
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={directChatLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-700/60 hover:bg-emerald-700 text-white font-semibold rounded-full border border-white/20 transition-all duration-300 text-sm"
                  >
                    <PhoneCall className="w-4 h-4" />
                    +91 95948 50590
                  </a>
                </div>

                {/* WhatsApp Community perks */}
                <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-around text-white/90">
                  <div>
                    <p className="text-xl font-bold">24/7</p>
                    <p className="text-[11px] text-white/70">Support</p>
                  </div>
                  <div className="w-px h-6 bg-white/20" />
                  <div>
                    <p className="text-xl font-bold">Early</p>
                    <p className="text-[11px] text-white/70">Drop Access</p>
                  </div>
                  <div className="w-px h-6 bg-white/20" />
                  <div>
                    <p className="text-xl font-bold">VIP</p>
                    <p className="text-[11px] text-white/70">Exclusive Deals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Giveaway Banner */}
        <div className="mt-10">
          <div className="relative bg-gray-900 rounded-3xl p-8 sm:p-12 text-center overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.18),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.18),transparent_50%)]" />

            {/* Confetti dots */}
            <div className="absolute top-4 left-8 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <div className="absolute top-12 right-12 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-8 left-16 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-4 right-20 w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="absolute top-6 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />

            <div className="relative z-10">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 leading-tight">
                NEW GIVEAWAYS
              </h2>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300 leading-tight">
                EVERY WEEK
              </h2>
              <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
                Follow our Instagram and be an active member in our WhatsApp group to participate in our weekly luxury watch giveaways!
              </p>

              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <a
                  href={whatsAppGroupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300 text-sm"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  Join WhatsApp Giveaway
                </a>

                <a
                  href="https://www.instagram.com/dripzystore.ghansoli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-yellow-400 to-pink-500 text-gray-900 font-bold rounded-full hover:shadow-2xl hover:shadow-pink-300/30 hover:scale-105 transition-all duration-300 text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  Enter on Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
