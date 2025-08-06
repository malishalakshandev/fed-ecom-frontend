import HeroGrid from "../components/HeroGrid";
import CasualInspirations from "../components/CasualInspirations";
import TrendingSection from "../components/TrendingSection";
import Navigation from "../components/Navigation";
import { useState } from "react";

function HomePage() {
  
    return (
        <>
            <main className="flex flex-col gap-8 md:gap-12 pb-8">
                <HeroGrid />
                <CasualInspirations />
                <TrendingSection />
            </main>
        </>
    );
}

export default HomePage;