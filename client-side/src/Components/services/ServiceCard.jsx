import React from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";

export default function ServiceCard({ service }) {
  const { t } = useTranslation();
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">
      {/* Service Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-80`} />
        <div className="absolute top-6 left-6">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <service.icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Service Content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
        
        {/* Service Details */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">{t("serviceCard.whatsIncluded")}</h4>
          {service.details.map((detail, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}