import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/cassette.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={materials['_2135c0a3-f228-4206-b812-fe03e8b77747']}
        geometry={nodes['Path_&_Polygon_&_Polygon_&_Polygon_&_Polygon'].geometry}
      />
      <mesh
        material={materials['_cdc59fd6-10ce-4ba8-9ae8-539142a14c3b']}
        geometry={nodes['Path_&_Polygon_&_Polygon_&_Polygon_&_Polygon_1'].geometry}
      />
      <mesh
        material={materials['_df7486b1-7455-4a3e-9e28-b2ff4444f0bf']}
        geometry={nodes['Path_&_Polygon_&_Polygon_&_Polygon_&_Polygon_2'].geometry}
      />
      <mesh
        material={materials['_c78d66db-8ff6-4f81-9e77-ae1007b939a5']}
        geometry={nodes['Path_&_Polygon_&_Polygon_&_Polygon_&_Polygon_3'].geometry}
      />
      <mesh material={materials['_8d67941f-10a2-4ff3-8da5-0d2d274de17d']} geometry={nodes.Path.geometry} />
      <mesh material={materials['_cc8c22ba-787b-48a1-b224-064feabd3e3f']} geometry={nodes.Path_1.geometry} />
      <mesh
        material={materials['Material_cb558d18-5a5e-49d8-b30e-7604678b5407']}
        geometry={
          nodes[
            'Path_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle'
          ].geometry
        }
      />
      <mesh
        material={materials['Material 2_798c5875-34cf-4bb4-a727-af2b7cd91898']}
        geometry={
          nodes[
            'Path_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Path_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle'
          ].geometry
        }
      />
      <mesh
        material={materials['Material 1_e994b6a2-eb81-406f-9dd5-5d1e58ffa8db']}
        geometry={
          nodes[
            'Path_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_1'
          ].geometry
        }
      />
      <mesh material={materials['_fe57db1e-3b8f-45f8-a213-39f1526253ba']} geometry={nodes['Path_-_Stroke'].geometry} />
      <mesh material={materials['_0c4327aa-5071-47cf-bc43-36767e8a567e']} geometry={nodes.Path_2.geometry} />
      <mesh material={materials['_76dca335-cc67-4c58-8e1e-9c77952bfc25']} geometry={nodes.Path_3.geometry} />
      <mesh material={materials['_5e8668f8-64f3-4df2-a5f8-41f7f742a109']} geometry={nodes['Line_-_Stroke'].geometry} />
      <mesh
        material={materials['_aeb70d56-2c94-4a6f-9c96-473987dcf736']}
        geometry={nodes['Path_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle'].geometry}
      />
      <mesh
        material={materials['_12f8c9d3-0faa-4cd1-8335-31ad9404b0ea']}
        geometry={
          nodes[
            'Path_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_2'
          ].geometry
        }
      />
      <mesh
        material={materials['_ca3e78a5-6500-454a-9cdd-4b8cc18d170d']}
        geometry={
          nodes[
            'Path_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_3'
          ].geometry
        }
      />
      <mesh
        material={materials['_32abc260-d343-4037-a324-00396f41b299']}
        geometry={
          nodes[
            'Path_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_&_Rectangle_4'
          ].geometry
        }
      />
    </group>
  )
}

useGLTF.preload('/cassette.glb')
