import React from "react";
import { useWebSocketParticles } from "../hooks/useWebSocketParticles";
import ParticleCanvas from "./ParticleCanvas";

interface ParticleSimulationProps {
  onStop: () => void;
}

const WS_URL = import.meta.env.VITE_WS_URL as string;

const ParticleSimulation: React.FC<ParticleSimulationProps> = ({ onStop }) => {
  const { particles } = useWebSocketParticles(WS_URL);

  return (
    <div>
      <ParticleCanvas particles={particles} />
      <button onClick={onStop} className="mt-4 px-4 py-2 bg-red-500 text-white">
        Stop Simulation
      </button>
    </div>
  );
};

export default ParticleSimulation;