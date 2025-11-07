import React from "react";
import { useTranslation } from "react-i18next";
import { Calculator, Palette, Factory, Wrench, CheckCircle, ArrowRight } from "lucide-react";

import ServiceHero from "../Components/services/ServiceHero";
import ServiceCard from "../Components/services/ServiceCard";

export default function Services() {
  const { t } = useTranslation();
  const services = [
    {
      icon: Calculator,
      title: t("about.services.estimating.title"),
      description: t("about.services.estimating.description"),
      details: [
        t("about.services.estimating.details.costAnalysis"),
        t("about.services.estimating.details.valueEngineering"), 
        t("about.services.estimating.details.materialOptimization"),
        t("about.services.estimating.details.timelinePlanning"),
        t("about.services.estimating.details.pricingModels")
      ],
      color: "from-blue-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Palette,
      title: t("about.services.design.title"),
      description: t("about.services.design.description"),
      details: [
        t("about.services.design.details.customSolutions"),
        t("about.services.design.details.architecturalConsultation"),
        t("about.services.design.details.modeling"),
        t("about.services.design.details.materialSelection"),
        t("about.services.design.details.optimization")
      ],
      color: "from-blue-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Factory,
      title: t("about.services.manufacturing.title"),
      description: t("about.services.manufacturing.description"),
      details: [
        t("about.services.manufacturing.details.advancedTechnology"),
        t("about.services.manufacturing.details.climateAdapted"),
        t("about.services.manufacturing.details.qualityControl"),
        t("about.services.manufacturing.details.flexibleProduction"),
        t("about.services.manufacturing.details.rapidPrototyping")
      ],
      color: "from-blue-500 to-blue-600",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/4a8cd8960_usine.jpeg"
    },
    {
      icon: Wrench,
      title: t("about.services.installation.title"),
      description: t("about.services.installation.description"),
      details: [
        t("about.services.installation.details.certifiedProfessionals"),
        t("about.services.installation.details.safetyFirst"),
        t("about.services.installation.details.precisionTechniques"),
        t("about.services.installation.details.projectManagement"),
        t("about.services.installation.details.postInstallation")
      ],
      color: "from-blue-500 to-blue-600",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/b4e542281_installation.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <ServiceHero />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("about.serviceProcess.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("about.serviceProcess.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}>
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  {index < services.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}