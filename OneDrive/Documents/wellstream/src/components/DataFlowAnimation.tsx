import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataParticle {
  id: string;
  type: 'circle' | 'triangle' | 'square' | 'hexagon';
  x: number;
  y: number;
  stage: number;
  progress: number;
  color: string;
  size: number;
  speed: number;
  path: { x: number; y: number }[];
  currentPathIndex: number;
}

const DataFlowAnimation: React.FC = () => {
  const [particles, setParticles] = useState<DataParticle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 600 });

  // Particle types and their base colors
  const particleTypes = ['circle', 'triangle', 'square', 'hexagon'] as const;
  const baseColors = ['#3B82F6', '#10B981', '#8B5CF6', '#06B6D4']; // Blue, Green, Purple, Cyan

  // Generate path points for each stage
  const generatePath = (startX: number, startY: number, endX: number, endY: number, stage: number) => {
    const points = [];
    const steps = 20;
    
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      let x, y;
      
      switch (stage) {
        case 1: // Chaotic entry
          x = startX + (endX - startX) * progress + Math.sin(progress * Math.PI * 3) * 30;
          y = startY + (endY - startY) * progress + Math.cos(progress * Math.PI * 2) * 20;
          break;
        case 2: // Convergence
          x = startX + (endX - startX) * progress;
          y = startY + (endY - startY) * progress + Math.sin(progress * Math.PI) * 15;
          break;
        case 3: // Vortex processing
          const angle = progress * Math.PI * 2;
          const radius = 40 * (1 - progress);
          x = startX + (endX - startX) * progress + Math.cos(angle) * radius;
          y = startY + (endY - startY) * progress + Math.sin(angle) * radius;
          break;
        case 4: // Pattern formation
          x = startX + (endX - startX) * progress;
          y = startY + (endY - startY) * progress + Math.sin(progress * Math.PI * 4) * 10 * (1 - progress);
          break;
        default: // Final constellation
          x = startX + (endX - startX) * progress;
          y = startY + (endY - startY) * progress;
      }
      
      points.push({ x, y });
    }
    
    return points;
  };

  // Create initial particles
  const createParticle = (id: string): DataParticle => {
    const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    const baseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
    const startY = Math.random() * dimensions.height;
    
    // Define stage positions
    const stagePositions = [
      { x: -50, y: startY }, // Entry
      { x: dimensions.width * 0.2, y: dimensions.height * 0.5 + (Math.random() - 0.5) * 100 }, // Convergence
      { x: dimensions.width * 0.4, y: dimensions.height * 0.5 }, // Processing
      { x: dimensions.width * 0.6, y: dimensions.height * 0.5 + (Math.random() - 0.5) * 80 }, // Pattern
      { x: dimensions.width * 0.8 + Math.random() * 100, y: dimensions.height * 0.3 + Math.random() * 200 } // Constellation
    ];

    // Generate full path
    const fullPath = [];
    for (let i = 0; i < stagePositions.length - 1; i++) {
      const stagePath = generatePath(
        stagePositions[i].x,
        stagePositions[i].y,
        stagePositions[i + 1].x,
        stagePositions[i + 1].y,
        i + 1
      );
      fullPath.push(...stagePath);
    }

    return {
      id,
      type,
      x: -50,
      y: startY,
      stage: 1,
      progress: 0,
      color: baseColor,
      size: 4 + Math.random() * 4,
      speed: 0.5 + Math.random() * 0.5,
      path: fullPath,
      currentPathIndex: 0
    };
  };

  // Initialize particles
  useEffect(() => {
    const initialParticles = Array.from({ length: 150 }, (_, i) => 
      createParticle(`particle-${i}`)
    );
    setParticles(initialParticles);
  }, [dimensions]);

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          const newPathIndex = Math.min(
            particle.currentPathIndex + particle.speed,
            particle.path.length - 1
          );
          
          const currentPoint = particle.path[Math.floor(newPathIndex)];
          const progress = newPathIndex / particle.path.length;
          
          // Determine current stage based on progress
          let stage = 1;
          if (progress > 0.8) stage = 5;
          else if (progress > 0.6) stage = 4;
          else if (progress > 0.4) stage = 3;
          else if (progress > 0.2) stage = 2;
          
          // Color transition based on stage
          let color = particle.color;
          if (stage >= 3) {
            const crimsonMix = (stage - 2) / 3;
            if (stage >= 4) {
              // Final stages get crimson with glow
              color = `hsl(348, ${70 + crimsonMix * 30}%, ${60 + crimsonMix * 20}%)`;
            } else {
              // Processing stage gets warmer colors
              color = `hsl(${280 - crimsonMix * 60}, ${60 + crimsonMix * 30}%, ${55 + crimsonMix * 15}%)`;
            }
          }
          
          // Reset particle if it reaches the end
          if (newPathIndex >= particle.path.length - 1) {
            return createParticle(particle.id);
          }
          
          return {
            ...particle,
            x: currentPoint?.x || particle.x,
            y: currentPoint?.y || particle.y,
            currentPathIndex: newPathIndex,
            stage,
            progress,
            color
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [dimensions]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight * 0.6
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render particle based on type
  const renderParticle = (particle: DataParticle) => {
    const baseProps = {
      cx: particle.type === 'circle' ? particle.size / 2 : undefined,
      cy: particle.type === 'circle' ? particle.size / 2 : undefined,
      r: particle.type === 'circle' ? particle.size / 2 : undefined,
      fill: particle.color,
      opacity: 0.7 + (particle.stage - 1) * 0.1,
      filter: particle.stage >= 4 ? 'url(#glow)' : undefined
    };

    switch (particle.type) {
      case 'circle':
        return <circle {...baseProps} />;
      case 'triangle':
        const trianglePoints = `${particle.size/2},0 ${particle.size},${particle.size} 0,${particle.size}`;
        return <polygon points={trianglePoints} fill={particle.color} opacity={baseProps.opacity} filter={baseProps.filter} />;
      case 'square':
        return <rect width={particle.size} height={particle.size} fill={particle.color} opacity={baseProps.opacity} filter={baseProps.filter} />;
      case 'hexagon':
        const hexPoints = Array.from({ length: 6 }, (_, i) => {
          const angle = (i * Math.PI) / 3;
          const x = (particle.size / 2) + (particle.size / 2) * Math.cos(angle);
          const y = (particle.size / 2) + (particle.size / 2) * Math.sin(angle);
          return `${x},${y}`;
        }).join(' ');
        return <polygon points={hexPoints} fill={particle.color} opacity={baseProps.opacity} filter={baseProps.filter} />;
      default:
        return <circle {...baseProps} />;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none data-flow-container">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        className="absolute inset-0"
      >
        {/* Glow filter definition */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Render all particles */}
        {particles.map(particle => (
          <motion.g
            key={particle.id}
            initial={{ x: particle.x, y: particle.y }}
            animate={{ x: particle.x, y: particle.y }}
            transition={{ duration: 0.1, ease: "linear" }}
          >
            {renderParticle(particle)}
          </motion.g>
        ))}

        {/* Connection lines for constellation stage */}
        {particles
          .filter(p => p.stage === 5)
          .map((particle, index, arr) => {
            if (index === 0) return null;
            const prev = arr[index - 1];
            return (
              <motion.line
                key={`connection-${particle.id}`}
                x1={prev.x}
                y1={prev.y}
                x2={particle.x}
                y2={particle.y}
                stroke="#800020"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            );
          })}
      </svg>
    </div>
  );
};

export default DataFlowAnimation;
