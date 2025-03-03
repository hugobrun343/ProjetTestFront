import { Particle } from './types/Particle';
import { CONFIG } from './config';

class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: ((data: Particle[]) => void)[] = [];
  private url = CONFIG.WS_URL;

  connect() {
    if (this.socket?.readyState === WebSocket.OPEN) return;

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          this.listeners.forEach((callback) => callback(data));
        } else {
          console.error("❌ Invalid data format received:", data);
        }
      } catch (error) {
        console.error("❌ WebSocket parsing error:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("⚠️ WebSocket disconnected, reconnecting in 3s...");
      setTimeout(() => this.connect(), 3000);
    };
  }

  subscribe(callback: (data: Particle[]) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.listeners = [];
    }
  }
}

export const wsService = new WebSocketService();