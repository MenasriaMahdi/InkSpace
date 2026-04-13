// src/components/sections/FeaturesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Box, Torus } from '@react-three/drei';

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

// 3D Rotating Cube Component
const RotatingCube = () => {
  return (
    <mesh rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8b5cf6" metalness={0.5} roughness={0.2} />
    </mesh>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: "⚡", title: "Lightning Fast", description: "Built with performance in mind" },
    { icon: "🔒", title: "Secure", description: "Bank-level encryption" },
    { icon: "🤝", title: "Team Collaboration", description: "Work together seamlessly" },
    { icon: "📱", title: "Mobile Ready", description: "Access anywhere, anytime" },
  ];

  return (
    <div className="py-20 px-4 relative overflow-hidden">
      {/* 3D Background Element */}
      <div className="absolute right-0 top-20 w-64 h-64 opacity-20">
        <Canvas camera={{ position: [2, 2, 5] }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <RotatingCube />
        </Canvas>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Amazing Features
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;