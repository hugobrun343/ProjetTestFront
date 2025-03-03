import { useEffect } from 'react';
import { wsService } from '../WebSocketService';
import { useParticleStore } from '../store';

export const useWebSocketConnection = () => {
  const setParticles = useParticleStore((state) => state.setParticles);

  useEffect(() => {
    wsService.connect();
    const unsubscribe = wsService.subscribe(setParticles);

    return () => {
      unsubscribe();
      wsService.disconnect();
    };
  }, [setParticles]);
}; 