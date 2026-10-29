import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const IVORY = '#eeebda';

interface HeroGeometryProps {
  compact?: boolean;
}

/**
 * The signature hero mark: a faceted wireframe core with an inner
 * solid shell, orbited by a second ring and a soft particle field.
 * Tilts gently toward the pointer; idles on a slow auto-rotation
 * otherwise so it stays alive even without pointer input.
 */
export function HeroGeometry({ compact = false }: HeroGeometryProps) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Damp toward the pointer target for a smooth, non-jittery tilt.
    target.current.x += (pointer.x - target.current.x) * Math.min(delta * 3, 1);
    target.current.y += (pointer.y - target.current.y) * Math.min(delta * 3, 1);

    if (group.current) {
      group.current.rotation.y = target.current.x * 0.35 + state.clock.elapsedTime * 0.08;
      group.current.rotation.x = target.current.y * 0.2;
    }
    if (ring.current) {
      ring.current.rotation.z += delta * 0.12;
      ring.current.rotation.x += delta * 0.04;
    }
    if (inner.current) {
      // Counter-rotates against the outer shell for a sense of depth.
      inner.current.rotation.y -= delta * 0.35;
      inner.current.rotation.x += delta * 0.18;
    }
  });

  const scale = compact ? 0.78 : Math.min(viewport.width / 6, 1.15);

  return (
    <group>
      {/* Invisible plane purely to capture pointer position across the canvas. */}
      <mesh
        position={[0, 0, -1]}
        onPointerMove={(event) => setPointer({ x: event.pointer.x, y: event.pointer.y })}
        visible={false}
      >
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial />
      </mesh>

      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
        <group ref={group} scale={scale}>
          {/* Outer faceted shell */}
          <mesh>
            <icosahedronGeometry args={[1.4, 1]} />
            <meshBasicMaterial color={IVORY} wireframe transparent opacity={0.85} />
          </mesh>

          {/* Inner solid core, lit, so the mark has real volume */}
          <mesh scale={0.58}>
            <icosahedronGeometry args={[1.4, 0]} />
            <meshStandardMaterial
              color={IVORY}
              transparent
              opacity={0.28}
              roughness={0.35}
              metalness={0.2}
              flatShading
            />
          </mesh>

          {/* Inner wireframe, counter-rotating */}
          <mesh ref={inner} scale={0.58}>
            <octahedronGeometry args={[1.4, 0]} />
            <meshBasicMaterial color={IVORY} wireframe transparent opacity={0.9} />
          </mesh>

          <mesh ref={ring} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.1, 0.014, 16, 160]} />
            <meshBasicMaterial color={IVORY} transparent opacity={0.6} />
          </mesh>
        </group>
      </Float>

      <Sparkles
        count={compact ? 40 : 90}
        scale={[6, 4, 4]}
        size={3}
        speed={0.25}
        opacity={0.75}
        color={IVORY}
      />

      <ambientLight intensity={0.7} />
      <pointLight position={[4, 3, 5]} intensity={22} color={IVORY} />
      <pointLight position={[-4, -2, -3]} intensity={10} color="#40447a" />
    </group>
  );
}
