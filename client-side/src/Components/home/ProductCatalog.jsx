
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createPageUrl } from "../../utils";
import { ArrowRight, Shield, Thermometer, Car, Building } from "lucide-react";

export default function ProductCatalog() {
  const { t } = useTranslation();
  const products = [
    {
      icon: Building,
      title: t("home.products.temperedGlass"),
      description: t("home.products.availableFlatCurved"),
      types: [t("home.products.flatTempered"), t("home.products.curvedTempered")],
      uses: [t("home.products.shopfronts"), t("home.products.showerEnclosures"), t("home.products.staircases"), t("home.products.balustrades"), t("home.products.architecturalFeatures"), t("home.products.customDesigns")],
      color: "from-blue-500 to-blue-600",
      images: [
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/1ff7773c8_flatTempered.jpeg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/8c01c8ebf_flatTempered1.jpeg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/b6e59ba2d_flatcurvedGlass.png"
      ]
    },
    {
      icon: Thermometer,
      title: t("home.products.glazingGlass"),
      description: t("home.products.availableDoubleTriple"),
      types: [t("home.products.doubleGlazing"), t("home.products.tripleGlazing")],
      uses: [t("home.products.buildingFacades"), t("home.products.refrigeratorDoors"), t("home.products.energyEfficiency"), t("home.products.noiseReduction"), t("home.products.highPerformanceBuildings"), t("home.products.extremeClimateControl")],
      color: "from-blue-500 to-blue-600",
      images: [
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/8625388f3_fasade.jpeg",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "/Curtain Wall/photo_2025-11-14 18.21.43.jpeg",
        "/Curtain Wall/photo_2025-11-14 18.21.50.jpeg",
        "/Curtain Wall/photo_2025-11-14 18.21.54.jpeg"
      ]
    },
    {
      icon: Shield,
      title: t("home.products.laminatedGlass"),
      uses: [t("home.products.hotels"), t("home.products.bankCounters"), t("home.products.skylights"), t("home.products.glassFlooring")],
      color: "from-blue-500 to-blue-600",
      images: [
        "https://buyglassonline.com.au/wp-content/uploads/2023/07/Toughened-Laminate-Glass-1.jpeg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/ffd0f96a1_laminated1.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/acfd2a3f3_laminated2.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/3c45f20d6_laminated.jpg"
      ]
    },
    {
      icon: Car,
      title: t("home.products.busesHeavyMachinery"),
      uses: [t("home.products.buses"), t("home.products.heavyConstructionMachinery"), t("home.products.largeVehicleWindshields"), t("home.products.industrialApplications")],
      color: "from-blue-500 to-blue-600",
      images: [
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/1e604c233_pb.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/c9eea02cc_pb-lourd.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/494517b73_lourd.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/29373a9f5_Bus1.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/aa385ad04_renaul.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/5db74fb91_bus2.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/9bfeb9a82_Bus3.jpg"
      ]
    },
    {
      icon: Building,
      title: t("home.products.homeAppliances"),
      uses: [t("home.products.refrigerators"), t("home.products.ovens"), t("home.products.cooktops"), t("home.products.householdEquipment")],
      color: "from-blue-500 to-blue-600",
      images: [
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/613370cf2_four1.png",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/2194085b5_four.png",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/bf08777ea_photo_2025-11-07200447.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/0d78748a3_photo_2025-11-07200446.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/db9d75440_photo_2025-11-07200444.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/627b8c3c2_photo_2025-11-07200442.jpg"
      ]
    }
  ];

  const [imageIndices, setImageIndices] = useState({});
  const [scrollProgress, setScrollProgress] = useState({});
  const cardRefs = useRef([]);

  // Auto-scroll through images
  useEffect(() => {
    const intervals = [];
    
    products.forEach((product, idx) => {
      if (product.images && product.images.length > 1) {
        const interval = setInterval(() => {
          setImageIndices(prev => ({
            ...prev,
            [idx]: ((prev[idx] || 0) + 1) % product.images.length
          }));
        }, 3500);
        intervals.push(interval);
      }
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []); // Empty dependency array - run once on mount

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      cardRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const cardHeight = rect.height;
        
        // Calculate progress when card is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.max(0, Math.min(1, 
            (windowHeight - rect.top) / (windowHeight + cardHeight)
          ));
          setScrollProgress(prev => ({
            ...prev,
            [index]: progress
          }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array - run once on mount

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
            <Building className="w-4 h-4" />
            <span className="text-sm font-semibold">{t('home.productCatalog.badge')}</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('home.productCatalog.sectionTitle')}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('home.productCatalog.intro')}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {products.map((product, index) => {
            const currentImageIndex = imageIndices[index] || 0;
            const progress = scrollProgress[index] || 0;

            return (
              <div 
                key={index} 
                ref={el => cardRefs.current[index] = el}
                className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Product Image with Parallax Slider */}
                <div className="relative h-64 overflow-hidden">
                  {/* Image Stack with Fade & Parallax */}
                  {product.images && product.images.length > 0 ? (
                    <>
                      {product.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="absolute inset-0"
                          style={{
                            opacity: imgIndex === currentImageIndex ? 1 : 0,
                            transform: `translateY(${(progress - 0.5) * 30}px) scale(${1 + progress * 0.05})`,
                            transition: 'opacity 1000ms ease-in-out, transform 100ms ease-out'
                          }}
                        >
                          <img
                            src={image}
                            alt={`${product.title} ${imgIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      
                      {/* Image Counter */}
                      {product.images.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                          {currentImageIndex + 1} / {product.images.length}
                        </div>
                      )}

                      {/* Slide Indicators */}
                      {product.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                          {product.images.map((_, imgIndex) => (
                            <div
                              key={imgIndex}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                imgIndex === currentImageIndex
                                  ? 'bg-white w-6' 
                                  : 'bg-white/50 w-2'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : null}
                  
                  {/* Icon Badge */}
                  <div className="absolute top-6 left-6 z-10">
                    <div className="w-12 h-12 bg-blue-600/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <product.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>

                {/* Product Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h3>
                  
                  {/* Types (if available) */}
                  {product.types && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {product.types.map((type, typeIndex) => (
                          <span key={typeIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Use Cases */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">{t("home.products.applications")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.uses.map((use, useIndex) => (
                        <span key={useIndex} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link to={createPageUrl("Products")}>
            <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              {t("home.products.viewCompleteRange")}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
