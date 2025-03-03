import React, { useRef, useEffect } from "react";
import { useCanvasRenderer } from "../hooks/useCanvasRenderer";
import { Particle } from "../types/Particle";

interface ParticleCanvasProps {
  particles: Particle[];
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ particles }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Ajuster la taille du canvas à la fenêtre
      canvas.width = window.innerWidth * 0.8;  // 80% de la largeur de la fenêtre
      canvas.height = window.innerHeight * 0.8; // 80% de la hauteur de la fenêtre
    }
  }, []);

  useCanvasRenderer(canvasRef, particles);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        background: "black",
        border: "1px solid #333" 
      }} 
    />
  );
};

export default React.memo(ParticleCanvas);