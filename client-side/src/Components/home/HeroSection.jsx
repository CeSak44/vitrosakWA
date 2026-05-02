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

// Reusable Animated Glass Shapes
const AnimatedShapes = ({ scrollYProgress }) => {
  // Parallax offsets
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Shard 1 (Top Left/Center) */}
      <motion.div
        style={{ y: y1 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } }}
        className="absolute top-[10%] left-[45%] md:left-[40%] pointer-events-auto group"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-48 h-16 md:w-64 md:h-24 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl -rotate-[35deg] transition-all duration-500 group-hover:bg-white/10 group-hover:border-cyan-300/30 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
        />
      </motion.div>

      {/* Shard 2 (Bottom Left) */}
      <motion.div
        style={{ y: y2 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.7 } }}
        className="absolute bottom-[20%] left-[10%] md:left-[55%] pointer-events-auto group"
      >
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="w-64 h-24 md:w-80 md:h-32 bg-cyan-900/10 backdrop-blur-md border border-cyan-500/20 rounded-3xl -rotate-[35deg] transition-all duration-500 group-hover:bg-cyan-800/20 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]"
        />
      </motion.div>
      
      {/* Shard 3 (Middle Right) */}
      <motion.div
        style={{ y: y3 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.9 } }}
        className="absolute top-[30%] right-[5%] md:right-[15%] pointer-events-auto group hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="w-32 h-12 md:w-48 md:h-16 bg-blue-900/10 backdrop-blur-sm border border-blue-400/20 rounded-xl -rotate-[35deg] transition-all duration-500 group-hover:bg-blue-800/20 group-hover:border-cyan-300/40 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        />
      </motion.div>
    </div>
  );
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

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[700px] w-full bg-[#050b14] overflow-hidden">
      
      {/* Background ambient glow for the text side */}
      <div className="absolute top-0 left-0 w-full md:w-1/2 h-full bg-gradient-to-br from-[#020610] via-[#081528] to-[#0f2950] z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none z-0" />

      {/* Main Slide Content Loop */}
      <AnimatePresence mode="sync">
        {backgrounds.map((bg, index) => {
          if (index !== currentBg) return null;
          
          const isMultiImage = !!bg.images;

          return (
            <motion.div 
              key={index}
              className="absolute inset-0 flex flex-col md:flex-row z-10"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              
              {/* Left Side: Text Sweep Area */}
              <motion.div 
                className="w-full h-[60%] md:h-full md:w-[45%] flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-20 pb-4 md:py-0 relative z-20"
                variants={containerVariants}
              >
                {/* Company Badge */}
                <motion.div variants={textVariants} className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6 w-max">
                  <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <span className="text-xs md:text-sm font-medium text-blue-100 tracking-wide uppercase">Since 2004 • Algerian Glass</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1 
                  variants={textVariants} 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white tracking-tight"
                >
                  {bg.title}
                </motion.h1>

                {/* Subheading */}
                <motion.p 
                  variants={textVariants} 
                  className="text-lg md:text-xl text-blue-100/80 max-w-lg leading-relaxed mb-10"
                >
                  {bg.subtitle}
                </motion.p>

                {/* Call to Action Buttons */}
                <motion.div variants={textVariants} className="flex flex-col sm:flex-row gap-4">
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

              {/* Right Side: Glass Building Image Area with Curved Mask */}
              <motion.div 
                className="w-full h-[40%] md:h-full md:w-[55%] relative overflow-hidden"
                variants={imageVariants}
              >
                {/* 
                  Curved mask wrapper: rounded-l-[X] creates the soft overlapping effect.
                  On mobile, we slightly curve the top for a smooth vertical stack transition.
                */}
                <div className="absolute inset-0 rounded-t-[3rem] md:rounded-t-none md:rounded-l-[8rem] lg:rounded-l-[10rem] overflow-hidden shadow-2xl">
                  {isMultiImage ? (
                    <div className="absolute inset-0 w-full h-full">
                      {bg.images.map((img, imgIdx) => (
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
                          {/* Enhancing contrast and cyan glow subtly */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent opacity-60 md:opacity-30" />
                          <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color-dodge" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={bg.image}
                        alt="Background Layer"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      {/* Enhancing contrast and cyan glow subtly */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent opacity-60 md:opacity-30" />
                      <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color-dodge" />
                    </div>
                  )}
                </div>
              </motion.div>
              
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Floating Geometric Shards (Match Reference) */}
      <AnimatedShapes scrollYProgress={scrollYProgress} />

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