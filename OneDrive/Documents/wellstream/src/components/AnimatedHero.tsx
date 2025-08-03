import React from 'react';
import { motion } from 'framer-motion';
import EnhancedDataFlow from './EnhancedDataFlow';

const AnimatedHero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(128, 0, 32, 0.4)",
      transition: {
        duration: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center hero-gradient">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-crimson-200/20 to-gold-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-navy-200/20 to-crimson-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #800020 2px, transparent 2px),
                             radial-gradient(circle at 80% 20%, #1a1a2e 2px, transparent 2px),
                             radial-gradient(circle at 40% 40%, #ffd700 1px, transparent 1px)`,
            backgroundSize: '60px 60px, 80px 80px, 40px 40px'
          }} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-20 flex flex-col justify-center min-h-screen">
        {/* Enhanced Header Text */}
        <motion.div
          className="text-center mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-6"
            variants={itemVariants}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-crimson-50 border border-crimson-200 text-crimson-800 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-crimson-500 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Real-Time Analytics
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            variants={itemVariants}
            style={{ lineHeight: '1.1' }}
          >
            <motion.span
              className="inline-block text-navy-900 mr-4"
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 30px rgba(26, 26, 46, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              Real-Time
            </motion.span>
            <br className="hidden sm:block" />
            <motion.span 
              className="crimson-accent inline-block relative"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
            >
              Insights
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-crimson-500/20 to-gold-500/20 rounded-lg blur-xl"
                animate={{
                  opacity: [0, 0.5, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.span>
          </motion.h1>
          
        </motion.div>

        {/* Enhanced Data Flow Animation */}
        <motion.div 
          className="relative h-72 md:h-96 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-2xl backdrop-blur-sm border border-white/20 shadow-soft-lg">
            <EnhancedDataFlow />
          </div>
        </motion.div>

        {/* Color-coded descriptive text below animation */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.p 
            className="text-base md:text-lg font-medium leading-relaxed max-w-4xl mx-auto px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.span 
              className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              Transform massive data streams
            </motion.span>
            <motion.span 
              className="text-gray-700 mx-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.6 }}
            >
              into
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-crimson-600 via-red-500 to-crimson-700 bg-clip-text text-transparent font-semibold"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.2, duration: 0.8 }}
            >
              actionable insights
            </motion.span>
            <br className="hidden sm:block" />
            <motion.span 
              className="text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.8, duration: 0.6 }}
            >
              with AI agents that process, summarize, and alert you to what matters—
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-crimson-600 to-crimson-700 bg-clip-text text-transparent font-bold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.2, duration: 0.6 }}
            >
              in real-time
            </motion.span>
            <motion.span 
              className="text-crimson-600 text-xl md:text-2xl font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.5, duration: 0.4 }}
            >
              .
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
            variants={itemVariants}
          >
            <motion.button 
              className="group relative bg-gradient-to-r from-crimson-600 to-crimson-700 hover:from-crimson-700 hover:to-crimson-800 text-white font-semibold text-lg px-12 py-4 rounded-xl shadow-glow transition-all duration-300 overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center">
                Start Free Trial
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>

            <motion.button 
              className="group relative bg-transparent border-2 border-crimson-600 text-crimson-700 hover:bg-crimson-600 hover:text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-300 overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="absolute inset-0 bg-crimson-600"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5, originY: 0.5 }}
              />
              <span className="relative z-10 flex items-center">
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </span>
            </motion.button>
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center space-x-8 text-sm text-gray-500"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Setup in 5 minutes
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              24/7 support
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedHero;
