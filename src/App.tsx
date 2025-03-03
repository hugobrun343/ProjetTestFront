import React from "react";
import ParticleCanvas from "./components/ParticleCanvas";
import ControlPanel from "./components/ControlPanel";
import { useWebSocketParticles } from "./hooks/useWebSocketParticles";
import { CONFIG } from "./config";

const App: React.FC = () => {
  const { particles } = useWebSocketParticles(CONFIG.WS_URL);

  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      <h1 className="text-2xl font-bold">Particle Simulation 🌌</h1>
      <ParticleCanvas particles={particles} />
      <ControlPanel />
    </div>
  );
};

export default App;