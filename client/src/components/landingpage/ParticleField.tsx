// src/components/sections/CTASection.jsx
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle System Component
const ParticleField = () => {
  const particlesCount = 2000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Add rotation animation
  });

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial 
        transparent 
        color="#3b82f6" 
        size={0.1} 
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const CTASection = () => {
  return (
    <div className="relative py-32 px-4 overflow-hidden">
      {/* 3D Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of satisfied users today
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all"
        >
          Start Your Free Trial →
        </motion.button>
        <p className="text-sm text-gray-400 mt-4">
          No credit card required • Cancel anytime
        </p>
      </motion.div>
    </div>
  );
};

export default CTASection;