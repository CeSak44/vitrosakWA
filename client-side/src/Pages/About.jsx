
import React from "react";
import { useTranslation } from "react-i18next";
import { Calculator, Palette, Factory, Wrench, CheckCircle, ArrowRight, Award, Shield, Users, Globe, Target } from "lucide-react";

import CompanyOverview from "../Components/home/CompanyOverview";
import StatsSection from "../Components/home/StatsSection";
import ServiceCard from "../Components/services/ServiceCard";

export default function About() {
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

  const qualityFeatures = [
    {
      icon: Shield,
      title: t("about.qualityFeatures.qms.title"),
      description: t("about.qualityFeatures.qms.description")
    },
    {
      icon: Users,
      title: t("about.qualityFeatures.customerRequirements.title"),
      description: t("about.qualityFeatures.customerRequirements.description")
    },
    {
      icon: Globe,
      title: t("about.qualityFeatures.regulatoryCompliance.title"),
      description: t("about.qualityFeatures.regulatoryCompliance.description")
    },
    {
      icon: Target,
      title: t("about.qualityFeatures.continuousImprovement.title"),
      description: t("about.qualityFeatures.continuousImprovement.description")
    }
  ];

  const certificationBenefits = [
    t("about.certificationBenefits.enhancedQuality"),
    t("about.certificationBenefits.customerSatisfaction"),
    t("about.certificationBenefits.streamlinedProcesses"),
    t("about.certificationBenefits.marketAccess"),
    t("about.certificationBenefits.riskManagement"),
    t("about.certificationBenefits.competitiveAdvantage")
  ];

  return (
    <div className="min-h-screen bg-white">
      <CompanyOverview />
      <StatsSection />

      {/* ISO 9001 Quality Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <Award className="w-5 h-5" />
              <span className="font-medium">{t("about.qualityAssurance")}</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t("about.iso9001")}
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {t("about.certifiedExcellence")}
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t("about.qualityCommitment")}
            </p>
          </div>
        </div>
      </section>

      {/* Certification Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Certificate Importance */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
                <Award className="w-4 h-4" />
                <span className="text-sm font-semibold">{t("about.internationalStandard")}</span>
              </div>
              
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                {t("about.certificationImportance")}
              </h3>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="space-y-3">
                  {certificationBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificate Display */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("about.iso9001")}:2015</h3>
                  <p className="text-lg text-blue-600 font-semibold mb-6">Quality Management System</p>
                  
                  {/* Certificate Image */}
                  <div className="border-2 border-gray-200 rounded-lg mb-6 overflow-hidden">
                    <img
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/ccd9c3597_Certificatpage1.jpg"
                      alt="ISO 9001:2015 Certificate"
                      className="w-full h-auto"
                    />
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1 mt-6">
                    <p><strong>{t("about.certificateDetails.certifiedCompany")}:</strong> {t("about.certificateDetailsValues.company")}</p>
                    <p><strong>{t("about.certificateDetails.standard")}:</strong> {t("about.certificateDetailsValues.standard")}</p>
                    <p><strong>{t("about.certificateDetails.scope")}:</strong> {t("about.certificateDetailsValues.scope")}</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl opacity-20 z-0" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl opacity-10 z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("about.qualityManagementSystem")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("about.qualitySystemDescription")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t("about.services.title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("about.services.description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-white">
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
