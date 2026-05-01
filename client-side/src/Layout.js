import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { createPageUrl } from "./utils";
import { Mail, MapPin, ChevronDown, Menu, X, Download } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedFooterCol, setExpandedFooterCol] = useState(null);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollY = e?.detail?.scrollY ?? window.scrollY;
      setIsScrolled(scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('appScroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('appScroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false);
  };

  const hideLanguageTimer = useRef(null);

  const showLanguage = () => {
    if (hideLanguageTimer.current) {
      clearTimeout(hideLanguageTimer.current);
      hideLanguageTimer.current = null;
    }
    setShowLanguageDropdown(true);
  };

  const hideLanguageWithDelay = (delay = 400) => {
    if (hideLanguageTimer.current) clearTimeout(hideLanguageTimer.current);
    hideLanguageTimer.current = setTimeout(() => {
      setShowLanguageDropdown(false);
      hideLanguageTimer.current = null;
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (hideLanguageTimer.current) {
        clearTimeout(hideLanguageTimer.current);
        hideLanguageTimer.current = null;
      }
    };
  }, []);

  const languages = [
    { code: "fr", name: "Français", flag: "🇫🇷", flagUrl: "https://flagcdn.com/w40/fr.png" },
    { code: "en", name: "English", flag: "🇬🇧", flagUrl: "https://flagcdn.com/w40/gb.png" },
    { code: "zh", name: "中文", flag: "🇨🇳", flagUrl: "https://flagcdn.com/w40/cn.png" }
  ];

  const navigationItems = [
    { title: t("nav.home"), url: createPageUrl("Home") },
    { title: t("nav.products"), url: createPageUrl("Products") },
    { title: t("nav.about"), url: createPageUrl("About") },
    { title: t("nav.gallery"), url: createPageUrl("Gallery") },
  ];

  const activeLanguage =
    languages.find((l) => i18n.language === l.code || i18n.language?.startsWith(l.code)) || languages[1];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#113154]/80 backdrop-blur-md shadow-lg" : "bg-transparent pt-4"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "h-20" : "h-24"}`}>
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center">
              <img
                src="/vitrosak/logo%20svg/logo-nav-bar-new.svg"
                alt="VITROSAK"
                className="h-10 md:h-12 w-auto object-contain filter brightness-0 invert"
              />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 -mr-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center font-industry">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`group relative px-2 py-2 transition-colors duration-300 font-medium tracking-wide ${location.pathname === item.url
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                    }`}
                >
                  {item.title}
                  {location.pathname === item.url && (
                    <motion.div
                      layoutId="desktop-nav-indicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {location.pathname !== item.url && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  )}
                </Link>
              ))}

              {/* Contact Us Button with Dropdown */}
              <div className="relative font-industry">
                <button
                  onClick={() => setShowContactDropdown(!showContactDropdown)}
                  onMouseEnter={() => setShowContactDropdown(true)}
                  onMouseLeave={() => setShowContactDropdown(false)}
                  className="group flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 font-medium text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/64d3715dd_contactsSVG.png"
                    alt="Contact"
                    className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity filter brightness-0 invert"
                  />
                  <span>{t("nav.contactUs")}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showContactDropdown ? "rotate-180" : ""}`} />
                </button>

                {showContactDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-96 bg-white/95 backdrop-blur-md rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-brand-steel/10 p-6 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-200"
                    onMouseEnter={() => setShowContactDropdown(true)}
                    onMouseLeave={() => setShowContactDropdown(false)}
                  >
                    <div className="space-y-6">
                      {/* Guedjel, Sétif */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">{t("contact.guedjelSetif")}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                            <a
                              href="https://maps.google.com/?q=75+route+de+batna+ouled+boudhil+guedjel+Setif+Algeria"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-blue-600 hover:text-blue-700 underline"
                            >
                              {t("contact.viewOnGoogleMaps")}
                            </a>
                          </div>
                          <p className="pl-6 text-xs text-gray-500">{t("contact.address")}</p>
                          <div className="flex items-start space-x-2">
                            <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                            <a href="mailto:marketing@vitrosak.com" className="text-gray-700 hover:text-blue-600">
                              marketing@vitrosak.com
                            </a>
                          </div>
                          <div className="pl-6 space-y-1 text-gray-700">
                            <p>+213 675 005 111</p>
                            <p>+213 671 888 343</p>
                            <p>+213 663 424 774</p>
                            <p>+213 560 535 168</p>
                          </div>
                        </div>
                      </div>

                      {/* Bir El Djir, Oran */}
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">{t("contact.birElDjirOran")}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                            <a
                              href="https://maps.app.goo.gl/WHHhDCVRCyxAoy4f9"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-blue-600 hover:text-blue-700 underline"
                            >
                              {t("contact.viewOnGoogleMaps")}
                            </a>
                          </div>
                          <p className="pl-6 text-xs text-gray-500">{t("contact.showroom")}</p>
                          <div className="pl-6 text-gray-700">
                            <p>+213 697 888 680</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Language Dropdown */}
              <div className="relative font-industry">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  onMouseEnter={showLanguage}
                  onMouseLeave={() => hideLanguageWithDelay()}
                  className="group flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 font-medium text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    {activeLanguage.flagUrl ? (
                      <img src={activeLanguage.flagUrl} alt={`${activeLanguage.name} flag`} className="w-5 h-3 object-cover rounded-sm" />
                    ) : (
                      <span className="text-base">{activeLanguage.flag}</span>
                    )}
                    <span className="hidden sm:inline">{activeLanguage.name}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showLanguageDropdown ? "rotate-180" : ""}`} />
                </button>

                {showLanguageDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-brand-steel/10 py-2 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-200"
                    onMouseEnter={showLanguage}
                    onMouseLeave={() => hideLanguageWithDelay()}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${i18n.language === lang.code ? "bg-blue-50 text-blue-700" : "text-gray-700"
                          }`}
                      >
                        <span className="flex items-center gap-3">
                          <span>{lang.name}</span>
                        </span>
                        {lang.flagUrl ? (
                          <img src={lang.flagUrl} alt={`${lang.code} flag`} className="w-6 h-4 object-cover rounded-sm" />
                        ) : (
                          <span className="text-xl">{lang.flag}</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-navy/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-50 md:hidden flex flex-col font-industry"
            >
              <div className="flex justify-between items-center p-6 border-b border-brand-steel/10">
                <img
                  src="/vitrosak/logo%20svg/logo-nav-bar-new.svg"
                  alt="VITROSAK"
                  className="h-8 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-brand-navy hover:bg-brand-light/50 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors ${location.pathname === item.url
                        ? "text-brand-blue"
                        : "text-brand-navy hover:text-brand-blue"
                        }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                <div className="h-px bg-brand-steel/10 w-full" />

                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-brand-steel uppercase tracking-wider">
                    {t("nav.language", "Language")}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${i18n.language === lang.code
                          ? "border-brand-blue bg-brand-light/50 text-brand-blue"
                          : "border-brand-steel/20 text-brand-navy hover:bg-brand-light/30"
                          }`}
                      >
                        {lang.flagUrl ? (
                          <img src={lang.flagUrl} alt={`${lang.name} flag`} className="w-5 h-3 object-cover rounded-sm" />
                        ) : (
                          <span className="text-sm">{lang.flag}</span>
                        )}
                        <span className="text-sm font-medium">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-brand-steel/10 w-full" />

                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-brand-steel uppercase tracking-wider">
                    {t("nav.contactUs")}
                  </h3>
                  <a href="mailto:marketing@vitrosak.com" className="flex items-center gap-3 text-brand-navy hover:text-brand-blue transition-colors">
                    <Mail className="w-5 h-5 text-brand-blue" />
                    <span className="text-sm font-medium">marketing@vitrosak.com</span>
                  </a>
                  <a href="https://maps.google.com/?q=75+route+de+batna+ouled+boudhil+guedjel+Setif+Algeria" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-brand-navy hover:text-brand-blue transition-colors">
                    <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{t("contact.guedjelSetif")}</span>
                      <span className="text-xs opacity-70">{t("contact.viewOnGoogleMaps")}</span>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#123154] text-white font-industry">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12">
            {/* Column 1: Logo & CTA */}
            <div className="flex flex-col items-center md:items-start gap-4 md:gap-8">
              <img
                src="/vitrosak/logo%20svg/footer-logo.svg"
                alt="VITROSAK"
                className="h-16 md:h-24 w-auto object-contain"
              />
              <p className="text-white/70 text-xs md:text-sm leading-relaxed max-w-xs text-center md:text-left">
                {t("footer.description")}
              </p>
              <a 
                href="/catalogue accessoire fini_251109_152122.pdf" 
                download
                className="inline-flex items-center gap-3 bg-[#2378ff] hover:bg-[#1a5bbd] text-white px-4 py-2.5 rounded-xl transition-all duration-300 font-semibold text-sm w-fit group shadow-lg shadow-blue-900/20 whitespace-nowrap"
              >
                <div className="bg-white/20 p-1 rounded-md">
                  <Download className="w-5 h-5" />
                </div>
                <span>Download Product catalogue</span>
              </a>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h4 className="text-xl font-bold mb-8 uppercase tracking-wider hidden md:block">Navigation</h4>
              <button 
                className="flex md:hidden w-full items-center justify-between py-2 border-b border-white/10"
                onClick={() => setExpandedFooterCol(expandedFooterCol === 'nav' ? null : 'nav')}
              >
                <span className="text-lg font-bold uppercase tracking-wider">Navigation</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${expandedFooterCol === 'nav' ? 'rotate-180' : ''}`} />
              </button>
              
              <div className={`${expandedFooterCol === 'nav' ? 'block' : 'hidden'} md:block transition-all duration-300`}>
                <nav className="flex flex-col gap-5 py-2 md:py-0">
                  {navigationItems.map((item) => (
                    <Link 
                      key={item.title} 
                      to={item.url}
                      className="text-white hover:text-blue-400 transition-colors underline underline-offset-8 decoration-white/20 hover:decoration-blue-400/50 text-lg"
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Column 3: Sétif Contact */}
            <div>
              <h4 className="text-xl font-bold mb-8 uppercase tracking-wider hidden md:block">{t("contact.guedjelSetif")}</h4>
              <button 
                className="flex md:hidden w-full items-center justify-between py-2 border-b border-white/10"
                onClick={() => setExpandedFooterCol(expandedFooterCol === 'setif' ? null : 'setif')}
              >
                <span className="text-lg font-bold uppercase tracking-wider">{t("contact.guedjelSetif")}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${expandedFooterCol === 'setif' ? 'rotate-180' : ''}`} />
              </button>

              <div className={`${expandedFooterCol === 'setif' ? 'block' : 'hidden'} md:block transition-all duration-300`}>
                <div className="space-y-4 text-white/80 text-sm py-2 md:py-0">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400" />
                    <div>
                      <a
                        href="https://maps.google.com/?q=75+route+de+batna+ouled+boudhil+guedjel+Setif+Algeria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold hover:text-blue-400 transition-colors underline underline-offset-4"
                      >
                        {t("contact.viewOnGoogleMaps")}
                      </a>
                      <p className="mt-2 text-xs opacity-60 leading-relaxed">{t("contact.address")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 flex-shrink-0 text-blue-400" />
                    <a href="mailto:marketing@vitrosak.com" className="hover:text-blue-400 transition-colors font-medium">
                      marketing@vitrosak.com
                    </a>
                  </div>
                  <div className="pl-8 space-y-2 font-medium">
                    <p>+213 675 005 111</p>
                    <p>+213 671 888 343</p>
                    <p>+213 663 424 774</p>
                    <p>+213 560 535 168</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Oran Contact */}
            <div>
              <h4 className="text-xl font-bold mb-8 uppercase tracking-wider hidden md:block">{t("contact.birElDjirOran")}</h4>
              <button 
                className="flex md:hidden w-full items-center justify-between py-2 border-b border-white/10"
                onClick={() => setExpandedFooterCol(expandedFooterCol === 'oran' ? null : 'oran')}
              >
                <span className="text-lg font-bold uppercase tracking-wider">{t("contact.birElDjirOran")}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${expandedFooterCol === 'oran' ? 'rotate-180' : ''}`} />
              </button>

              <div className={`${expandedFooterCol === 'oran' ? 'block' : 'hidden'} md:block transition-all duration-300`}>
                <div className="space-y-4 text-white/80 text-sm py-2 md:py-0">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400" />
                    <div>
                      <a
                        href="https://maps.app.goo.gl/WHHhDCVRCyxAoy4f9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold hover:text-blue-400 transition-colors underline underline-offset-4"
                      >
                        {t("contact.viewOnGoogleMaps")}
                      </a>
                      <p className="mt-2 text-xs opacity-60 leading-relaxed">{t("contact.showroom")}</p>
                    </div>
                  </div>
                  <div className="pl-8 font-medium">
                    <p>+213 697 888 680</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/40">
            <p className="font-bold">
              © 2026 VITROSAK. All rights reserved. | Algerian Glass Manufacturing Excellence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}