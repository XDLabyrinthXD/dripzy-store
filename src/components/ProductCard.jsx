import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import { formatPrice, getDiscount, openWhatsAppWithToast } from '../utils/helpers';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState } from 'react';

export default function ProductCard({ product, index }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discount = getDiscount(product.originalPrice, product.price);

  const phoneNumber = '919594850590';

  const getWhatsAppUrl = () => {
    const message = `Hi Dripzy Store! I want to buy the ${product.name} listed for ${formatPrice(product.price)}. Is this item available?`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleBuyViaWhatsApp = (e) => {
    e.preventDefault();
    openWhatsAppWithToast(getWhatsAppUrl());
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
    >
      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-500">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-square bg-gray-50">
          <img
            src={imgError ? '/watches/placeholder.jpg' : product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
            onError={() => setImgError(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className="px-2.5 py-1 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="px-2.5 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-full shadow-md transition-colors ${
                liked
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600 hover:text-red-500'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} />
            </button>
            <button
              className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-purple-600 transition-colors"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Buy via WhatsApp Button */}
          <motion.button
            onClick={handleBuyViaWhatsApp}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-3 left-3 right-3 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 text-white cursor-pointer"
            style={{ backgroundColor: '#25D366' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Buy via WhatsApp
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-[10px] font-semibold text-purple-500 uppercase tracking-widest mb-1">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
