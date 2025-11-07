import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Factory, Globe, Users, Award, MapPin, Calendar } from "lucide-react";

export default function CompanyOverview() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  const images = [
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/fbacec0a2_photo_2025-11-07201258.jpeg",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/e4eaf547f_photo_2025-11-07201257.jpg",
    "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/9a2fe7aa8_photo_2025-11-07201255.jpeg"
  ];

  const highlights = [
    { icon: Calendar, label: t("companyOverview.established"), value: "2011" },
    { icon: MapPin, label: t("companyOverview.location"), value: "Sétif, Algeria" },
    { icon: Factory, label: t("companyOverview.facilitySize"), value: "15,000m²" },
    { icon: Users, label: t("companyOverview.productionArea"), value: "4,500m²" },
  ];

  // Auto-scroll through images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

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

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold">{t("companyOverview.aboutVitrosak")}</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {t("companyOverview.leadingGlass")}
              <span className="block text-blue-600">{t("companyOverview.excellenceInAlgeria")}</span>
            </h2>
            
            <div className="text-lg text-gray-700 space-y-4 mb-8">
              <p>
                {t("companyOverview.description1")}
              </p>
              <p>
                {t("companyOverview.description2")}
              </p>
            </div>

            {/* Key Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                      <p className="text-lg font-bold text-gray-900">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element with Parallax Slider */}
          <div className="relative">
            <div className="relative z-10">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                {/* Image Stack with Fade & Parallax */}
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="absolute inset-0"
                    style={{
                      opacity: index === currentImageIndex ? 1 : 0,
                      transform: `translateY(${(scrollProgress - 0.5) * 30}px) scale(${1 + scrollProgress * 0.05})`,
                      transition: 'opacity 1000ms ease-in-out, transform 100ms ease-out'
                    }}
                  >
                    <img
                      src={image}
                      alt={`VITROSAK facility ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                  {currentImageIndex + 1} / {images.length}
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-white w-6' 
                          : 'bg-white/50 w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-2xl opacity-20 z-0" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl opacity-30 z-0" />
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-6 z-20 border border-gray-100">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{t("about.iso9001")}</p>
                <p className="text-sm text-gray-600">{t("companyOverview.certifiedQuality")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}