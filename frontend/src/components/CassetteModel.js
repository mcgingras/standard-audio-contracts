import React, {Suspense} from 'react';
import { Canvas } from 'react-three-fiber'
import Model from '../assets/models/Cassette';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { useResource } from 'react-three-fiber'

const CassetteModel = () => {
  const myCamera = useResource()

  return (
    <Canvas>
      <PerspectiveCamera makeDefault ref={myCamera} position={[0, 20, 20]} />
      <OrbitControls camera={myCamera.current} />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
    </Canvas>
  )
}

export default CassetteModel;