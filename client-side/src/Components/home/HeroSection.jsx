import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createPageUrl } from "../../utils";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function HeroSection() {
  const { t } = useTranslation();
  const [currentBg, setCurrentBg] = useState(0);
  const [busImageIndex, setBusImageIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  
  const backgrounds = [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: t("home.hero.title1"),
      subtitle: t("home.hero.subtitle1"),
      gradient: "linear-gradient(135deg, #3477AC 0%, #C5DBF0 50%, #ffffff 100%)"
    },
    {
      images: [
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/26db766c8_higer.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/bdc912b50_bus2.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/3c42c195d_lourdd.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/8ac43cadb_lourd.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/c576fa17b_pb.jpg"
      ],
      title: t("home.hero.title2"),
      subtitle: t("home.hero.subtitle2"),
      gradient: "linear-gradient(135deg, #3477AC 0%, #C5DBF0 50%, #ffffff 100%)"
    }
  ];

  // Background slide auto-switch
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(bgInterval);
  }, []);

  // Bus images auto-scroll
  useEffect(() => {
    const busImageInterval = setInterval(() => {
      if (backgrounds[1].images) {
        setBusImageIndex((prev) => (prev + 1) % backgrounds[1].images.length);
      }
    }, 3000);

    return () => clearInterval(busImageInterval);
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

  const getCurrentBackgroundImage = (bg, index) => {
    if (index === 1 && bg.images) {
      return bg.images[busImageIndex];
    }
    return bg.image;
  };

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Transition & Parallax */}
      {backgrounds.map((bg, index) => {
        const isActive = index === currentBg;
        const currentImage = getCurrentBackgroundImage(bg, index);
        
        return (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* If this background has multiple images (bus slide) */}
            {index === 1 && bg.images ? (
              <div className="absolute inset-0">
                {bg.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                      opacity: imgIndex === busImageIndex ? 1 : 0,
                      transform: `scale(${1 + scrollProgress * 0.1}) translateY(${scrollProgress * 50}px)`,
                      transition: 'opacity 1000ms ease-in-out, transform 150ms ease-out',
                      backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.8), rgba(59, 130, 246, 0.6)), url('${image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundAttachment: "fixed"
                    }}
                  />
                ))}
              </div>
            ) : (
              /* Single image background with parallax */
              <div
                className="absolute inset-0"
                style={{
                  transform: `scale(${1 + scrollProgress * 0.1}) translateY(${scrollProgress * 50}px)`,
                  transition: 'transform 150ms ease-out',
                  backgroundImage: `linear-gradient(rgba(30, 64, 175, 0.8), rgba(59, 130, 246, 0.6)), url('${currentImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundAttachment: "fixed"
                }}
              />
            )}
          </div>
        );
      })}
      
      {/* Animated Glass Pattern Overlay */}
      <div className="absolute inset-0 z-10">
        <div 
          className="absolute top-20 left-20 w-32 h-32 border-2 border-white/20 rotate-45 animate-pulse"
          style={{
            transform: `rotate(${45 + scrollProgress * 180}deg)`,
            transition: 'transform 150ms ease-out'
          }}
        />
        <div 
          className="absolute top-40 right-32 w-24 h-24 border-2 border-blue-300/30 rotate-12 animate-bounce"
          style={{
            transform: `rotate(${12 + scrollProgress * 90}deg) translateY(${scrollProgress * -20}px)`,
            transition: 'transform 150ms ease-out'
          }}
        />
        <div 
          className="absolute bottom-32 left-1/4 w-28 h-28 border-2 border-white/15 -rotate-12 animate-pulse"
          style={{
            transform: `rotate(${-12 - scrollProgress * 180}deg)`,
            transition: 'transform 150ms ease-out'
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-20 h-20 border-2 border-blue-200/25 rotate-45 animate-bounce"
          style={{
            transform: `rotate(${45 - scrollProgress * 90}deg) translateY(${scrollProgress * 20}px)`,
            transition: 'transform 150ms ease-out'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Company Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Since 2004 • Algerian Glass Excellence</span>
          </div>

          {/* Main Heading - Animated with Gradient */}
          <div className="mb-6">
            {backgrounds.map((bg, index) => (
              <h1 
                key={index}
                className={`text-5xl md:text-7xl font-bold leading-tight transition-opacity duration-1000 ${
                  index === currentBg ? 'opacity-100' : 'opacity-0 absolute inset-x-0'
                }`}
                style={{
                  background: bg.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {bg.title}
              </h1>
            ))}
          </div>

          {/* Subheading - Animated */}
          <div className="mb-8 h-32">
            {backgrounds.map((bg, index) => (
              <p 
                key={index}
                className={`text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed transition-opacity duration-1000 ${
                  index === currentBg ? 'opacity-100' : 'opacity-0 absolute inset-x-0'
                }`}
              >
                {bg.subtitle}
              </p>
            ))}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Products")}>
              <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200">
                {t("home.hero.exploreProducts")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
            
            <Link to={createPageUrl("Gallery")}>
              <button className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-200">
                <PlayCircle className="w-5 h-5 mr-2" />
                {t("home.hero.viewProjects")}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}