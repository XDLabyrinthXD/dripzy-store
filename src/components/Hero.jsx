import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero() {
  const featuredWatches = [
    { image: '/watches/skeleton-classic.jpg', name: 'Skeleton Classic', delay: 0.3 },
    { image: '/watches/casio-edifice-1.jpg', name: 'Casio Edifice', delay: 0.5 },
    { image: '/watches/galaxy-watch-7-1.jpg', name: 'Galaxy Watch 7', delay: 0.7 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-purple-50/50 to-pink-50/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-100/20 to-pink-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              New Collection 2026
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              Elevate Your{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                Style
              </span>
              <br />
              With Every Tick
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-lg text-gray-500 max-w-lg mx-auto lg:mx-0"
            >
              Discover premium watches that blend craftsmanship with contemporary
              design. From skeleton masterpieces to smart wearables.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#watches"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-purple-200 transition-all duration-300 hover:scale-105 text-sm"
              >
                Shop Collection
              </a>
              <a
                href="#categories"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-purple-300 hover:text-purple-600 transition-all duration-300 text-sm"
              >
                Browse Categories
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-xs text-gray-400"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                Free Shipping
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                7-Day Returns
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                COD Available
              </div>
            </motion.div>
          </motion.div>

          {/* Watch Showcase */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto">
              {/* Background circle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full aspect-square"
              />

              {/* Floating watch images */}
              {featuredWatches.map((watch, index) => (
                <motion.div
                  key={watch.name}
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: watch.delay,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  className={`absolute ${
                    index === 0
                      ? 'top-4 left-4 w-32 sm:w-40 z-10'
                      : index === 1
                      ? 'top-1/2 -translate-y-1/2 right-0 w-36 sm:w-44 z-20'
                      : 'bottom-4 left-8 w-28 sm:w-36 z-10'
                  }`}
                >
                  <div className="animate-float" style={{ animationDelay: `${index * 2}s` }}>
                    <div className="bg-white rounded-2xl shadow-2xl shadow-purple-200/50 p-3 hover:scale-110 transition-transform duration-500">
                      <img
                        src={watch.image}
                        alt={watch.name}
                        className="w-full aspect-square object-cover rounded-xl"
                        loading="eager"
                      />
                      <p className="text-xs font-medium text-gray-600 mt-2 text-center truncate">
                        {watch.name}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Center spacer for layout */}
              <div className="aspect-square w-full" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a href="#watches" className="flex flex-col items-center gap-1 text-gray-400 hover:text-purple-500 transition-colors">
            <span className="text-xs font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
