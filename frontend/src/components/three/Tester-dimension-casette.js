import React, { useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { useLoader } from 'react-three-fiber'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import scribble from '../../assets/images/scribble2.jpeg'


export default function TextureCassette(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/tester-dimension-casette.glb')

  const texture = useLoader(TextureLoader, scribble);
  texture.flipY = false;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.screw_bottom_right.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.screw_top_left.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.screw_top_right.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.screw_bottom_left.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.screw_bottom_right_2.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.screw_top_left_2.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.screw_top_right_2.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.screw_bottom_left_2.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.front_canal.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.front_top_plate.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.front_middle_layer.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.middle_main_extrustion.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes['film_roll_left_&_film_roll_left_hole'].geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.tooth.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.tooth_2.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.tooth_3.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.tooth_4.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.tooth_5.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.tooth_6.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes['teeth_ring_outer_&_teeth_ring_hole_&_film_roll_left_&_film_roll_left_hole'].geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes['film_roll_left_&_film_roll_left_hole_2'].geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.tooth_7.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.tooth_8.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.tooth_9.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.tooth_10.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.tooth_11.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.tooth_12.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes['teeth_ring_outer_&_teeth_ring_hole_&_film_roll_left_&_film_roll_left_hole_2'].geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.film_middle_connector.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.inner_post_left.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.inner_post_right.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.film_main_wiggle.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.back_middle_layer.geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_27196015-38ef-4b20-8beb-c4ffd544a8c4']}
        geometry={nodes.back_canal.geometry}
      />
      <mesh
        geometry={nodes.back_top_plate.geometry}
      >
      <meshStandardMaterial map={texture} attach="material" />
      </mesh>
    </group>
  )
}

useGLTF.preload('/tester-dimension-casette.glb')
