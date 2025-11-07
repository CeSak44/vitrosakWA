import React from "react";
import { useTranslation } from "react-i18next";
import { Package, Award, Globe } from "lucide-react";

export default function ProductHero() {
  const { t } = useTranslation();
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rotate-45" />
        <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-white -rotate-12" />
        <div className="absolute top-1/2 left-1/3 w-28 h-28 border-2 border-white rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Package className="w-5 h-5" />
            <span className="font-medium">{t("productHero.completeProductRange")}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {t("productHero.premiumGlass")}
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {t("productHero.manufacturing")}
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t("productHero.description")}
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("productHero.iso9001Certified")}</h3>
              <p className="text-blue-200 text-sm">{t("productHero.iso9001Description")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("productHero.internationalStandards")}</h3>
              <p className="text-blue-200 text-sm">{t("productHero.internationalStandardsDescription")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("productHero.customSolutions")}</h3>
              <p className="text-blue-200 text-sm">{t("productHero.customSolutionsDescription")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}