import React from 'react';
import { motion } from 'framer-motion';
import ProductSection from './ProductSection';

const AnimatedProductList = ({ products = [] }) => {
  return (
    <>
      {/* Desktop Layout - Animated */}
      <div className="hidden lg:block py-20 overflow-hidden">
        {products.map((product, index) => {
          const isOdd = index % 2 !== 0;
          return (
            <motion.div
              key={`desktop-${product.id || index}`}
              initial={{ opacity: 0, x: isOdd ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: "easeOut",
              }}
            >
              <ProductSection product={product} isReversed={isOdd} />
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Layout - Snapping is handled by ProductSection internally */}
      <div className="lg:hidden">
        {products.map((product, index) => {
          const isOdd = index % 2 !== 0;
          return (
            <ProductSection key={`mobile-${product.id || index}`} product={product} isReversed={isOdd} />
          );
        })}
      </div>
    </>
  );
};

export default AnimatedProductList;
