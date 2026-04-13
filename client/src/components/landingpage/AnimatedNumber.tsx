// src/components/sections/HowItWorks.jsx
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Text3D, Center } from '@react-three/drei';

const AnimatedNumber = ({ number, step }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <motion.div 
      ref={ref}
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1 } : { scale: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
        {step}
      </div>
      <h3 className="text-xl font-bold mb-2">{number.title}</h3>
      <p className="text-gray-400">{number.description}</p>
    </motion.div>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Sign Up", description: "Create your account in 30 seconds" },
    { title: "Configure", description: "Set up your preferences" },
    { title: "Start Using", description: "Experience the magic" },
  ];

  return (
    <div className="py-20 px-4 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          How It Works
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <AnimatedNumber 
              key={index}
              step={index + 1}
              number={step}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;