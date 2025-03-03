import { useEffect, useRef, useState } from "react";
import { Particle } from "../types/Particle";

export const useWebSocketParticles = (url: string) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    console.log("🟢 [DEBUG] Connecting to WebSocket:", url);
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          console.log("📡 [DEBUG] Received particles:", data);
          setParticles(data);
        } else {
          console.error("❌ [ERROR] Invalid WebSocket data:", data);
        }
      } catch (error) {
        console.error("❌ [ERROR] WebSocket JSON parse error:", error);
      }
    });

    socket.addEventListener("close", () => console.log("🔴 [DEBUG] WebSocket disconnected"));
    socket.addEventListener("error", (error) => console.error("❌ [ERROR] WebSocket error:", error));

    return () => {
      console.log("🔴 [DEBUG] Closing WebSocket");
      socket.close();
    };
  }, [url]);

  return { particles };
};