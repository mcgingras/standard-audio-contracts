import React, {useState, useEffect} from 'react';
import CassetteModel from '../components/CassetteModel';
import Demo from '../components/three/Demo';

const demoStats = {
  "Duration": "60 Min",
  "Shader": "Holo",
  "Rarity": "96.9",
  "Edition": "1",
  "Aisle": "6",
  "Bay": "12",
  "Core": "Bright",
  "Quality": "Bitty"
}
const Stat = ({k, v}) => {
  return (
    <div class="flex justify-between">
      <span className="mr-2 text-sm">{k}</span>
      <span className="bg-gray-900 text-sm text-blue-500 p-1">{v}</span>
    </div>
  )
}
const TapeShow = () => {
  const [tape, setTape] = useState(undefined);

  const fetchTapes = (id) => {
    return fetch(`http://localhost:1234/tape/${id}`, {
      method: 'GET'
    })
    .then(res => res.json())
  }

  useEffect(() => {
    let id = window.location.pathname.substring(window.location.pathname.length - 1)

    fetchTapes(id)
    .then(results => {
      setTape(results);
    })
  }, [])


  return (
    <div className="min-h-screen h-screen relative">
      {
        tape != undefined &&
        <CassetteModel colors={tape.colorMap} />
      }
      <h1 className="fixed top-0 text-4xl p-8">Classic Tape</h1>
      <div className="fixed p-4 bg-blue-500 bottom-0 w-4/5 m-8">
        <div className="grid grid-cols-4">
          <div className="flex flex-col">
            Tape #244
            You currently own this tape.
          </div>
          <div className="flex flex-col">
            Tape Stats
            <div className="grid grid-cols-2 gap-2 pr-4">
              {Object.entries(demoStats).map(([key, value]) => {
                  return (
                    <Stat k={key} v={value} />
                  )
                })}
            </div>
          </div>
          <div className="text-sm">
           You need a Spotify Premium account to interact with this cassette. Please connect your account.
          </div>
          <div className="flex flex-col justify-between">
            <span className="uppercase text-center text-xs">Last sold for</span>
            <span className="text-xl text-center font-bold">4.0 ETH</span>
            <button className="bg-gray-900 px-4 py-2 text-blue-500 rounded-full">List for Sale</button>
          </div>
        </div>
      </div>
      {/* <Demo /> */}
    </div>
  )
}

export default TapeShow;