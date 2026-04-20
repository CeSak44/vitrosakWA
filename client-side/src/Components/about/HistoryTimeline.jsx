import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function HistoryTimeline() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const milestones = useMemo(
    () => [
      { year: "2004", text: t("about.history.milestones.2004") },
      { year: "2010", text: t("about.history.milestones.2010") },
      { year: "2014", text: t("about.history.milestones.2014") },
      { year: "2015", text: t("about.history.milestones.2015") },
      { year: "2017", text: t("about.history.milestones.2017") },
      { year: "2020", text: t("about.history.milestones.2020") },
      { year: "2023", text: t("about.history.milestones.2023") },
      { year: "2025", text: t("about.history.milestones.2025") },
      { year: "2026", text: t("about.history.milestones.2026") },
    ],
    [t]
  );

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#05101c_0%,#0a1e37_100%)] py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(70,146,255,0.16),transparent_24%),linear-gradient(to_right,rgba(173,215,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(173,215,255,0.035)_1px,transparent_1px)] [background-size:auto,68px_68px,68px_68px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(115,177,255,0.2)] bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--vitro-blue-ice)]">
            <span className="h-2 w-2 rounded-full bg-[var(--vitro-blue)] shadow-[0_0_18px_rgba(35,120,255,0.85)]" />
            {t("about.history.badge")}
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            {t("about.history.title")}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--vitro-text-muted)]">
            {t("about.history.intro")}
          </p>
        </div>

        <div className="mt-16">
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute left-0 right-0 top-10 h-px bg-[linear-gradient(90deg,rgba(115,177,255,0.08),rgba(115,177,255,0.65),rgba(115,177,255,0.08))]" />
              <div
                className="absolute left-0 top-10 h-px bg-[linear-gradient(90deg,#2378ff,#7dc3ff)] transition-all duration-500"
                style={{ width: `${(activeIndex / (milestones.length - 1)) * 100}%` }}
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
                      className="group relative pt-1 text-left"
                    >
                      <div className="mb-6">
                        <span className="text-xs uppercase tracking-[0.24em] text-[var(--vitro-text-muted)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div
                        className={`relative z-10 h-5 w-5 rounded-full border transition-all duration-300 ${
                          isCurrent
                            ? "scale-125 border-[#cfe7ff] bg-[#2378ff] shadow-[0_0_26px_rgba(35,120,255,0.75)]"
                            : isActive
                            ? "border-[#8fc0ff] bg-[#2378ff]"
                            : "border-[rgba(115,177,255,0.35)] bg-[#081a30]"
                        }`}
                      />

                      <div className="mt-8 min-h-[136px] rounded-[24px] border border-[rgba(115,177,255,0.18)] bg-white/6 p-4 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[rgba(115,177,255,0.4)] group-hover:bg-white/10">
                        <p className="text-2xl font-semibold tracking-[-0.04em] text-white">{milestone.year}</p>
                        <p className="mt-3 text-sm leading-6 text-[var(--vitro-text-muted)]">{milestone.text}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:hidden">
            <div className="absolute left-8 top-[16.5rem] bottom-10 w-px bg-[linear-gradient(180deg,rgba(115,177,255,0.15),rgba(115,177,255,0.7),rgba(115,177,255,0.15))]" />
            {milestones.map((milestone, index) => {
              const isCurrent = index === activeIndex;

              return (
                <button
                  key={milestone.year}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative flex w-full gap-4 rounded-[24px] border p-5 text-left transition-all duration-300 ${
                    isCurrent
                      ? "border-[rgba(115,177,255,0.55)] bg-white/10 shadow-[0_12px_36px_rgba(4,16,30,0.2)]"
                      : "border-[rgba(115,177,255,0.16)] bg-white/5"
                  }`}
                >
                  <div className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(115,177,255,0.35)] bg-[#081a30]">
                    <span
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        isCurrent ? "bg-[#2378ff] shadow-[0_0_16px_rgba(35,120,255,0.7)]" : "bg-[rgba(115,177,255,0.25)]"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-[-0.04em] text-white">{milestone.year}</p>
                    <p className="mt-3 text-sm leading-6 text-[var(--vitro-text-muted)]">{milestone.text}</p>
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
