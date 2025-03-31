import { useState } from 'react';
import { AirCurrent } from './components/AirCurrent';

function App() {
  const [params] = useState({
    flowSpeed: 1,
    particleDensity: 50,
    flowDirection: 0,
    turbulence: 0.2,
  });

  return (
    <AirCurrent {...params} />
  );
}

export default App;
