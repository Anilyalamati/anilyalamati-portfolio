import { Canvas } from '@react-three/fiber';
import { HeroGeometry } from './HeroGeometry';

interface SceneProps {
  active: boolean;
  compact?: boolean;
}

/**
 * The actual canvas — split into its own module so it can be
 * React.lazy()-loaded and kept out of the main bundle. `active`
 * drives frameloop pausing when the hero scrolls out of view.
 */
export default function Scene({ active, compact = false }: SceneProps) {
  return (
    <Canvas
      dpr={[1, compact ? 1.5 : 2]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <HeroGeometry compact={compact} />
    </Canvas>
  );
}
