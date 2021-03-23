import React from 'react';
import CassetteModel from '../components/CassetteModel';
import Demo from '../components/three/Demo';

const TapeShow = () => {
  return (
    <div className="min-h-screen h-screen relative">
      <CassetteModel />

      <h1 className="fixed top-0 text-4xl p-8">Classic Tape</h1>
      <div className="fixed p-4 bg-blue-500 bottom-0 w-3/4 m-8">
        <div className="grid grid-cols-4">
          <div>
           You currently own this tape
          </div>
        </div>
      </div>
      {/* <Demo /> */}
    </div>
  )
}

export default TapeShow;