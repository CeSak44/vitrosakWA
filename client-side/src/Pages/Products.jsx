
import React from "react";
import { useTranslation } from "react-i18next";
import { Building, Car, Shield, Thermometer } from "lucide-react";

import ProductHero from "../Components/products/ProductHero";
import ProductSection from "../Components/products/ProductSection";

export default function Products() {
  const { t } = useTranslation();
  const products = [
    {
      id: "tempered-glass",
      icon: Building,
      title: t("products.temperedGlass.title"),
      subtitle: t("products.temperedGlass.subtitle"),
      types: [t("home.products.flatTempered"), t("home.products.curvedTempered")],
      uses: [t("home.products.shopfronts"), t("home.products.showerEnclosures"), t("home.products.staircases"), t("home.products.balustrades"), t("home.products.architecturalFeatures"), t("home.products.customDesigns")],
      attributes: [
        t("products.temperedGlass.attributes.highStrength"),
        t("products.temperedGlass.attributes.impactResistant"),
        t("products.temperedGlass.attributes.variousDimensions"),
        t("products.temperedGlass.attributes.safetyStandards")
      ],
      specifications: {
        [t("products.temperedGlass.specs.thicknessRange")]: "4-19mm",
        [t("products.temperedGlass.specs.maximumSize")]: "5000 x 2500mm",
        [t("products.temperedGlass.specs.minimumSize")]: "350 x 200mm",
        [t("products.temperedGlass.specs.edgeTypes")]: t("products.temperedGlass.edgeTypesValue")
      },
      images: [
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/1ff7773c8_flatTempered.jpeg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/8c01c8ebf_flatTempered1.jpeg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/b6e59ba2d_flatcurvedGlass.png"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "glazing-glass",
      icon: Thermometer,
      title: t("products.glazingGlass.title"),
      subtitle: t("products.glazingGlass.subtitle"),
      types: [t("home.products.doubleGlazing"), t("home.products.tripleGlazing")],
      uses: [t("home.products.buildingFacades"), t("home.products.refrigeratorDoors"), t("home.products.energyEfficiency"), t("home.products.noiseReduction"), t("home.products.highPerformanceBuildings"), t("home.products.extremeClimateControl")],
      attributes: [
        t("products.glazingGlass.attributes.thermalInsulation"),
        t("products.glazingGlass.attributes.energyEfficiency"),
        t("products.glazingGlass.attributes.noiseReduction"),
        t("products.glazingGlass.attributes.condensationControl")
      ],
      specifications: {
        [t("products.glazingGlass.specs.glassTypes")]: t("products.glazingGlass.glassTypesValue"),
        [t("products.glazingGlass.specs.airGap")]: "6-20mm",
        [t("products.glazingGlass.specs.thermalPerformance")]: t("products.glazingGlass.thermalPerformanceValue"),
        [t("products.glazingGlass.specs.applications")]: t("products.glazingGlass.applicationsValue")
      },
      images: [
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/8625388f3_fasade.jpeg",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "laminated-glass",
      icon: Shield,
      title: t("products.laminatedGlass.title"),
      subtitle: t("products.laminatedGlass.subtitle"),
      uses: [t("home.products.hotels"), t("home.products.bankCounters"), t("home.products.skylights"), t("home.products.glassFlooring")],
      attributes: [
        t("products.laminatedGlass.attributes.impactResistant"),
        t("products.laminatedGlass.attributes.uvProtection"),
        t("products.laminatedGlass.attributes.antiShatter"),
        t("products.laminatedGlass.attributes.soundInsulation")
      ],
      specifications: {
        [t("products.laminatedGlass.specs.thicknessRange")]: "6.38-112mm",
        [t("products.laminatedGlass.specs.maximumSize")]: "3210 x 2250mm",
        [t("products.laminatedGlass.specs.securityLevels")]: t("products.laminatedGlass.securityLevelsValue"),
        [t("products.laminatedGlass.specs.interlayerTypes")]: t("products.laminatedGlass.interlayerTypesValue")
      },
      images: [
        "https://buyglassonline.com.au/wp-content/uploads/2023/07/Toughened-Laminate-Glass-1.jpeg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/ffd0f96a1_laminated1.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/acfd2a3f3_laminated2.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/3c45f20d6_laminated.jpg"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "buses-heavy-machinery",
      icon: Car,
      title: t("products.busesHeavyMachinery.title"),
      subtitle: t("products.busesHeavyMachinery.subtitle"),
      uses: [t("home.products.buses"), t("home.products.heavyConstructionMachinery"), t("home.products.largeVehicleWindshields"), t("home.products.industrialApplications")],
      attributes: [
        t("products.busesHeavyMachinery.attributes.oemQuality"),
        t("products.busesHeavyMachinery.attributes.largeVehicleSpecialists"),
        t("products.busesHeavyMachinery.attributes.curvedFlatDesigns"),
        t("products.busesHeavyMachinery.attributes.climateAdapted")
      ],
      specifications: {
        [t("products.busesHeavyMachinery.specs.vehicleTypes")]: t("products.busesHeavyMachinery.vehicleTypesValue"),
        [t("products.busesHeavyMachinery.specs.glassTypes")]: t("products.busesHeavyMachinery.glassTypesValue"),
        [t("products.busesHeavyMachinery.specs.specialFeatures")]: t("products.busesHeavyMachinery.specialFeaturesValue"),
        [t("products.busesHeavyMachinery.specs.quality")]: t("products.busesHeavyMachinery.qualityValue")
      },
      images: [
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/1e604c233_pb.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/c9eea02cc_pb-lourd.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/494517b73_lourd.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/29373a9f5_Bus1.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/aa385ad04_renaul.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/5db74fb91_bus2.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/9bfeb9a82_Bus3.jpg"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "home-appliances",
      icon: Building,
      title: t("products.homeAppliances.title"),
      subtitle: t("products.homeAppliances.subtitle"),
      uses: [t("home.products.refrigerators"), t("home.products.ovens"), t("home.products.cooktops"), t("home.products.householdEquipment")],
      attributes: [
        t("products.homeAppliances.attributes.temperatureResistant"),
        t("products.homeAppliances.attributes.applianceSpecific"),
        t("products.homeAppliances.attributes.highClarity"),
        t("products.homeAppliances.attributes.safetyCertified")
      ],
      specifications: {
        [t("products.homeAppliances.specs.applications")]: t("products.homeAppliances.applicationsValue"),
        [t("products.homeAppliances.specs.temperatureResistance")]: t("products.homeAppliances.temperatureResistanceValue"),
        [t("products.homeAppliances.specs.customization")]: t("products.homeAppliances.customizationValue"),
        [t("products.homeAppliances.specs.standards")]: t("products.homeAppliances.standardsValue")
      },
      images: [
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/613370cf2_four1.png",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/2194085b5_four.png",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/bf08777ea_photo_2025-11-07200447.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/0d78748a3_photo_2025-11-07200446.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/db9d75440_photo_2025-11-07200444.jpg",
        "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/627b8c3c2_photo_2025-11-07200442.jpg"
      ],
      color: "from-blue-500 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <ProductHero />
      
      <div className="py-20">
        {products.map((product, index) => (
          <ProductSection
            key={product.id}
            product={product}
            isReversed={index % 2 === 1}
          />
        ))}
      </div>
    </div>
  );
}
