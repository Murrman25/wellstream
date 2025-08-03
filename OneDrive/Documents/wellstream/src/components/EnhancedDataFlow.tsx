import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataParticle {
  id: string;
  x: number;
  y: number;
  stage: 'input' | 'processing' | 'output';
  type: 'circle' | 'square' | 'triangle';
  color: string;
  size: number;
  speed: number;
  targetX: number;
  targetY: number;
  processed: boolean;
}

interface AIAgent {
  id: string;
  x: number;
  y: number;
  isActive: boolean;
  pulsePhase: number;
}

const EnhancedDataFlow: React.FC = () => {
  const [particles, setParticles] = useState<DataParticle[]>([]);
  const [aiAgents, setAIAgents] = useState<AIAgent[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [iconPulses, setIconPulses] = useState({ alert: false, chart: false, summary: false });

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Initialize AI Agents in the center processing area
  useEffect(() => {
    const agents: AIAgent[] = [
      { id: 'agent-1', x: dimensions.width * 0.45, y: dimensions.height * 0.4, isActive: false, pulsePhase: 0 },
      { id: 'agent-2', x: dimensions.width * 0.55, y: dimensions.height * 0.6, isActive: false, pulsePhase: 0.5 },
      { id: 'agent-3', x: dimensions.width * 0.5, y: dimensions.height * 0.5, isActive: false, pulsePhase: 1 },
    ];
    setAIAgents(agents);
  }, [dimensions]);

  // Create a new particle
  const createParticle = (id: string): DataParticle => {
    const startY = dimensions.height * 0.3 + Math.random() * dimensions.height * 0.4;
    const types: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    const inputColors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B']; // Blue, Green, Purple, Amber
    
    return {
      id,
      x: -30 - Math.random() * 100, // Stagger initial positions to avoid line formation
      y: startY,
      stage: 'input',
      type: types[Math.floor(Math.random() * types.length)],
      color: inputColors[Math.floor(Math.random() * inputColors.length)],
      size: 6 + Math.random() * 4,
      speed: 15, // 6x faster speed for incoming particles
      targetX: dimensions.width * 0.4 + Math.random() * dimensions.width * 0.2,
      targetY: dimensions.height * 0.4 + Math.random() * dimensions.height * 0.2,
      processed: false
    };
  };

  // Initialize particles
  useEffect(() => {
    const initialParticles = Array.from({ length: 20 }, (_, i) => 
      createParticle(`particle-${i}`)
    );
    setParticles(initialParticles);
  }, [dimensions]);

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x;
          let newY = particle.y;
          let newStage = particle.stage;
          let newColor = particle.color;
          let newProcessed = particle.processed;

          if (particle.stage === 'input') {
            // Move towards AI processing area with more fluid motion
            newX += particle.speed;
            
            // Add more dynamic chaotic movement
            const time = Date.now() * 0.001;
            newY += Math.sin(particle.x * 0.02 + time) * 4 + Math.cos(particle.x * 0.015 + time * 0.7) * 2;
            
            // Check if reached processing area
            if (newX >= dimensions.width * 0.4) {
              newStage = 'processing';
              newX = particle.targetX;
              newY = particle.targetY;
            }
          } else if (particle.stage === 'processing') {
            // Orbit around nearest AI agent for processing
            const nearestAgent = aiAgents.reduce((closest, agent) => {
              const distToCurrent = Math.sqrt((particle.x - agent.x) ** 2 + (particle.y - agent.y) ** 2);
              const distToClosest = Math.sqrt((particle.x - closest.x) ** 2 + (particle.y - closest.y) ** 2);
              return distToCurrent < distToClosest ? agent : closest;
            }, aiAgents[0]);

            if (nearestAgent && !particle.processed) {
              const angle = Date.now() * 0.002 + parseInt(particle.id.split('-')[1]) * 0.5;
              const radius = 40;
              newX = nearestAgent.x + Math.cos(angle) * radius;
              newY = nearestAgent.y + Math.sin(angle) * radius;
              
              // After processing time, mark as processed and change color (much more selective)
              if (Math.random() < 0.015) {
                newProcessed = true;
                newColor = '#800020'; // Crimson for processed data
                newStage = 'output';
              }
            }
          } else if (particle.stage === 'output') {
            // Move towards right side as clean output
            newX += particle.speed * 1.5;
            
            // Distribute particles to different icon targets with updated positions
            if (!particle.targetY || particle.targetY === dimensions.height * 0.5) {
              // Assign target icon based on particle ID for even distribution
              const particleNum = parseInt(particle.id.split('-')[1]) || 0;
              const iconTargets = [
                dimensions.height * 0.2 + 25, // Alert icon (top - updated position)
                dimensions.height * 0.5, // Chart icon (middle)  
                dimensions.height * 0.8 - 25 + 25  // Summary icon (bottom - updated position)
              ];
              particle.targetY = iconTargets[particleNum % 3];
            }
            
            // Move towards assigned target icon
            newY += (particle.targetY - newY) * 0.08;
            
            // Check for collision with larger icons and trigger pulse
            const iconX = dimensions.width * 0.82;
            if (newX >= iconX - 15 && newX <= iconX + 65) {
              const alertY = dimensions.height * 0.2 + 25;
              const chartY = dimensions.height * 0.5;
              const summaryY = dimensions.height * 0.8 - 25 + 25;
              
              if (Math.abs(newY - alertY) < 30) {
                setIconPulses(prev => ({ ...prev, alert: true }));
                setTimeout(() => setIconPulses(prev => ({ ...prev, alert: false })), 300);
              } else if (Math.abs(newY - chartY) < 30) {
                setIconPulses(prev => ({ ...prev, chart: true }));
                setTimeout(() => setIconPulses(prev => ({ ...prev, chart: false })), 300);
              } else if (Math.abs(newY - summaryY) < 30) {
                setIconPulses(prev => ({ ...prev, summary: true }));
                setTimeout(() => setIconPulses(prev => ({ ...prev, summary: false })), 300);
              }
            }
            
            // Reset particle when it exits
            if (newX > dimensions.width + 50) {
              return createParticle(particle.id);
            }
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            stage: newStage,
            color: newColor,
            processed: newProcessed
          };
        })
      );

      // Update AI agents
      setAIAgents(prevAgents =>
        prevAgents.map(agent => ({
          ...agent,
          isActive: Math.random() < 0.1,
          pulsePhase: (agent.pulsePhase + 0.1) % (Math.PI * 2)
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [dimensions, aiAgents]);

  // Handle window resize and mobile optimization
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setDimensions({
        width: window.innerWidth,
        height: Math.min(window.innerHeight * (isMobile ? 0.5 : 0.7), isMobile ? 400 : 600)
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render particle based on type and stage
  const renderParticle = (particle: DataParticle) => {
    const opacity = particle.stage === 'output' ? 0.9 : 0.7;
    const glow = particle.processed ? 'url(#crimsonGlow)' : undefined;

    switch (particle.type) {
      case 'circle':
        return (
          <circle
            cx={particle.size / 2}
            cy={particle.size / 2}
            r={particle.size / 2}
            fill={particle.color}
            opacity={opacity}
            filter={glow}
          />
        );
      case 'square':
        return (
          <rect
            width={particle.size}
            height={particle.size}
            fill={particle.color}
            opacity={opacity}
            filter={glow}
          />
        );
      case 'triangle':
        const points = `${particle.size/2},0 ${particle.size},${particle.size} 0,${particle.size}`;
        return (
          <polygon
            points={points}
            fill={particle.color}
            opacity={opacity}
            filter={glow}
          />
        );
      default:
        return null;
    }
  };

  // Render AI Agent
  const renderAIAgent = (agent: AIAgent) => {
    const pulseScale = 1 + Math.sin(agent.pulsePhase) * 0.2;
    const isActive = agent.isActive;
    
    return (
      <g key={agent.id}>
        {/* Outer pulse ring */}
        <motion.circle
          cx={agent.x}
          cy={agent.y}
          r={25}
          fill="none"
          stroke="#800020"
          strokeWidth="2"
          opacity={isActive ? 0.6 : 0.3}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Core AI node */}
        <motion.circle
          cx={agent.x}
          cy={agent.y}
          r={12}
          fill="#800020"
          opacity={isActive ? 1 : 0.7}
          animate={{
            scale: [1, pulseScale, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Inner glow */}
        <circle
          cx={agent.x}
          cy={agent.y}
          r={8}
          fill="#ffffff"
          opacity={isActive ? 0.8 : 0.4}
        />
      </g>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="absolute inset-0"
      >
        {/* Filter definitions */}
        <defs>
          <filter id="crimsonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#800020" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#800020" stopOpacity="0.7"/>
          </linearGradient>
        </defs>

        {/* Background flow lines */}
        <motion.path
          d={`M 0,${dimensions.height * 0.5} Q ${dimensions.width * 0.3},${dimensions.height * 0.3} ${dimensions.width * 0.5},${dimensions.height * 0.5} Q ${dimensions.width * 0.7},${dimensions.height * 0.7} ${dimensions.width},${dimensions.height * 0.5}`}
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Render AI Agents */}
        {aiAgents.map(agent => renderAIAgent(agent))}

        {/* Render particles */}
        <AnimatePresence>
          {particles.map(particle => (
            <motion.g
              key={particle.id}
              initial={{ x: particle.x, y: particle.y, scale: 0 }}
              animate={{ 
                x: particle.x, 
                y: particle.y, 
                scale: 1,
                rotate: particle.stage === 'processing' ? 360 : 0
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: 0.1, 
                ease: "linear",
                rotate: { duration: particle.stage === 'processing' ? 4 : 0, repeat: Infinity, ease: "linear" }
              }}
            >
              {renderParticle(particle)}
            </motion.g>
          ))}
        </AnimatePresence>

        {/* Output icons area - evenly spaced in vertical layout */}
        <g opacity="0.6">
          {/* Alert icon - top position */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              scale: iconPulses.alert ? 1.15 : 1 
            }}
            transition={{ 
              delay: 2, 
              duration: iconPulses.alert ? 0.15 : 1,
              ease: "easeOut"
            }}
          >
            <rect x={dimensions.width * 0.82} y={dimensions.height * 0.2} width="50" height="50" rx="6" fill="#800020" opacity="0.7"/>
            <text x={dimensions.width * 0.82 + 25} y={dimensions.height * 0.2 + 30} textAnchor="middle" fill="white" fontSize="24">!</text>
          </motion.g>
          
          {/* Chart icon - center position */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              scale: iconPulses.chart ? 1.15 : 1 
            }}
            transition={{ 
              delay: 2.5, 
              duration: iconPulses.chart ? 0.15 : 1,
              ease: "easeOut"
            }}
          >
            <rect x={dimensions.width * 0.82} y={dimensions.height * 0.5 - 25} width="50" height="50" rx="6" fill="#800020" opacity="0.7"/>
            <path d={`M${dimensions.width * 0.82 + 10},${dimensions.height * 0.5 + 15} L${dimensions.width * 0.82 + 20},${dimensions.height * 0.5 + 5} L${dimensions.width * 0.82 + 30},${dimensions.height * 0.5 + 10} L${dimensions.width * 0.82 + 40},${dimensions.height * 0.5 - 5}`} stroke="white" strokeWidth="3" fill="none"/>
          </motion.g>
          
          {/* Summary icon - bottom position */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.6, 
              scale: iconPulses.summary ? 1.15 : 1 
            }}
            transition={{ 
              delay: 3, 
              duration: iconPulses.summary ? 0.15 : 1,
              ease: "easeOut"
            }}
          >
            <rect x={dimensions.width * 0.82} y={dimensions.height * 0.8 - 25} width="50" height="50" rx="6" fill="#800020" opacity="0.7"/>
            <rect x={dimensions.width * 0.82 + 10} y={dimensions.height * 0.8 - 10} width="30" height="4" fill="white"/>
            <rect x={dimensions.width * 0.82 + 10} y={dimensions.height * 0.8} width="20" height="4" fill="white"/>
            <rect x={dimensions.width * 0.82 + 10} y={dimensions.height * 0.8 + 10} width="25" height="4" fill="white"/>
          </motion.g>
        </g>
      </svg>
    </div>
  );
};

export default EnhancedDataFlow;
