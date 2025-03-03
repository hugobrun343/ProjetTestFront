import React from "react";
import ParticleCanvas from "./components/ParticleCanvas";
import ControlPanel from "./components/ControlPanel";
import { useParticleStore } from "./store";
import { useWebSocketConnection } from "./hooks/useWebSocketConnection";

const App: React.FC = () => {
  useWebSocketConnection();
  const particles = useParticleStore((state) => state.particles);

  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      <h1 className="text-2xl font-bold">Particle Simulation 🌌</h1>
      <ParticleCanvas particles={particles} />
      <ControlPanel />
    </div>
  );
};

export default App;