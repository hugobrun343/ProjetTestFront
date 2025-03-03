import { useEffect } from "react";
import { Particle } from "../types/particle";

export const useCanvasRenderer = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  particles: Particle[]
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.beginPath();
      ctx.fillStyle = "white";
      
      particles.forEach(({ x, y }) => {
        const screenX = centerX + x * 5;
        const screenY = centerY - y * 5;
        ctx.moveTo(screenX + 5, screenY);
        ctx.arc(screenX, screenY, 5, 0, 2 * Math.PI);
      });
      
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [particles]);
};