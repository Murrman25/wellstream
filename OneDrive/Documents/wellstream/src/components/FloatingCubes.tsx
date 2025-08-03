import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Cube {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  animationDelay: number;
}

const FloatingCubes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cubes, setCubes] = React.useState<Cube[]>([]);

  useEffect(() => {
    const generateCubes = () => {
      const newCubes: Cube[] = [];
      const numCubes = 15;

      for (let i = 0; i < numCubes; i++) {
        newCubes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          rotation: Math.random() * 360,
          opacity: Math.random() * 0.3 + 0.1,
          animationDelay: Math.random() * 5,
        });
      }
      setCubes(newCubes);
    };

    generateCubes();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      {cubes.map((cube) => (
        <motion.div
          key={cube.id}
          className="absolute border border-crimson/20"
          style={{
            left: `${cube.x}%`,
            top: `${cube.y}%`,
            width: `${cube.size}px`,
            height: `${cube.size}px`,
            opacity: cube.opacity,
          }}
          initial={{
            rotate: cube.rotation,
            scale: 0,
          }}
          animate={{
            rotate: [cube.rotation, cube.rotation + 360],
            scale: [0, 1, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: cube.animationDelay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingCubes;
