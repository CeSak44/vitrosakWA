import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

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

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#05101c_0%,#0a1e37_100%)] py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(70,146,255,0.16),transparent_24%),linear-gradient(to_right,rgba(173,215,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(173,215,255,0.035)_1px,transparent_1px)] [background-size:auto,68px_68px,68px_68px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(115,177,255,0.2)] bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#7dc3ff]">
            <span className="h-2 w-2 rounded-full bg-[#2378ff] shadow-[0_0_18px_rgba(35,120,255,0.85)]" />
            NOTRE HISTOIRE
          </div>


          <p className="mt-5 text-lg leading-8 text-[#A3B1C6]">
            {t("history.title")}
          </p>
        </div>

        <div className="mt-16">
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
                    <button
                      key={milestone.year}
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                      className="group relative flex flex-col items-center text-center"
                    >
                      {/* Fixed-height year label: 30px so dot center lands exactly on the line at top-10 (40px) */}
                      <div className="flex items-end justify-center h-[30px]">
                        <span className="text-sm font-semibold tracking-[-0.02em] text-[#7dc3ff]">
                          {milestone.year}
                        </span>
                      </div>

                      {/* Dot: h-5 (20px) → top at 30px, center at 40px = on the line */}
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
                        <p className="text-xs leading-5 text-[#A3B1C6] text-center">{milestone.text}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:hidden relative">
            <div className="absolute left-9 top-8 bottom-8 w-px bg-[linear-gradient(180deg,rgba(115,177,255,0.15),rgba(115,177,255,0.7),rgba(115,177,255,0.15))]" />
            {milestones.map((milestone, index) => {
              const isCurrent = index === activeIndex;

              return (
                <button
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
                    <p className="mt-3 text-sm leading-6 text-[#A3B1C6]">{milestone.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
