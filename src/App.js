import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import './style.css'
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Ground from './Ground';
import { Car } from './Car';
import { Rings } from './Rings';
import { Boxes } from './Boxes';
import { Bloom, ChromaticAberration, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const CarShow = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.5} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <Rings />

      <Boxes />

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

      <Ground />

      <EffectComposer>
        {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
        <Bloom
          blendFunction={BlendFunction.Add}
          intensity={1.3}
          width={1000}
          height={1000}
          kernelSize={4}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.015}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.Add}
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
