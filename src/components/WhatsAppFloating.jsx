import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Users, X, Send } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '9594850590';
  const groupLink = 'https://chat.whatsapp.com/BtqpfBROCHJ4t3MGSK429I';
  const directChatLink = `https://wa.me/91${phoneNumber}?text=Hi%20Dripzy%20Store%2C%20I%20have%20an%20inquiry%20about%20your%20watches!`;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-500 p-4 text-white relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <WhatsAppIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-300 border-2 border-emerald-600 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Dripzy Support</h4>
                  <p className="text-xs text-emerald-100">Usually replies in minutes</p>
                </div>
              </div>
            </div>

            {/* Content options */}
            <div className="p-4 space-y-3 bg-gray-50/50">
              <p className="text-xs text-gray-500">
                Hey there! 👋 How can we help you today?
              </p>

              {/* Direct WhatsApp Chat */}
              <a
                href={directChatLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-emerald-100 hover:border-emerald-400 hover:shadow-md transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Send className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-800">
                    Chat with Us Directly
                  </div>
                  <div className="text-[11px] text-gray-500 truncate">
                    +91 95948 50590 (Personal Support)
                  </div>
                </div>
              </a>

              {/* Join WhatsApp VIP Group */}
              <a
                href={groupLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-purple-100 hover:border-purple-400 hover:shadow-md transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Users className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-800">
                    Join VIP WhatsApp Group
                  </div>
                  <div className="text-[11px] text-purple-600 font-medium">
                    Weekly drops, giveaways & deals
                  </div>
                </div>
              </a>
            </div>

            <div className="px-4 py-2 bg-gray-100/70 text-center">
              <span className="text-[10px] text-gray-400 font-medium">
                Official Dripzy Store Support
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all font-medium text-sm group"
        aria-label="Contact on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <WhatsAppIcon className="w-5 h-5 text-white" />
        <span className="hidden sm:inline font-semibold">Chat with Us</span>
      </motion.button>
    </div>
  );
}
