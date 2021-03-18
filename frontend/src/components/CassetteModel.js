import React, {Suspense} from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {cassette} from "../assets/models/cassette.glb";

const CassetteModel = () => {
  console.log(cassette);
  return (
    <Suspense fallback={<div></div>}>
    </Suspense>
  )
}

export default CassetteModel;