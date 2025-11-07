import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";

export default function ProductSection({ product, isReversed }) {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  // Auto-scroll through images
  useEffect(() => {
    if (product.images && product.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [product.images]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate progress when section is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, 
          (windowHeight - rect.top) / (windowHeight + sectionHeight)
        ));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const displayImages = product.images || [product.image];

  return (
    <section ref={sectionRef} className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Content */}
          <div className={isReversed ? 'lg:col-start-2' : ''}>
            <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
              <product.icon className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">{product.subtitle}</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{product.title}</h2>
            
            {/* Product Types (if available) */}
            {product.types && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {product.types.map((type, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Attributes */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("productSection.keyFeatures")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.attributes.map((attribute, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{attribute}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("productSection.applications")}</h3>
              <div className="flex flex-wrap gap-2">
                {product.uses.map((use, index) => (
                  <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {use}
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("productSection.specifications")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-sm font-medium text-gray-500">{key}</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Parallax Image Slider */}
          <div className={isReversed ? 'lg:col-start-1' : ''}>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                {/* Image Stack with Fade Transitions */}
                {displayImages.map((image, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                      opacity: index === currentImageIndex ? 1 : 0,
                      transform: `translateY(${(scrollProgress - 0.5) * 50}px) scale(${1 + scrollProgress * 0.05})`,
                      transition: 'opacity 1000ms ease-in-out, transform 100ms ease-out'
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                ))}

                {/* Image Counter */}
                {displayImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                    {currentImageIndex + 1} / {displayImages.length}
                  </div>
                )}

                {/* Slide Indicators */}
                {displayImages.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {displayImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-white w-8' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Decorative Elements */}
              <div 
                className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r ${product.color} rounded-2xl opacity-20 z-0`}
                style={{
                  transform: `rotate(${scrollProgress * 360}deg)`,
                  transition: 'transform 100ms ease-out'
                }}
              />
              <div 
                className={`absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r ${product.color} rounded-xl opacity-10 z-0`}
                style={{
                  transform: `rotate(${-scrollProgress * 360}deg)`,
                  transition: 'transform 100ms ease-out'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}