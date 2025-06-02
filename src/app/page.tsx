
import FluidSimulation from '@/components/FluidSimulation';

export default function HomePage() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', background: '#000' }}>
      {/* 
        IMPORTANT: For the fluid simulation to work correctly, 
        you need to place an image named 'LDR_LLL1_0.png' 
        in your 'public' directory. 
        The simulation attempts to load '/LDR_LLL1_0.png'.
      */}
      <FluidSimulation />
    </div>
  );
}
