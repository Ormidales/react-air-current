import { useState } from 'react';
import { AirCurrent } from './components/AirCurrent';

function App() {
  // Configuration initiale optimisée pour des corridors plus larges
  const [params] = useState({
    flowSpeed: 1,
    particleDensity: 50,
    flowDirection: 0,
    turbulence: 0.4,
  });

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-900 rounded-lg shadow-xl p-2">
          <AirCurrent {...params} />
        </div>
      </div>
    </div>
  );
}

export default App;
