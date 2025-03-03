import React, { useRef, useEffect } from "react";
import { useCanvasRenderer } from "../hooks/useCanvasRenderer";
import { Particle } from "../types/particle";

interface ParticleCanvasProps {
  particles: Particle[];
}

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ particles }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 0.8;
      canvas.height = window.innerHeight * 0.8;
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