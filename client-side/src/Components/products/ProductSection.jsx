import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle, Download, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      <section ref={sectionRef} className="hidden lg:block py-16 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
            {/* Content */}
            <div className={isReversed ? 'lg:col-start-2' : ''}>
              <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
                <product.icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700 font-medium uppercase tracking-widest">{product.subtitle}</span>
              </div>

              <h2 className="text-4xl font-black text-gray-900 mb-6">{product.title}</h2>

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
                <div className="relative h-96 rounded-[4rem] overflow-hidden shadow-2xl">
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
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
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

      {/* Mobile Version - Premium Glassmorphic Style */}
      <section
        className="lg:hidden h-[calc(100vh-80px)] flex flex-col items-center justify-start p-4 bg-[#0a192f] snap-start"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full flex flex-col bg-[#113154]/40 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative group"
        >
          {/* Image Slider at Top */}
          <div className="relative w-full h-56 flex-shrink-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img
                  src={displayImages[currentImageIndex]}
                  alt={`${product.title} ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#113154]/80 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Floating Badge (Icon) */}
            <div className="absolute top-4 left-4 z-20">
              <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <product.icon className="w-5 h-5 text-blue-300" />
              </div>
            </div>

            {/* Image Counter */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-4 right-6 bg-black/40 backdrop-blur-md text-white/90 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase z-10 border border-white/5">
                {currentImageIndex + 1} / {displayImages.length}
              </div>
            )}

            {/* Slide Indicators */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-4 left-6 flex space-x-1.5 z-10">
                {displayImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-1 rounded-full transition-all duration-500 ${index === currentImageIndex
                        ? 'bg-blue-400 w-6'
                        : 'bg-white/20 w-1.5'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Card Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 pb-8 custom-scrollbar">
            {/* Product Title */}
            <div className="text-center mb-6 pt-6">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-black text-white mb-2 tracking-tight"
              >
                {product.title}
              </motion.h2>
              {product.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-blue-200/60 font-medium uppercase tracking-widest"
                >
                  {product.subtitle}
                </motion.p>
              )}
            </div>

            {/* Product Types */}
            {product.types && product.types.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-6 flex flex-wrap justify-center gap-2"
              >
                {product.types.map((type, index) => (
                  <span key={index} className="bg-blue-400/10 text-blue-300 border border-blue-400/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {type}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Accordion Sections */}
            <div className="space-y-3">
              {[
                { id: 'features', label: t("productSection.keyFeatures"), content: product.attributes, type: 'list' },
                { id: 'applications', label: t("productSection.applications"), content: product.uses, type: 'tags' },
                { id: 'specifications', label: t("productSection.specifications"), content: Object.entries(product.specifications), type: 'grid' }
              ].map((section, idx) => (
                <div key={section.id} className="overflow-hidden">
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    onClick={() => toggleSection(section.id)}
                    className={`w-full flex items-center justify-between py-4 px-5 rounded-[1.5rem] transition-all duration-300 ${expandedSections[section.id]
                        ? 'bg-white/10 border border-white/10'
                        : 'bg-white/5 border border-transparent'
                      }`}
                  >
                    <span className="text-sm font-bold text-white/90">{section.label}</span>
                    {expandedSections[section.id] ? (
                      <ChevronUp className="w-4 h-4 text-blue-300" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/40" />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {expandedSections[section.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="py-4 px-5 space-y-3">
                          {section.type === 'list' && section.content.map((item, i) => (
                            <div key={i} className="flex items-start space-x-3">
                              <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-blue-100/70 leading-relaxed">{item}</span>
                            </div>
                          ))}
                          {section.type === 'tags' && (
                            <div className="flex flex-wrap gap-2">
                              {section.content.map((tag, i) => (
                                <span key={i} className="bg-white/5 text-blue-200/60 px-3 py-1.5 rounded-lg text-[10px] font-medium border border-white/5">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {section.type === 'grid' && (
                            <div className="grid gap-3">
                              {section.content.map(([k, v]) => (
                                <div key={k} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-tight">{k}</span>
                                  <span className="text-[10px] text-blue-300 font-bold">{v}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Download Button */}
            {product.catalogueUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8"
              >
                <a
                  href={encodeURI(product.catalogueUrl)}
                  download={product.catalogueUrl.split('/').pop()}
                  className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-6 py-4 rounded-3xl shadow-xl active:scale-[0.98] transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  <span className="text-sm tracking-wide">{t("productSection.downloadCatalogue")}</span>
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
}