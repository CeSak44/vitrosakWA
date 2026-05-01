import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Stagger container variant
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

// Item variant for staggered children
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

export default function HistoryTimeline() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const milestones = useMemo(
    () => [
      { year: "2004", text: t("history.events.2004") },
      { year: "2010", text: t("history.events.2010") },
      { year: "2014", text: t("history.events.2014") },
      { year: "2015", text: t("history.events.2015") },
      { year: "2017", text: t("history.events.2017") },
      { year: "2020", text: t("history.events.2020") },
      { year: "2023", text: t("history.events.2023") },
      { year: "2025", text: t("history.events.2025") },
      { year: "2026", text: t("history.events.2026") },
    ],
    [t]
  );

  const HighlightText = ({ text }) => {
    if (!text) return null;
    const parts = text.split(/\[(.*?)\]/g);
    return (
      <>
        {parts.map((part, i) => 
          i % 2 === 1 ? (
            <span key={i} className="font-bold bg-gradient-to-r from-blue-400 to-cyan-200 bg-clip-text text-transparent">
              {part}
            </span>
          ) : part
        )}
      </>
    );
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#05101c_0%,#0a1e37_100%)] pt-40 pb-20 text-white">
      {/* Background Pattern - Animated like ProductHero */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(70,146,255,0.16),transparent_24%),linear-gradient(to_right,rgba(173,215,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(173,215,255,0.035)_1px,transparent_1px)] [background-size:auto,68px_68px,68px_68px]" />
        
        {/* Animated Shapes from ProductHero pattern */}
        <motion.div 
          animate={{ rotate: [45, 90, 45] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 border-2 border-white opacity-20" 
        />
        <motion.div 
          animate={{ rotate: [-12, -45, -12] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 right-32 w-24 h-24 border-2 border-white opacity-20" 
        />
        <motion.div 
          animate={{ rotate: [12, 60, 12] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/3 w-28 h-28 border-2 border-white opacity-20" 
        />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(115,177,255,0.2)] bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#7dc3ff]"
          >
            <span className="h-2 w-2 rounded-full bg-[#2378ff] shadow-[0_0_18px_rgba(35,120,255,0.85)]" />
            NOTRE HISTOIRE
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-5 text-lg leading-8 text-[#A3B1C6]"
          >
            {t("history.title")}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute left-0 right-0 top-10 h-px bg-[linear-gradient(90deg,rgba(115,177,255,0.08),rgba(115,177,255,0.65),rgba(115,177,255,0.08))]" />
              <div
                className="absolute left-0 top-10 h-px bg-[linear-gradient(90deg,#2378ff,#7dc3ff)] transition-all duration-500"
                style={{ width: `${((2 * activeIndex + 1) / (milestones.length * 2)) * 100}%` }}
              />

              <div className="grid grid-cols-9 gap-4">
                {milestones.map((milestone, index) => {
                  const isActive = index <= activeIndex;
                  const isCurrent = index === activeIndex;

                  return (
                    <motion.button
                      variants={itemVariants}
                      key={milestone.year}
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                      className="group relative flex flex-col items-center text-center"
                    >
                      <div className="flex items-end justify-center h-[30px]">
                        <span className="text-sm font-semibold tracking-[-0.02em] text-[#7dc3ff]">
                          {milestone.year}
                        </span>
                      </div>

                      <div
                        className={`relative z-10 h-5 w-5 rounded-full border-2 transition-all duration-300 ${
                          isCurrent
                            ? "scale-125 border-[#cfe7ff] bg-[#2378ff] shadow-[0_0_26px_rgba(35,120,255,0.8)]"
                            : isActive
                              ? "border-[#8fc0ff] bg-[#2378ff] shadow-[0_0_14px_rgba(35,120,255,0.55)]"
                              : "border-[rgba(115,177,255,0.45)] bg-[#061625] shadow-[0_0_10px_rgba(35,120,255,0.2)] group-hover:bg-[#2378ff] group-hover:border-[#8fc0ff] group-hover:shadow-[0_0_18px_rgba(35,120,255,0.65)]"
                        }`}
                      />

                      <div className="mt-8 w-full min-h-[136px] rounded-[24px] border border-[rgba(115,177,255,0.18)] bg-white/5 p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[rgba(115,177,255,0.4)] group-hover:bg-white/10">
                        <div className="text-xs leading-5 text-[#A3B1C6] text-center">
                          <HighlightText text={milestone.text} />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="space-y-4 lg:hidden relative">
            <div className="absolute left-9 top-8 bottom-8 w-px bg-[linear-gradient(180deg,rgba(115,177,255,0.15),rgba(115,177,255,0.7),rgba(115,177,255,0.15))]" />
            {milestones.map((milestone, index) => {
              const isCurrent = index === activeIndex;

              return (
                <motion.button
                  variants={itemVariants}
                  key={milestone.year}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex w-full gap-4 rounded-[24px] border p-5 text-left transition-all duration-300 ${isCurrent
                      ? "border-[rgba(115,177,255,0.55)] bg-white/10 shadow-[0_12px_36px_rgba(4,16,30,0.2)]"
                      : "border-[rgba(115,177,255,0.16)] bg-white/5"
                    }`}
                >
                  <div className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(115,177,255,0.35)] bg-[#081a30]">
                    <span
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${isCurrent ? "bg-[#2378ff] shadow-[0_0_16px_rgba(35,120,255,0.7)]" : "bg-[rgba(115,177,255,0.25)]"
                        }`}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-[-0.04em] text-white">{milestone.year}</p>
                    <div className="mt-3 text-sm leading-6 text-[#A3B1C6]">
                      <HighlightText text={milestone.text} />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
