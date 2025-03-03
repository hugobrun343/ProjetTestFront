import { useMutation } from "@tanstack/react-query";
import { useParticleStore } from "../store";
import { CONFIG } from '../config';

const { API_BASE_URL } = CONFIG;

const ControlPanel = () => {
  const { setParticles, setSimulationRunning, isSimulationRunning } = useParticleStore();

  const addParticles = useMutation({
    mutationFn: async (count: number) => {
      const promises = Array.from({ length: count }, () => {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 40 + 10;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        const baseSpeed = 75;
        const vx = -y * baseSpeed / 20;
        const vy = x * baseSpeed / 20;

        return fetch(`${API_BASE_URL}/simulation/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            x,
            y,
            vx,
            vy,
            mass: 1
          })
        });
      });

      const responses = await Promise.all(promises);
      const failedResponses = responses.filter(r => !r.ok);
      
      if (failedResponses.length > 0) {
        throw new Error(`Failed to add ${failedResponses.length} particles`);
      }
    }
  });

  const resetSimulation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/simulation/reset`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to reset simulation");
      setParticles([]);
      setSimulationRunning(false);
    }
  });

  const toggleSimulation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/simulation/toggle`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to toggle simulation");
      setSimulationRunning(!isSimulationRunning);
    }
  });

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="flex space-x-2">
        <button
          onClick={() => addParticles.mutate(10)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={addParticles.isPending}
        >
          {addParticles.isPending ? "➕ Adding..." : "➕ Add 10"}
        </button>

        <button
          onClick={() => addParticles.mutate(100)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={addParticles.isPending}
        >
          {addParticles.isPending ? "➕ Adding..." : "➕ Add 100"}
        </button>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => toggleSimulation.mutate()}
          className={`px-4 py-2 ${isSimulationRunning ? 'bg-green-500' : 'bg-yellow-500'} text-white rounded`}
          disabled={toggleSimulation.isPending}
        >
          {toggleSimulation.isPending ? "⏳ Processing..." : isSimulationRunning ? "▶️ Play" : "⏸️ Pause"}
        </button>

        <button
          onClick={() => resetSimulation.mutate()}
          className="px-4 py-2 bg-red-500 text-white rounded"
          disabled={resetSimulation.isPending}
        >
          {resetSimulation.isPending ? "🔄 Resetting..." : "🔄 Reset"}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;