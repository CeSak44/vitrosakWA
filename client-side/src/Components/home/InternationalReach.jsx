import React from "react";
import { useTranslation } from "react-i18next";
import { Globe, MapPin } from "lucide-react";

export default function InternationalReach() {
  const { t } = useTranslation();
  const locations = [
    { name: t("internationalReach.setifAlgeria"), status: "headquarters", color: "bg-blue-600", label: t("internationalReach.headquartersProduction") },
    { name: t("internationalReach.birElDjirOran"), status: "showroom", color: "bg-green-500", label: t("internationalReach.showroomCommercial") },
    { name: t("internationalReach.tunisia"), status: "export", color: "bg-teal-500", label: t("internationalReach.exportMarket") },
    { name: t("internationalReach.mauritania"), status: "export", color: "bg-orange-500", label: t("internationalReach.exportMarket") },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">{t("internationalReach.marketPresence")}</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {t("internationalReach.nationalAndInternational")}
              <span className="block text-blue-600">{t("internationalReach.presence")}</span>
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t("internationalReach.description")}
            </p>

            {/* Locations List */}
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 ${location.color} rounded-full`} />
                  <div>
                    <span className="text-lg font-semibold text-gray-900">{location.name}</span>
                    <span className="ml-2 text-sm text-gray-500">• {location.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}