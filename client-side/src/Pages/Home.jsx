import React from "react";

import HeroSection from "../Components/home/HeroSection";
import ProductCatalog from "../Components/home/ProductCatalog";
import InternationalReach from "../Components/home/InternationalReach";
import PartnersSection from "../Components/home/PartnersSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductCatalog />
      <InternationalReach />
      <PartnersSection />
    </div>
  );
}