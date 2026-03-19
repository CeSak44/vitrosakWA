import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle, Download, ChevronDown, ChevronUp } from "lucide-react";

export default function ProductSection({ product, isReversed }) {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  
  // Mobile accordion states
  const [expandedSections, setExpandedSections] = useState({
    features: false,
    applications: false,
    specifications: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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
    <>
      {/* Desktop Version - Hidden on mobile */}
      <section ref={sectionRef} className="hidden lg:block py-16 overflow-hidden">
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
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
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

            {/* Download Catalogue Button */}
            {product.catalogueUrl && (
              <div className="mt-6">
                <a
                  href={encodeURI(product.catalogueUrl)}
                  download={product.catalogueUrl.split('/').pop()}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  <span>{t("productSection.downloadCatalogue")}</span>
                </a>
              </div>
            )}
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

      {/* Mobile Version - Visible only on mobile */}
      <section 
        className="lg:hidden h-screen flex flex-col bg-white"
        style={{ 
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always'
        }}
      >
        {/* Image Slider at Top */}
        <div className="relative w-full h-64 flex-shrink-0">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: index === currentImageIndex ? 1 : 0,
              }}
            >
              <img
                src={image}
                alt={`${product.title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}

          {/* Image Counter */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium z-10">
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 w-1.5'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Card Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          {/* Product Title */}
          <div className="text-center mb-4 pt-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h2>
            {product.subtitle && (
              <p className="text-sm text-gray-600">{product.subtitle}</p>
            )}
          </div>

          {/* Product Types */}
          {product.types && product.types.length > 0 && (
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {product.types.map((type, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {type}
                </span>
              ))}
            </div>
          )}

          {/* Key Features - Collapsible */}
          <div className="mb-3">
            <button
              onClick={() => toggleSection('features')}
              className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
            >
              <h3 className="text-base font-semibold text-gray-900">{t("productSection.keyFeatures")}</h3>
              {expandedSections.features ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedSections.features && (
              <div className="mt-2 px-4 space-y-3 pb-3">
                {product.attributes.map((attribute, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{attribute}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Applications - Collapsible */}
          <div className="mb-3">
            <button
              onClick={() => toggleSection('applications')}
              className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
            >
              <h3 className="text-base font-semibold text-gray-900">{t("productSection.applications")}</h3>
              {expandedSections.applications ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedSections.applications && (
              <div className="mt-2 px-4 flex flex-wrap gap-2 pb-3">
                {product.uses.map((use, index) => (
                  <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
                    {use}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Specifications - Collapsible */}
          <div className="mb-3">
            <button
              onClick={() => toggleSection('specifications')}
              className="w-full flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
            >
              <h3 className="text-base font-semibold text-gray-900">{t("productSection.specifications")}</h3>
              {expandedSections.specifications ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedSections.specifications && (
              <div className="mt-2 px-4 space-y-3 pb-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-2 last:border-0">
                    <dt className="text-xs font-medium text-gray-500 mb-1">{key}</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{value}</dd>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Download Catalogue Button */}
          {product.catalogueUrl && (
            <div className="mt-4 px-4">
              <a
                href={encodeURI(product.catalogueUrl)}
                download={product.catalogueUrl.split('/').pop()}
                className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-4 rounded-lg shadow-lg active:scale-95 transition-all duration-200"
              >
                <Download className="w-5 h-5" />
                <span>{t("productSection.downloadCatalogue")}</span>
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}