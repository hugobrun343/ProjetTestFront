import { useEffect, useRef, useState } from "react";
import { Particle } from "../types/particle";

export const useWebSocketParticles = (url: string) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          setParticles(data);
        }
      } catch (error) {
      }
    });

    return () => {
      socket.close();
    };
  }, [url]);

  return { particles };
};