import { useEffect } from "react";
import { Particle } from "../types/Particle";

export const useCanvasRenderer = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  particles: Particle[]
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculer le centre du canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particles.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.fillStyle = "white";
        // Convertir les coordonnées pour centrer la simulation
        const screenX = centerX + x * 5; // Facteur d'échelle de 5 pour mieux voir
        const screenY = centerY - y * 5; // Y inversé car le canvas a Y vers le bas
        ctx.arc(screenX, screenY, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, [particles]);
};