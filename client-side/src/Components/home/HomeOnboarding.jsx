import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  Factory,
  Globe2,
  Handshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";

import { createPageUrl } from "../../utils";
import ProgressiveImage from "../shared/ProgressiveImage";

const AUTO_DELAY = 5200;
const SWIPE_THRESHOLD = 42;

function SlideHeading({ active, eyebrow, title, subtitle, body }) {
  return (
    <div className={`vitro-stagger max-w-2xl ${active ? "is-active" : ""}`}>
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--vitro-line)] bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--vitro-blue-ice)]">
        <span className="h-2 w-2 rounded-full bg-[var(--vitro-blue)] shadow-[0_0_18px_rgba(35,120,255,0.85)]" />
        {eyebrow}
      </div>
      <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 max-w-xl text-lg font-medium text-[var(--vitro-blue-soft)] sm:text-xl">
          {subtitle}
        </p>
      ) : null}
      <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--vitro-text-muted)] sm:text-lg">
        {body}
      </p>
    </div>
  );
}

function StatChip({ icon: Icon, label, value }) {
  return (
    <div className="vitro-cut rounded-2xl border border-[var(--vitro-line)] bg-white/6 px-4 py-4 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(35,120,255,0.18)] text-[var(--vitro-blue-ice)]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--vitro-text-muted)]">{label}</p>
          <p className="mt-1 text-lg font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, featured = false }) {
  const Icon = product.icon;

  return (
    <article
      className={`group relative overflow-hidden rounded-[28px] border border-[rgba(35,120,255,0.16)] bg-[var(--vitro-card)] text-slate-900 shadow-[var(--vitro-shadow-soft)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(7,29,57,0.24)] ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1b61d1] via-[#58adff] to-[#dff1ff]" />
      <div className="grid h-full gap-0 md:grid-cols-[1.1fr_1fr]">
        <ProgressiveImage
          src={product.images[0]}
          alt={product.title}
          className="h-48 md:h-full"
          imgClassName="group-hover:scale-105"
          overlayClassName="bg-gradient-to-br from-[#dff1ff]/40 via-[#4ea4ff]/16 to-[#0a1630]/35"
        />

        <div className="flex flex-col justify-between p-5 sm:p-6">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#8ebcf5] bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#144789]">
              <Icon className="h-4 w-4" />
              {product.tag}
            </div>

            <h3 className="max-w-md text-xl font-semibold tracking-[-0.03em] text-slate-900">
              {product.title}
            </h3>

            {product.description ? (
              <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
            ) : null}

            {product.types?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {product.types.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-[#90bdf6] bg-[#f6fbff] px-3 py-1 text-xs font-semibold text-[#0f4d99]"
                  >
                    {type}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {product.applicationsLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.uses.map((use) => (
                <span
                  key={use}
                  className="rounded-full bg-[#cfe6ff] px-3 py-1 text-xs font-medium text-slate-700 transition-colors duration-300 group-hover:bg-[#b7daff]"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function HomeOnboarding() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartRef = useRef(null);

  const products = useMemo(
    () => [
      {
        icon: Building2,
        tag: "01",
        title: t("home.products.temperedGlass"),
        description: t("home.products.availableFlatCurved"),
        types: [t("home.products.flatTempered"), t("home.products.curvedTempered")],
        uses: [
          t("home.products.shopfronts"),
          t("home.products.showerEnclosures"),
          t("home.products.staircases"),
          t("home.products.balustrades"),
        ],
        images: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/1ff7773c8_flatTempered.jpeg",
        ],
        applicationsLabel: t("home.products.applications"),
      },
      {
        icon: Sparkles,
        tag: "02",
        title: t("home.products.glazingGlass"),
        description: t("home.products.availableDoubleTriple"),
        types: [t("home.products.doubleGlazing"), t("home.products.tripleGlazing")],
        uses: [
          t("home.products.buildingFacades"),
          t("home.products.energyEfficiency"),
          t("home.products.noiseReduction"),
          t("home.products.highPerformanceBuildings"),
        ],
        images: ["/Curtain Wall/photo_2025-11-14 18.21.50.jpeg"],
        applicationsLabel: t("home.products.applications"),
      },
      {
        icon: ShieldCheck,
        tag: "03",
        title: t("home.products.laminatedGlass"),
        uses: [
          t("home.products.hotels"),
          t("home.products.bankCounters"),
          t("home.products.skylights"),
          t("home.products.glassFlooring"),
        ],
        images: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/3c45f20d6_laminated.jpg",
        ],
        applicationsLabel: t("home.products.applications"),
      },
      {
        icon: Factory,
        tag: "04",
        title: t("home.products.busesHeavyMachinery"),
        uses: [
          t("home.products.buses"),
          t("home.products.heavyConstructionMachinery"),
          t("home.products.largeVehicleWindshields"),
          t("home.products.industrialApplications"),
        ],
        images: ["/Trucks/Bus3.jpeg"],
        applicationsLabel: t("home.products.applications"),
      },
      {
        icon: Wrench,
        tag: "05",
        title: t("home.products.homeAppliances"),
        uses: [
          t("home.products.refrigerators"),
          t("home.products.ovens"),
          t("home.products.cooktops"),
          t("home.products.householdEquipment"),
        ],
        images: [
          "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/613370cf2_four1.png",
        ],
        applicationsLabel: t("home.products.applications"),
      },
    ],
    [t]
  );

  const partners = useMemo(
    () => [
      {
        name: "Atlas",
        logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/96a2c37ad_atlas.jpg",
      },
      {
        name: "Iris",
        logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/4fbb41f86_Iris.png",
      },
      {
        name: "EPE TVE",
        logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/098dd9844_epeTVE.png",
      },
      {
        name: "Dima Froid",
        logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/6b8402086_LogoDimaFroid.png",
      },
      {
        name: "Simafe",
        logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/8ff9d1ca1_simafe1.png",
      },
    ],
    []
  );

  const slides = useMemo(
    () => [
      {
        id: "hero",
        label: "01",
        render: (active) => (
          <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
            <div className="absolute inset-0">
              <ProgressiveImage
                src="/fasade.jpeg"
                alt="Vitrosak glass transformation"
                className="h-full w-full"
                imgClassName="object-cover object-center"
                overlayClassName="bg-gradient-to-r from-[#02101f]/92 via-[#082546]/82 to-[#164d82]/36"
              />
            </div>
            <div className="vitro-grid absolute inset-0 opacity-40" />
            <div className="absolute inset-y-0 right-[9%] hidden w-[18vw] bg-[linear-gradient(180deg,rgba(49,133,255,0.8),rgba(49,133,255,0))] opacity-35 [clip-path:polygon(28%_0,100%_0,72%_100%,0_100%)] lg:block" />
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-[linear-gradient(90deg,transparent_0,rgba(76,164,255,0.2)_40%,transparent_100%)] [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)]" />

            <div className="relative z-10 grid w-full items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <SlideHeading
                  active={active}
                  eyebrow={t("home.productCatalog.sinceLine")}
                  title={t("home.hero.title1")}
                  subtitle={t("home.hero.subtitle1")}
                  body={t("home.hero.subtitle2")}
                />

                <div className={`vitro-stagger mt-8 flex flex-col gap-4 sm:flex-row ${active ? "is-active" : ""}`}>
                  <Link
                    to={createPageUrl("Products")}
                    className="vitro-cut inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--vitro-blue)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1b61d1]"
                  >
                    {t("home.hero.exploreProducts")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to={createPageUrl("Gallery")}
                    className="vitro-cut inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--vitro-line-strong)] bg-white/6 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--vitro-blue-ice)] transition hover:bg-white/10"
                  >
                    {t("home.hero.viewProjects")}
                    <Workflow className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <StatChip icon={Award} label={t("companyOverview.established")} value="2004" />
                <StatChip icon={MapPin} label={t("companyOverview.location")} value="Sétif, Algeria" />
                <StatChip icon={Factory} label={t("companyOverview.facilitySize")} value="15,000m²" />
                <StatChip icon={Building2} label={t("companyOverview.productionArea")} value="4,500m²" />
              </div>
            </div>
          </section>
        ),
      },
      {
        id: "company",
        label: "02",
        render: (active) => (
          <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.16),transparent_25%),linear-gradient(160deg,#081524_0%,#0b223f_42%,#06121f_100%)]" />
            <div className="absolute right-0 top-0 hidden h-full w-[28%] border-l border-[var(--vitro-line)] bg-[linear-gradient(180deg,rgba(33,120,255,0.18),rgba(7,16,28,0))] [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)] lg:block" />

            <div className="relative z-10 grid w-full gap-12 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex items-center">
                <ProgressiveImage
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/fbacec0a2_photo_2025-11-07201258.jpeg"
                  alt="Vitrosak facility"
                  className="vitro-cut-lg h-[440px] w-full rounded-[32px] border border-[var(--vitro-line)] shadow-[var(--vitro-shadow)]"
                  imgClassName="object-cover object-center"
                  overlayClassName="bg-gradient-to-tr from-[#02101f]/55 via-transparent to-[#5fc4ff]/20"
                />
              </div>

              <div className="flex items-center">
                <div className="w-full">
                  <SlideHeading
                    active={active}
                    eyebrow={t("companyOverview.aboutVitrosak")}
                    title={`${t("companyOverview.leadingGlass")} ${t("companyOverview.excellenceInAlgeria")}`}
                    body={`${t("companyOverview.description1")} ${t("companyOverview.description2")}`}
                  />

                  <div className={`vitro-stagger mt-8 grid gap-4 sm:grid-cols-2 ${active ? "is-active" : ""}`}>
                    <div className="vitro-cut rounded-2xl border border-[var(--vitro-line)] bg-white/6 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--vitro-text-muted)]">ISO</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{t("about.iso9001")}:2015</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--vitro-text-muted)]">{t("about.qualityCommitment")}</p>
                    </div>
                    <div className="vitro-cut rounded-2xl border border-[var(--vitro-line)] bg-white/6 p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-[var(--vitro-text-muted)]">{t("stats.byTheNumbers")}</p>
                      <p className="mt-3 text-2xl font-semibold text-white">3 {t("stats.countries")}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--vitro-text-muted)]">{t("internationalReach.description")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ),
      },
      {
        id: "products",
        label: "03",
        render: (active) => (
          <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#061220_0%,#0a1b30_100%)]" />
            <div className="absolute left-[8%] top-10 h-32 w-32 rotate-12 border border-[var(--vitro-line)]" />
            <div className="absolute bottom-10 right-[12%] h-20 w-56 bg-[linear-gradient(90deg,rgba(35,120,255,0),rgba(35,120,255,0.28),rgba(35,120,255,0))]" />

            <div className="relative z-10 w-full">
              <SlideHeading
                active={active}
                eyebrow={t("home.productCatalog.badge")}
                title={t("home.productCatalog.sectionTitle")}
                body={t("home.productCatalog.intro")}
              />

              <div className="mt-10 grid gap-5 lg:grid-cols-6">
                {products.map((product, index) => (
                  <div
                    key={product.title}
                    className={
                      index < 3
                        ? "lg:col-span-2"
                        : index === 3
                        ? "lg:col-span-3"
                        : "lg:col-span-3"
                    }
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to={createPageUrl("Products")}
                  className="vitro-cut inline-flex items-center gap-2 rounded-2xl border border-[var(--vitro-line-strong)] bg-white/6 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--vitro-blue-ice)] transition hover:bg-white/10"
                >
                  {t("home.products.viewCompleteRange")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        ),
      },
      {
        id: "reach",
        label: "04",
        render: (active) => (
          <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right_top,rgba(77,164,255,0.16),transparent_26%),linear-gradient(160deg,#08101c_0%,#091e38_55%,#05101c_100%)]" />

            <div className="relative z-10 grid w-full gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex items-center">
                <div className="w-full">
                  <SlideHeading
                    active={active}
                    eyebrow={t("internationalReach.marketPresence")}
                    title={`${t("internationalReach.nationalAndInternational")} ${t("internationalReach.presence")}`}
                    body={t("internationalReach.description")}
                  />

                  <div className={`vitro-stagger mt-8 grid gap-4 sm:grid-cols-2 ${active ? "is-active" : ""}`}>
                    {[
                      { icon: MapPin, title: t("internationalReach.setifAlgeria"), subtitle: t("internationalReach.headquartersProduction") },
                      { icon: Building2, title: t("internationalReach.birElDjirOran"), subtitle: t("internationalReach.showroomCommercial") },
                      { icon: Globe2, title: t("internationalReach.tunisia"), subtitle: t("internationalReach.exportMarket") },
                      { icon: Globe2, title: t("internationalReach.mauritania"), subtitle: t("internationalReach.exportMarket") },
                    ].map((item) => (
                      <div key={item.title} className="vitro-cut rounded-2xl border border-[var(--vitro-line)] bg-white/6 p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(35,120,255,0.16)] text-[var(--vitro-blue-ice)]">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{item.title}</p>
                            <p className="text-xs uppercase tracking-[0.18em] text-[var(--vitro-text-muted)]">{item.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="vitro-panel vitro-cut-lg relative w-full rounded-[32px] p-8">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(35,120,255,0.12),transparent_48%,rgba(216,236,255,0.06)_100%)]" />
                  <div className="relative">
                    <p className="text-xs uppercase tracking-[0.28em] text-[var(--vitro-text-muted)]">{t("about.qualityAssurance")}</p>
                    <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                      {t("about.qualityManagementSystem")}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-7 text-[var(--vitro-text-muted)]">
                      {t("about.qualitySystemDescription")}
                    </p>

                    <div className="mt-8 space-y-3">
                      {[t("about.qualityFeatures.qms.title"), t("about.qualityFeatures.customerRequirements.title"), t("about.qualityFeatures.regulatoryCompliance.title"), t("about.qualityFeatures.continuousImprovement.title")].map(
                        (item, index) => (
                          <div
                            key={item}
                            className="flex items-center justify-between border-b border-[var(--vitro-line)] py-3 text-sm text-[var(--vitro-blue-ice)]"
                          >
                            <span className="font-medium">{item}</span>
                            <span className="text-xs uppercase tracking-[0.18em] text-[var(--vitro-text-muted)]">
                              0{index + 1}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ),
      },
      {
        id: "partners",
        label: "05",
        render: (active) => (
          <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#04101e_0%,#081b33_50%,#05111f_100%)]" />
            <div className="absolute right-0 top-0 h-full w-[18%] bg-[linear-gradient(180deg,rgba(35,120,255,0.24),rgba(35,120,255,0))] [clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]" />

            <div className="relative z-10 grid w-full gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="flex items-center">
                <div className="w-full">
                  <SlideHeading
                    active={active}
                    eyebrow={t("partners.strategicPartnerships")}
                    title={t("partners.trustedByLeaders")}
                    body={t("partners.description")}
                  />

                  <div className={`vitro-stagger mt-8 ${active ? "is-active" : ""}`}>
                    <Link
                      to={createPageUrl("About")}
                      className="vitro-cut inline-flex items-center gap-2 rounded-2xl bg-[var(--vitro-blue)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1b61d1]"
                    >
                      {t("nav.about")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="group vitro-cut rounded-[28px] border border-[var(--vitro-line)] bg-white/8 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[var(--vitro-line-strong)]"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(35,120,255,0.16)] text-[var(--vitro-blue-ice)]">
                      <Handshake className="h-5 w-5" />
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-[var(--vitro-shadow-soft)]">
                      <img src={partner.logo} alt={partner.name} className="h-24 w-full object-contain" />
                    </div>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--vitro-blue-ice)]">
                      {partner.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ),
      },
    ],
    [partners, products, t]
  );

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTO_DELAY);

    return () => window.clearInterval(interval);
  }, [isPaused, slides.length]);

  const goToSlide = (index) => {
    const normalized = (index + slides.length) % slides.length;
    setCurrentSlide(normalized);
  };

  const handleTouchStart = (event) => {
    touchStartRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartRef.current == null) {
      return;
    }

    const delta = event.changedTouches[0]?.clientX - touchStartRef.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      goToSlide(delta < 0 ? currentSlide + 1 : currentSlide - 1);
    }
    touchStartRef.current = null;
  };

  return (
    <div
      className="vitro-shell relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 vitro-grid opacity-30" />
      <div className="relative">
        <div className="vitro-section-separator relative overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={slide.id} className="min-w-full shrink-0">
                {slide.render(index === currentSlide)}
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 justify-between px-6 lg:flex">
          <button
            type="button"
            onClick={() => goToSlide(currentSlide - 1)}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--vitro-line)] bg-[#061221]/80 text-white backdrop-blur transition hover:border-[var(--vitro-line-strong)] hover:bg-[#0f2745]"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goToSlide(currentSlide + 1)}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--vitro-line)] bg-[#061221]/80 text-white backdrop-blur transition hover:border-[var(--vitro-line-strong)] hover:bg-[#0f2745]"
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[var(--vitro-line)] bg-[#061221]/72 px-4 py-2 backdrop-blur">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`group flex items-center gap-2 rounded-full px-2 py-1 transition ${
                index === currentSlide ? "text-white" : "text-[var(--vitro-text-muted)]"
              }`}
            >
              <span
                className={`block h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-9 bg-[var(--vitro-blue)]" : "w-2.5 bg-white/35 group-hover:bg-white/55"
                }`}
              />
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] sm:block">
                {slide.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
