import React, { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import './style.css'
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Ground from './Ground';
import { Car } from './Car';
import { Rings } from './Rings';
import { Boxes } from './Boxes';
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { FloatingGrid } from './FloatingGrid';

const speed = 4;

const CarShow = () => {

  useEffect(() => {
    
  }, [])

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.5} />

      <PerspectiveCamera makeDefault fov={60} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car speed={speed} />
          </>
        )}
      </CubeCamera>

      <Rings speed={speed} />

      <Boxes speed={speed} />

      <FloatingGrid speed={speed} />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={2.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground speed={speed} />

      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.Add}
          intensity={1.3}
          width={300}
          height={300}
          kernelSize={4}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
