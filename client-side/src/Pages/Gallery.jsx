import React from "react";
import { useTranslation } from "react-i18next";
import { ImageIcon, Building, Users, Camera } from "lucide-react";

export default function Gallery() {
  const { t } = useTranslation();
  const galleryImages = [
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/49ae462a8_photo_2025-11-07202919.jpg",
      title: t("gallery.titles.modernGlassStaircase"),
      category: t("gallery.categories.architectural"),
      span: "col-span-1 row-span-2"
    },
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/af3bed524_photo_2025-11-07202907.jpg",
      title: t("gallery.titles.curvedGlassDoor"),
      category: t("gallery.categories.customDesign"),
      span: "col-span-1 row-span-1"
    },
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/29f8cca93_photo_2025-11-07202854.jpeg",
      title: t("gallery.titles.commercialGlassPartitions"),
      category: t("gallery.categories.officeSolutions"),
      span: "col-span-2 row-span-1"
    },
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/9a3c7ddb1_photo_2025-11-07202835.jpeg",
      title: t("gallery.titles.structuralGlassFlooring"),
      category: t("gallery.categories.architectural"),
      span: "col-span-2 row-span-1"
    },
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/85b4ca7c1_photo_2025-11-07202819.jpeg",
      title: t("gallery.titles.decorativeGlassDoor"),
      category: t("gallery.categories.residential"),
      span: "col-span-1 row-span-2"
    },
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/6f38dd430_photo_2025-11-07202814.jpeg",
      title: t("gallery.titles.glassShowerEnclosures"),
      category: t("gallery.categories.bathroomSolutions"),
      span: "col-span-1 row-span-2"
    },
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/62952aa68_photo_2025-11-07202825.jpeg",
      title: t("gallery.titles.decorativeGlassPanel"),
      category: t("gallery.categories.customDesign"),
      span: "col-span-1 row-span-1"
    },
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/5a6635349_photo_2025-11-07202804.jpeg",
      title: t("gallery.titles.buildingFacade"),
      category: t("gallery.categories.architectural"),
      span: "col-span-1 row-span-2"
    },
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/b39790483_photo_2025-11-07202811.jpeg",
      title: t("gallery.titles.curvedShowerEnclosure"),
      category: t("gallery.categories.bathroomSolutions"),
      span: "col-span-1 row-span-1"
    },
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/56ff29cca_photo_2025-11-07202900.jpeg",
      title: t("gallery.titles.officeGlassPartitions"),
      category: t("gallery.categories.commercial"),
      span: "col-span-1 row-span-2"
    },
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/157fbb225_photo_2025-11-07202913.jpg",
      title: t("gallery.titles.glassStaircaseRailing"),
      category: t("gallery.categories.architectural"),
      span: "col-span-2 row-span-1"
    },
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/729043bff_photo_2025-11-07202923.jpeg",
      title: t("gallery.titles.refrigeratedDisplayCase"),
      category: t("gallery.categories.commercial"),
      span: "col-span-2 row-span-1"
    },
    {
      url: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6873cd222107ad5ca60f82e3/51635e7f2_RoyalTulipSkikda2025.jpg",
      title: t("gallery.titles.royalTulipHotel"),
      category: t("gallery.categories.majorProjects"),
      span: "col-span-3 row-span-1"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rotate-45" />
          <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-white -rotate-12" />
          <div className="absolute top-1/2 left-1/3 w-28 h-28 border-2 border-white rotate-12" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
              <ImageIcon className="w-5 h-5" />
              <span className="font-medium">{t("gallery.projectGallery")}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t("gallery.ourWork")}
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {t("gallery.inAction")}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t("gallery.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("gallery.featuredProjects")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("gallery.featuredDescription")}
            </p>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${image.span}`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-2">
                      <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {image.category}
                      </span>
                    </div>
                    <h3 className="text-white text-lg font-bold">{image.title}</h3>
                  </div>
                </div>

                {/* Border on Hover */}
                <div className="absolute inset-0 border-4 border-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t("gallery.wantToFeature")}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t("gallery.wantToFeatureDescription")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:marketing@vitrosak.com"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              {t("gallery.submitProjectPhotos")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}