import React, {Suspense} from 'react';
import { Canvas } from 'react-three-fiber'
import Scene from './three/Scene';
import { PerspectiveCamera, OrbitControls, ContactShadows } from '@react-three/drei'
import { useResource } from 'react-three-fiber'

const CassetteModel = () => {
  const myCamera = useResource()

  return (
    <Canvas>
      <ambientLight intensity={.5} />
      <directionalLight position={[5,10,7]} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

export default CassetteModel;