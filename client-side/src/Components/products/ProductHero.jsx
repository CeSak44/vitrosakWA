import React from "react";
import { useTranslation } from "react-i18next";
import { Package, Award, Globe, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

// Stagger container variant for the features grid
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// Item variant for individual features
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export default function ProductHero() {
  const { t } = useTranslation();
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden snap-start h-[90vh] flex flex-col justify-center pt-28">
      {/* Background Pattern */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <motion.div 
          animate={{ rotate: [45, 90, 45] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 border-2 border-white" 
        />
        <motion.div 
          animate={{ rotate: [-12, -45, -12] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 right-32 w-24 h-24 border-2 border-white" 
        />
        <motion.div 
          animate={{ rotate: [12, 60, 12] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/3 w-28 h-28 border-2 border-white" 
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
        <div className="text-center text-white">
          {/* Badge - Desktop Only */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="hidden md:inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8"
          >
            <Package className="w-5 h-5" />
            <span className="font-medium">{t("productHero.completeProductRange")}</span>
          </motion.div>

          {/* Main Heading - Desktop Only */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="hidden md:block text-5xl md:text-6xl font-black mb-6 leading-tight"
          >
            {t("productHero.premiumGlass")}
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mt-2">
              {t("productHero.manufacturing")}
            </span>
          </motion.h1>

          {/* Description - Desktop Only */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="hidden md:block text-xl md:text-2xl text-blue-100 mb-16 max-w-4xl mx-auto leading-relaxed font-light"
          >
            {t("productHero.description")}
          </motion.p>

          {/* Features Grid - Optimized Mobile Fit */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto py-4 md:py-0"
          >
            {[
              { icon: Award, color: "text-blue-400", title: t("productHero.iso9001Certified"), desc: t("productHero.iso9001Description") },
              { icon: Globe, color: "text-green-400", title: t("productHero.internationalStandards"), desc: t("productHero.internationalStandardsDescription") },
              { icon: Package, color: "text-purple-400", title: t("productHero.customSolutions"), desc: t("productHero.customSolutionsDescription") }
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center group">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-500 border border-white/10 group-hover:border-white/20">
                  <feature.icon className={`w-8 h-8 md:w-8 md:h-8 ${feature.color}`} />
                </div>
                <h3 className="text-lg md:text-lg font-bold mb-1.5 md:mb-2">{feature.title}</h3>
                <p className="text-blue-200/70 text-[11px] md:text-sm max-w-[250px] mx-auto leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Minimalist for Mobile */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}