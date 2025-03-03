import { create } from "zustand";
import { Particle } from "./types/Particle";

interface ParticleState {
  particles: Particle[];
  setParticles: (particles: Particle[]) => void;
  isSimulationRunning: boolean;
  setSimulationRunning: (running: boolean) => void;
}

export const useParticleStore = create<ParticleState>((set) => ({
  particles: [],
  setParticles: (particles) => set({ particles }),
  isSimulationRunning: false,
  setSimulationRunning: (running) => set({ isSimulationRunning: running }),
}));