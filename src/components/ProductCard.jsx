import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, getDiscount } from '../utils/helpers';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState } from 'react';

export default function ProductCard({ product, index }) {
  const { addItem } = useCart();
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discount = getDiscount(product.originalPrice, product.price);

  const handleAddToCart = () => {
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
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

          {/* Add to Cart Button */}
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            className={`absolute bottom-3 left-3 right-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 ${
              addedToCart
                ? 'bg-green-500 text-white'
                : 'bg-white/95 glass text-gray-800 hover:bg-purple-600 hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {addedToCart ? 'Added!' : 'Add to Cart'}
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
