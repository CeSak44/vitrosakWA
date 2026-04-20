import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createPageUrl } from "./utils";
import { Mail, MapPin, ChevronDown } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLanguageDropdown(false);
  };

  // Timer ref to delay hiding the language dropdown so it doesn't disappear
  // immediately when the mouse briefly leaves the button/dropdown.
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

  // determine the active language object from i18n.language
  const activeLanguage =
    languages.find((l) => i18n.language === l.code || i18n.language?.startsWith(l.code)) || languages[1];

  return (
    <div className="min-h-screen bg-[var(--vitro-bg)] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--vitro-line)] bg-[#05101c]/88 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center md:justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/882c92d93_LOGO-1.png" 
                alt="VITROSAK" 
                className="h-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                    location.pathname === item.url
                      ? "bg-[rgba(35,120,255,0.16)] text-[var(--vitro-blue-ice)]"
                      : "text-[var(--vitro-text-muted)] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
              
              {/* Contact Us Button with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowContactDropdown(!showContactDropdown)}
                  onMouseEnter={() => setShowContactDropdown(true)}
                  onMouseLeave={() => setShowContactDropdown(false)}
                  className="flex items-center space-x-2 rounded-lg px-4 py-2 font-medium text-[var(--vitro-text-muted)] transition-all duration-200 hover:bg-white/5 hover:text-white"
                >
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/64d3715dd_contactsSVG.png" 
                    alt="Contact" 
                    className="w-5 h-5"
                  />
                  <span>{t("nav.contactUs")}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showContactDropdown && (
                  <div 
                    className="absolute right-0 z-50 mt-2 w-96 rounded-xl border border-[var(--vitro-line)] bg-[#081524] p-6 text-white shadow-2xl"
                    onMouseEnter={() => setShowContactDropdown(true)}
                    onMouseLeave={() => setShowContactDropdown(false)}
                  >
                    <div className="space-y-6">
                      {/* Guedjel, Sétif */}
                      <div>
                        <h4 className="mb-3 text-lg font-semibold text-white">{t("contact.guedjelSetif")}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                            <a 
                              href="https://maps.google.com/?q=75+route+de+batna+ouled+boudhil+guedjel+Setif+Algeria" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-bold text-[var(--vitro-blue-soft)] underline hover:text-white"
                            >
                              {t("contact.viewOnGoogleMaps")}
                            </a>
                          </div>
                          <p className="pl-6 text-xs text-[var(--vitro-text-muted)]">{t("contact.address")}</p>
                          <div className="flex items-start space-x-2">
                            <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--vitro-blue-soft)]" />
                            <a href="mailto:marketing@vitrosak.com" className="text-[var(--vitro-text-muted)] hover:text-white">
                              marketing@vitrosak.com
                            </a>
                          </div>
                          <div className="pl-6 space-y-1 text-[var(--vitro-text-muted)]">
                            <p>+213 675 005 111</p>
                            <p>+213 671 888 343</p>
                            <p>+213 663 424 774</p>
                            <p>+213 560 535 168</p>
                          </div>
                        </div>
                      </div>

                      {/* Bir El Djir, Oran */}
                      <div className="border-t border-[var(--vitro-line)] pt-4">
                        <h4 className="mb-3 text-lg font-semibold text-white">{t("contact.birElDjirOran")}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                            <a 
                              href="https://maps.app.goo.gl/WHHhDCVRCyxAoy4f9" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="font-bold text-[var(--vitro-blue-soft)] underline hover:text-white"
                            >
                              {t("contact.viewOnGoogleMaps")}
                            </a>
                          </div>
                          <p className="pl-6 text-xs text-[var(--vitro-text-muted)]">{t("contact.showroom")}</p>
                          <div className="pl-6 text-[var(--vitro-text-muted)]">
                            <p>+213 697 888 680</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  onMouseEnter={showLanguage}
                  onMouseLeave={() => hideLanguageWithDelay()}
                  className="flex items-center space-x-2 rounded-lg px-4 py-2 font-medium text-[var(--vitro-text-muted)] transition-all duration-200 hover:bg-white/5 hover:text-white"
                >
                  {/* Show currently selected language (flag + name) */}
                  <span className="flex items-center gap-2">
                    {activeLanguage.flagUrl ? (
                      <img src={activeLanguage.flagUrl} alt={`${activeLanguage.name} flag`} className="w-5 h-3 object-cover rounded-sm" />
                    ) : (
                      <span className="text-base">{activeLanguage.flag}</span>
                    )}
                    <span className="hidden sm:inline">{activeLanguage.name}</span>
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showLanguageDropdown && (
                  <div 
                    className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-[var(--vitro-line)] bg-[#081524] py-2 shadow-2xl"
                    onMouseEnter={showLanguage}
                    onMouseLeave={() => hideLanguageWithDelay()}
                  >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                              i18n.language === lang.code ? "bg-[rgba(35,120,255,0.16)] text-white" : "text-[var(--vitro-text-muted)]"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span>{lang.name}</span>
                            </span>
                            {/* Flag image (with emoji fallback) */}
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

          {/* Contact Popup for Mobile */}
          {showContactDropdown && (
            <div className="fixed bottom-20 left-0 right-0 z-50 max-h-[80vh] overflow-y-auto rounded-b-2xl rounded-t-2xl border-y border-[var(--vitro-line)] bg-[#081524] px-4 py-6 text-white md:hidden">
              <div className="space-y-6">
                {/* Close Button */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">{t("nav.contactUs")}</h3>
                  <button 
                    onClick={() => setShowContactDropdown(false)}
                    className="rounded-full p-2 hover:bg-white/5"
                  >
                    <span className="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--vitro-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Contact Content */}
                <div>
                  <h4 className="mb-3 text-base font-semibold text-white">{t("contact.guedjelSetif")}</h4>
                  <div className="space-y-3 text-sm">
                    <a 
                      href="https://maps.google.com/?q=75+route+de+batna+ouled+boudhil+guedjel+Setif+Algeria" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block font-bold text-[var(--vitro-blue-soft)] underline"
                    >
                      {t("contact.viewOnGoogleMaps")}
                    </a>
                    <a href="mailto:marketing@vitrosak.com" className="block text-[var(--vitro-text-muted)]">marketing@vitrosak.com</a>
                    <div className="space-y-1 text-[var(--vitro-text-muted)]">
                      <p>+213 675 005 111</p>
                      <p>+213 671 888 343</p>
                      <p>+213 663 424 774</p>
                      <p>+213 560 535 168</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[var(--vitro-line)] pt-4">
                  <h4 className="mb-3 text-base font-semibold text-white">{t("contact.birElDjirOran")}</h4>
                  <div className="space-y-3 text-sm">
                    <a 
                      href="https://maps.google.com/?q=Bir+El+Djir+Oran+Algeria" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block font-bold text-[var(--vitro-blue-soft)] underline"
                    >
                      {t("contact.viewOnGoogleMaps")}
                    </a>
                    <div className="space-y-1 text-[var(--vitro-text-muted)]">
                      <p>+213 697 888 680</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Add padding bottom on mobile for fixed navbar */}
      <main className="flex-1 md:pb-0 pb-20">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      {/* Floating Action Button for Contact */}
      <button
        onClick={() => setShowContactDropdown(true)}
        className="fixed bottom-20 right-4 z-50 rounded-full bg-[var(--vitro-blue)] p-4 text-white shadow-lg transition-colors duration-200 hover:bg-[#1b61d1] md:hidden"
      >
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/64d3715dd_contactsSVG.png" 
          alt="Contact" 
          className="w-6 h-6 filter brightness-0 invert"
        />
        <span className="sr-only">{t("nav.contactUs")}</span>
      </button>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--vitro-line)] bg-[#05101c]/94 shadow-lg backdrop-blur-xl md:hidden">
        <div className="flex justify-around items-center py-3 px-4">
          {/* Navigation Links */}
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                location.pathname === item.url
                  ? "bg-[rgba(35,120,255,0.16)] text-white"
                  : "text-[var(--vitro-text-muted)] hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.title}
            </Link>
          ))}
          
          {/* Language Button */}
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center space-x-2 rounded-lg px-3 py-2 font-medium text-[var(--vitro-text-muted)] transition-all duration-200 hover:bg-white/5 hover:text-white"
          >
            {activeLanguage.flagUrl ? (
              <img src={activeLanguage.flagUrl} alt={`${activeLanguage.name} flag`} className="w-5 h-3 object-cover rounded-sm" />
            ) : (
              <span className="text-base">{activeLanguage.flag}</span>
            )}
            <span>{activeLanguage.name}</span>
          </button>
        </div>

        {/* Language Dropdown (opens upward on mobile) */}
        {showLanguageDropdown && (
          <div className="absolute bottom-full left-0 right-0 mb-2 border-t border-[var(--vitro-line)] bg-[#081524] shadow-lg">
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 ${
                    i18n.language === lang.code ? "bg-[rgba(35,120,255,0.16)] text-white" : "text-[var(--vitro-text-muted)]"
                  }`}
                >
                  <span className="text-sm font-medium">{lang.name}</span>
                  {lang.flagUrl ? (
                    <img src={lang.flagUrl} alt={`${lang.name} flag`} className="w-6 h-4 object-cover rounded-sm" />
                  ) : (
                    <span className="text-lg">{lang.flag}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Footer */}
      <footer className="border-t border-[var(--vitro-line)] bg-[#040d18] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Logo */}
            <div>
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/d467bfb83_LOGO-1.png" 
                alt="VITROSAK" 
                className="h-12 mb-4"
              />
              <p className="text-gray-300 text-sm">
                {t("footer.description")}
              </p>
            </div>

            {/* Guedjel, Sétif Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("contact.guedjelSetif")}</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a 
                    href="https://maps.google.com/?q=75+route+de+batna+ouled+boudhil+guedjel+Setif+Algeria" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold hover:text-blue-400 transition-colors underline"
                  >
                    {t("contact.viewOnGoogleMaps")}
                  </a>
                </div>
                <p className="pl-6 text-xs text-gray-400">{t("contact.address")}</p>
                <div className="flex items-start space-x-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a href="mailto:marketing@vitrosak.com" className="hover:text-blue-400 transition-colors">
                    marketing@vitrosak.com
                  </a>
                </div>
                <div className="pl-6 space-y-1">
                  <p>+213 675 005 111</p>
                  <p>+213 671 888 343</p>
                  <p>+213 663 424 774</p>
                  <p>+213 560 535 168</p>
                </div>
              </div>
            </div>

            {/* Bir El Djir, Oran Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">{t("contact.birElDjirOran")}</h4>
              <div className="space-y-2 text-gray-300 text-sm">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a 
                    href="https://maps.app.goo.gl/WHHhDCVRCyxAoy4f9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-bold hover:text-blue-400 transition-colors underline"
                  >
                    {t("contact.viewOnGoogleMaps")}
                  </a>
                </div>
                <p className="pl-6 text-xs text-gray-400">{t("contact.showroom")}</p>
                <div className="pl-6">
                  <p>+213 697 888 680</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
