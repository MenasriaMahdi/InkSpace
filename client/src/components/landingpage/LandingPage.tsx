import LandingNavbar from "./LandingNavbar";
import HeroSection from "./HeroSection";
import StoryShowcase from "./StoryShowcase";
import BentoFeatures from "./BentoFeatures";
import HowItWorks from "./HowItWorks";
import CTASection from "./CTASection";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#07090e] text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-300">
      <LandingNavbar />
      <main>
        <HeroSection />
        <StoryShowcase />
        <BentoFeatures />
        <HowItWorks />
        <CTASection />
      </main>
    </div>
  );
};

export default LandingPage;