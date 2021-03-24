import React, {Suspense} from 'react';
import { Canvas } from 'react-three-fiber'
import Scene from './three/Scene';
import { OrbitControls } from '@react-three/drei'
import { useResource } from 'react-three-fiber'
import { Controls } from 'react-three-gui';


const CassetteModel = () => {
  const myCamera = useResource()

  const colorProp = {
    "screw": "#03045e",
    "label_small": "#023e8a",
    "sticker_large": "#0077b6",
    "front_canal": "#0096c7",
    "front_top_plate": "#00b4d8",
    "front_middle_layer": "#48cae4",
    "middle_main": "#90e0ef",
    "film_roll": "#ade8f4",
    "teeth": "#F367E0",
    "teeth_ring": "#caf0f8",
    "film_middle_connector": "#023e8a",
    "inner_post_left": "#ade8f4",
    "inner_post_right": "#48cae4",
    "film_main_wiggle": "#023e8a",
    "back_middle_layer": "#48cae4",
    "back_canal": "#ade8f4",
    "back_top_plate": "#0077b6"
  }

  return (
    <Controls.Provider>
      <Controls.Canvas>
        <ambientLight intensity={.5} />
        <directionalLight position={[5,10,7]} />
        <Suspense fallback={null}>
          <Scene colors={colorProp} />
        </Suspense>
        <OrbitControls />
      </Controls.Canvas>
      <Controls />
    </Controls.Provider>
  )
}

export default CassetteModel;