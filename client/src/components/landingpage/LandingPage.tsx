// src/components/LandingPage.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D } from '@react-three/drei';
import HeroSection from './AnimatedSphere ';
import FeaturesSection from './FeatureCard';
import HowItWorks from './AnimatedNumber';
import CTASection from './ParticleField';
// import HeroSection from './sections/HeroSection';
// import FeaturesSection from './sections/FeaturesSection';
// import HowItWorks from './sections/HowItWorks';
// import CTASection from './sections/CTASection';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
    </div>
  );
};

export default LandingPage;