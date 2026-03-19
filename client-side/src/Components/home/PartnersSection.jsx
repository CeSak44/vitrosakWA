
import React from "react";
import { useTranslation } from "react-i18next";
import { Users, Building, Handshake } from "lucide-react";

export default function PartnersSection() {
  const { t } = useTranslation();
  const partners = [
    {
      name: "Atlas",
      logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/96a2c37ad_atlas.jpg"
    },
    {
      name: "Iris",
      logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/4fbb41f86_Iris.png"
    },
    {
      name: "EPE TVE",
      logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/098dd9844_epeTVE.png"
    },
    {
      name: "Dima Froid",
      logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/6b8402086_LogoDimaFroid.png"
    },
    {
      name: "Simafe",
      logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/8ff9d1ca1_simafe1.png"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
            <Handshake className="w-4 h-4" />
            <span className="text-sm font-semibold">{t("partners.strategicPartnerships")}</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t("partners.trustedByLeaders")}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("partners.description")}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {partners.map((partner, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 aspect-square flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain p-2 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("partners.collaborativeApproach")}</h3>
            <p className="text-gray-600">
              {t("partners.collaborativeDescription")}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("partners.industryExpertise")}</h3>
            <p className="text-gray-600">
              {t("partners.industryExpertiseDescription")}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Handshake className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("partners.longTermRelationships")}</h3>
            <p className="text-gray-600">
              {t("partners.longTermDescription")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
