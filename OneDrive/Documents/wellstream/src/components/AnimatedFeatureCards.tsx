import React from 'react';
import { motion } from 'framer-motion';

const AnimatedFeatureCards: React.FC = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Real-Time Ingestion",
      description: "Continuous data streaming from multiple sources with intelligent validation and quality controls.",
      gradient: "from-blue-500 via-blue-600 to-indigo-600",
      stats: "99.9% uptime"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "AI Summarization", 
      description: "Intelligent agents distill raw data into key insights, anomalies, and actionable summaries in real-time.",
      gradient: "from-purple-500 via-purple-600 to-pink-600",
      stats: "10x faster insights"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      title: "Smart Retention",
      description: "Store only what matters—key datapoints and insights—while automatically expiring raw data to control costs.",
      gradient: "from-green-500 via-emerald-600 to-teal-600",
      stats: "80% cost reduction"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    },
  };

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-crimson-100/30 to-gold-100/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-navy-100/30 to-crimson-100/30 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -20, 0],
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
            backgroundImage: `radial-gradient(circle at 25% 25%, #800020 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #1a1a2e 2px, transparent 2px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-crimson-50 to-gold-50 border border-crimson-200 text-crimson-800 text-sm font-medium">
              <span className="w-2 h-2 bg-crimson-500 rounded-full mr-2 animate-pulse"></span>
              Powered by Advanced AI
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Powered by <span className="crimson-accent">AI Agents</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform uses intelligent AI agents to process streaming data and deliver 
            insights before traditional analytics even refresh.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover={{ 
                y: -12,
                transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }
              }}
            >
              <div className="relative bg-white/80 backdrop-blur-sm p-8 lg:p-10 rounded-3xl border border-gray-200/50 shadow-soft-lg hover:shadow-glow-lg transition-all duration-500 h-full overflow-hidden">
                {/* Gradient background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                {/* Animated icon container */}
                <motion.div 
                  className="relative mb-8"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white shadow-glow relative z-10`}>
                    {feature.icon}
                    
                    {/* Pulsing ring effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl`}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  
                  {/* Floating particles */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-3 h-3 bg-gold-400 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-1 -left-1 w-2 h-2 bg-crimson-400 rounded-full"
                    animate={{
                      y: [0, -8, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </motion.div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-crimson-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Stats badge */}
                  <motion.div
                    className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${feature.gradient} text-white text-sm font-semibold shadow-soft`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {feature.stats}
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-crimson/5 to-transparent rounded-bl-full"
                  initial={{ scale: 0, rotate: 0 }}
                  whileInView={{ scale: 1, rotate: 45 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                />
                
                <motion.div
                  className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gold/5 to-transparent rounded-tr-full"
                  initial={{ scale: 0, rotate: 0 }}
                  whileInView={{ scale: 1, rotate: -45 }}
                  transition={{ delay: index * 0.1 + 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedFeatureCards;
