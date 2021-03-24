import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'

export default function Scene(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/scene.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0, 0.0]} rotation={[10, 0, 0]} scale={[0.1, 0.1, 0.1]}>
        <mesh
          material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b_dae30c31-6130-48bb-b69f-756a153719d2']}
          geometry={nodes.screw_bottom_right.geometry}
          material-color={"#FFFFFF"}
        />
        <mesh
          material={materials['_df7486b1-7455-4a3e-9e28-b2ff4444f0bf_dbedbe8d-47e1-40e9-a27f-e5e93fb27387']}
          geometry={nodes.screw_top_left.geometry}
        />
        <mesh
          material={materials['_c78d66db-8ff6-4f81-9e77-ae1007b939a5_1f62d303-251c-4b38-a04a-06ac2ef7e861']}
          geometry={nodes.screw_top_right.geometry}
        />
        <mesh
          material={materials['_2135c0a3-f228-4206-b812-fe03e8b77747_2341a1f5-7f9f-4af0-89fc-85bfd8a5d381']}
          geometry={nodes.screw_bottom_left.geometry}
        />
        <mesh
          material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b 1_f60af98b-7166-4826-a2bc-5b6c99e815df']}
          geometry={nodes.screw_bottom_right_1.geometry}
        />
        <mesh
          material={materials['_df7486b1-7455-4a3e-9e28-b2ff4444f0bf 1_0b2c377b-972d-4d1e-b395-d17dae9da28f']}
          geometry={nodes.screw_top_left_1.geometry}
        />
        <mesh
          material={materials['_c78d66db-8ff6-4f81-9e77-ae1007b939a5 1_97bcea9d-f218-4910-8af0-e16249e7e79f']}
          geometry={nodes.screw_top_right_1.geometry}
        />
        <mesh
          material={materials['_2135c0a3-f228-4206-b812-fe03e8b77747 1_a8275851-678e-423e-9d98-ade1086edea9']}
          geometry={nodes.screw_bottom_left_1.geometry}
        />
        <mesh
          material={materials['_cc8c22ba-787b-48a1-b224-064feabd3e3f_b0eb2ade-5ecf-43ff-9d5d-70d24e8e56c8']}
          geometry={nodes.label_small.geometry}
        />
        <mesh
          material={materials['_8d67941f-10a2-4ff3-8da5-0d2d274de17d_6fdea815-6b7a-432b-8c0c-99deb7ac010b']}
          geometry={nodes.sticker_large.geometry}
          material-color={"#DDDDDD"}
        />
        <mesh
          material={materials['Material_cb558d18-5a5e-49d8-b30e-7604678b5407_7d4d302e-2908-4f97-8a0f-6bff0704dff6']}
          geometry={nodes.front_canal.geometry}
        />
        <mesh
          material={materials['Material 1_e994b6a2-eb81-406f-9dd5-5d1e58ffa8db_1e0572fa-6aa1-4c4d-840b-784fd4d250a2']}
          geometry={nodes.front_top_plate.geometry}
        />
        <mesh
          material={materials['Material 2_798c5875-34cf-4bb4-a727-af2b7cd91898_098b5a6d-7d8e-42f3-bde2-1c4308c61525']}
          geometry={nodes.front_middle_layer.geometry}
        />
        <mesh
          material={materials['_aeb70d56-2c94-4a6f-9c96-473987dcf736_ff8be188-3353-4640-9301-4be1031d79bc']}
          geometry={nodes.middle_main_extrustion.geometry}
        />
        <mesh
          material={materials['Cylinder material 7_72cf970e-1897-4d60-ba59-fcf76d5770d4']}
          geometry={nodes['film_roll_left_&_film_roll_left_hole'].geometry}
        />
        <mesh
          material={materials['Cylinder material 4_ba4ac949-ff91-4345-ab9a-6b36a5d93e77']}
          geometry={nodes.tooth.geometry}
        />
        <mesh
          material={materials['Cylinder material 4_ba4ac949-ff91-4345-ab9a-6b36a5d93e77']}
          geometry={nodes.tooth_1.geometry}
        />
        <mesh
          material={materials['Cylinder material 4_ba4ac949-ff91-4345-ab9a-6b36a5d93e77']}
          geometry={nodes.tooth_2.geometry}
        />
        <mesh
          material={materials['Cylinder material 4_ba4ac949-ff91-4345-ab9a-6b36a5d93e77']}
          geometry={nodes.tooth_3.geometry}
        />
        <mesh
          material={materials['Cylinder material 4_ba4ac949-ff91-4345-ab9a-6b36a5d93e77']}
          geometry={nodes.tooth_4.geometry}
        />
        <mesh
          material={materials['Cylinder material 4_ba4ac949-ff91-4345-ab9a-6b36a5d93e77']}
          geometry={nodes.tooth_5.geometry}
        />
        <mesh
          material={materials['Cylinder material_67c486f4-41ef-4225-b6ae-42a598074f8f']}
          geometry={nodes['teeth_ring_outer_&_teeth_ring_hole_&_film_roll_left_&_film_roll_left_hole'].geometry}
        />
        <mesh
          material={materials['Cylinder material 9_6c5e2d56-8c07-45ce-9277-0d0f70244dd4']}
          geometry={nodes['film_roll_left_&_film_roll_left_hole_1'].geometry}
        />
        <mesh
          material={materials['Cylinder material 11_3e85c607-8988-48f6-8b37-b661e265fd30']}
          geometry={nodes.tooth_6.geometry}
        />
        <mesh
          material={materials['Cylinder material 11_3e85c607-8988-48f6-8b37-b661e265fd30']}
          geometry={nodes.tooth_7.geometry}
        />
        <mesh
          material={materials['Cylinder material 11_3e85c607-8988-48f6-8b37-b661e265fd30']}
          geometry={nodes.tooth_8.geometry}
        />
        <mesh
          material={materials['Cylinder material 11_3e85c607-8988-48f6-8b37-b661e265fd30']}
          geometry={nodes.tooth_9.geometry}
        />
        <mesh
          material={materials['Cylinder material 11_3e85c607-8988-48f6-8b37-b661e265fd30']}
          geometry={nodes.tooth_10.geometry}
        />
        <mesh
          material={materials['Cylinder material 11_3e85c607-8988-48f6-8b37-b661e265fd30']}
          geometry={nodes.tooth_11.geometry}
        />
        <mesh
          material={materials['Cylinder material 12_4576ebd3-1825-4bff-83a2-e846c152689f']}
          geometry={nodes['teeth_ring_outer_&_teeth_ring_hole_&_film_roll_left_&_film_roll_left_hole_1'].geometry}
        />
        <mesh
          material={materials['_5e8668f8-64f3-4df2-a5f8-41f7f742a109_15606ce0-f889-474a-97e2-d6a617fc5c68']}
          geometry={nodes.film_middle_connector.geometry}
        />
        <mesh
          material={materials['Cylinder material 2_7c694c97-6390-42f3-802f-7061938cee8a']}
          geometry={nodes.inner_post_left.geometry}
        />
        <mesh
          material={materials['Cylinder material 3_730a107d-c7a8-4584-9d2b-35acbe3f2db1']}
          geometry={nodes.inner_post_right.geometry}
        />
        <mesh
          material={materials['_fe57db1e-3b8f-45f8-a213-39f1526253ba_c624ce8b-79ce-4926-a68e-05c270e8de9b']}
          geometry={nodes.film_main_wiggle.geometry}
        />
        <mesh
          material={materials['_ca3e78a5-6500-454a-9cdd-4b8cc18d170d_025de4b4-6d93-4192-85d8-acdc933958a2']}
          geometry={nodes.back_middle_layer.geometry}
        />
        <mesh
          material={materials['Material_cb558d18-5a5e-49d8-b30e-7604678b5407 1_2da5bdd5-a1dc-42e0-b9fb-e6fa9a3fbd12']}
          geometry={nodes.back_canal.geometry}
        />
        <mesh
          material={materials['_12f8c9d3-0faa-4cd1-8335-31ad9404b0ea_0b134ec8-dde0-4d94-8113-837daca98c10']}
          geometry={nodes.back_top_plate.geometry}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
