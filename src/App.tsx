import { useState } from 'react';
import { AirCurrent } from './components/AirCurrent';

function App() {
  // Configuration initiale optimisée pour des corridors plus larges
  const [params] = useState({
    flowSpeed: 1,
    particleDensity: 50,
    flowDirection: 0,
    turbulence: 0.25,
  });

  return (
    <AirCurrent {...params} />
  );
}

export default App;
