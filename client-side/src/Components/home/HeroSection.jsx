import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createPageUrl } from "../../utils";
import { ArrowRight, PlayCircle } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Framer Motion Variants
const textVariants = {
  hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: {
    opacity: 0, scale: 1.02,
    transition: { duration: 0.8, ease: "easeIn" }
  }
};



export default function HeroSection() {
  const { t } = useTranslation();
  const [currentBg, setCurrentBg] = useState(0);
  const [busImageIndex, setBusImageIndex] = useState(0);
  const sectionRef = useRef(null);

  // Original Assets Mapping
  const backgrounds = useMemo(() => [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: t("home.hero.title1"),
      subtitle: t("home.hero.subtitle1"),
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
    }
  ], [t]);

  // Scroll Progress for Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Slide Auto-Switch
  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 6000); // 6s duration per slide

    return () => clearInterval(bgInterval);
  }, [backgrounds.length]);

  // Bus Images Sub-interval
  useEffect(() => {
    const busImageInterval = setInterval(() => {
      if (backgrounds[1].images) {
        setBusImageIndex((prev) => (prev + 1) % backgrounds[1].images.length);
      }
    }, 3000);

    return () => clearInterval(busImageInterval);
  }, [backgrounds]);

  // Mobile Scroll Skip Effect
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let touchStartY = 0;
    let isSkipping = false;

    const skipToNext = () => {
      isSkipping = true;
      const nextElement = section.nextElementSibling;
      const targetTop = nextElement ? nextElement.offsetTop : window.innerHeight;
      
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
      
      setTimeout(() => { isSkipping = false; }, 800);
    };

    const handleWheel = (e) => {
      if (window.innerWidth >= 768) return;
      if (window.scrollY > 50) return;

      if (e.deltaY > 0) {
        e.preventDefault();
        if (!isSkipping) skipToNext();
      }
    };

    const handleTouchStart = (e) => {
      if (window.innerWidth >= 768) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (window.innerWidth >= 768) return;
      if (window.scrollY > 50) return;

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (deltaY > 20) {
        if (e.cancelable) e.preventDefault();
        if (!isSkipping) skipToNext();
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100dvh] w-full bg-[#050b14] overflow-hidden flex flex-col pt-[96px] md:pt-0">

      {/* Background ambient glow for the text side */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#020610] via-[#081528] to-[#0a1e3d] z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none z-0" />

      {/* Main Content Wrapper - flex layout to handle dynamic heights safely on mobile */}
      <div className="flex-1 w-full relative md:absolute md:top-[96px] md:left-0 md:right-0 md:bottom-0 flex flex-col md:flex-row z-10">

        {/* Left Side: Text Sweep Area */}
        <div className="w-full flex-none md:flex-1 md:w-[45%] relative z-20 flex flex-col justify-center px-6 py-6 sm:px-12 lg:px-20 md:py-0">
          <motion.div 
            className="w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Company Badge (Animates once) */}
            <motion.div variants={textVariants} className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6 w-max">
              <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="text-xs md:text-sm font-medium text-blue-100 tracking-wide uppercase">Since 2004 • Algerian Glass</span>
            </motion.div>

            {/* Crossfading Text Area (Holds position) */}
            <motion.div variants={textVariants} className="grid w-full mb-10">
              <AnimatePresence>
                <motion.div
                  key={currentBg}
                  className="col-start-1 row-start-1 w-full"
                  initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(8px)", transition: { duration: 0.4 } }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Main Heading */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white tracking-tight">
                    {backgrounds[currentBg].title}
                  </h1>

                  {/* Subheading */}
                  <p className="text-lg md:text-xl text-blue-100/80 max-w-lg leading-relaxed">
                    {backgrounds[currentBg].subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Call to Action Buttons (Desktop only) */}
            <motion.div variants={textVariants} className="hidden md:flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl("Products")} className="block">
                <motion.button 
                  whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(6, 182, 212, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden group bg-gradient-to-r from-cyan-600 to-blue-600 text-white w-full sm:w-auto px-8 py-4 rounded-xl font-semibold flex items-center justify-center transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    {t("home.hero.exploreProducts")}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>

              <Link to={createPageUrl("Gallery")} className="block">
                <motion.button 
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.1)", boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full sm:w-auto border border-white/20 text-white px-8 py-4 font-semibold rounded-xl backdrop-blur-md bg-white/5 flex items-center justify-center transition-all duration-300"
                >
                  <PlayCircle className="w-5 h-5 mr-2 text-cyan-400" />
                  {t("home.hero.viewProjects")}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Glass Building Image Area with Curved Mask (Animates once) */}
        <motion.div
          className="w-full flex-1 min-h-[300px] md:min-h-0 md:h-full md:w-[55%] relative mt-6 md:mt-0"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Liquid Glass Multilayer Effect */}
          {/* Layer 1 (Deepest) */}
          <div className="absolute -top-6 left-6 right-6 bottom-0 md:-top-0 md:inset-0 md:-left-12 md:top-8 md:bottom-8 rounded-t-[3rem] md:rounded-t-none md:rounded-l-[8rem] lg:rounded-l-[10rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_0_40px_rgba(34,211,238,0.1)] z-0" />

          {/* Layer 2 (Middle) */}
          <div className="absolute -top-3 left-3 right-3 bottom-0 md:-top-0 md:inset-0 md:-left-6 md:top-4 md:bottom-4 rounded-t-[3rem] md:rounded-t-none md:rounded-l-[8rem] lg:rounded-l-[10rem] bg-cyan-900/10 backdrop-blur-2xl border border-cyan-400/20 shadow-[0_0_30px_rgba(6,182,212,0.2)] z-0" />

          {/* Curved mask wrapper */}
          <div className="absolute inset-0 rounded-t-[3rem] md:rounded-t-none md:rounded-l-[8rem] lg:rounded-l-[10rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-l border-t md:border-t-0 border-white/20 z-10 backdrop-blur-md">
            <AnimatePresence mode="wait">
              {backgrounds[currentBg].images ? (
                <motion.div
                  key="multi"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {backgrounds[currentBg].images.map((img, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
                      style={{ opacity: imgIdx === busImageIndex ? 1 : 0 }}
                    >
                      <img
                        src={img}
                        alt="Background Layer"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent opacity-60 md:opacity-30" />
                      <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color-dodge" />
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="single"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={backgrounds[currentBg].image}
                    alt="Background Layer"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent opacity-60 md:opacity-30" />
                  <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color-dodge" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Call to Action Buttons (Overlay at bottom) */}
          <div className="absolute bottom-6 left-6 right-6 md:hidden flex flex-col sm:flex-row gap-3 z-30">
            <Link to={createPageUrl("Products")} className="block flex-1">
              <button className="relative overflow-hidden group bg-gradient-to-r from-cyan-600 to-blue-600 text-white w-full px-5 py-3 rounded-xl text-sm font-semibold flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.6)] border border-cyan-400/30">
                <span className="relative z-10 flex items-center">
                  {t("home.hero.exploreProducts")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </button>
            </Link>

            <Link to={createPageUrl("Gallery")} className="block flex-1">
              <button className="relative w-full border border-white/30 text-white px-5 py-3 text-sm font-semibold rounded-xl backdrop-blur-xl bg-[#050b14]/70 flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                <PlayCircle className="w-4 h-4 mr-2 text-cyan-400" />
                {t("home.hero.viewProjects")}
              </button>
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-[45%] transform -translate-x-1/2 z-30 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          />
        </div>
      </motion.div>

    </section>
  );
}