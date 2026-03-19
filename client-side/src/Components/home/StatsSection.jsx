import React from "react";
import { useTranslation } from "react-i18next";
import { Factory, Globe, Users, Zap } from "lucide-react";

export default function StatsSection() {
  const { t } = useTranslation();
  const stats = [
    {
      icon: Factory,
      number: "15,000",
      label: t("stats.squareMeters"),
      description: t("stats.totalFacilityArea"),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      number: "4,500",
      label: t("stats.productionArea"),
      description: t("stats.manufacturingSpace"),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Globe,
      number: "3",
      label: t("stats.countries"),
      description: t("stats.internationalPresence"),
      color: "from-green-500 to-green-600"
    },
    {
      icon: Users,
      number: "13+",
      label: t("stats.years"),
      description: t("stats.industryExperience"),
      color: "from-orange-500 to-orange-600"
    },
  ];

  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 border border-white rotate-45" />
        <div className="absolute bottom-32 right-32 w-32 h-32 border border-white -rotate-12" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-white rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("stats.byTheNumbers")}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t("stats.commitmentDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className={`w-20 h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl -z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-white">{stat.number}</h3>
                <p className="text-lg font-semibold text-blue-400">{stat.label}</p>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}