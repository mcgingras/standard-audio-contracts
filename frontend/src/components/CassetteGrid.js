import React from 'react'
import Cassette from './Cassette';

const CassetteGrid = ({cassettes}) => {
  console.log(cassettes);

  return (
    <div className="grid grid-cols-4 gap-8">
      {
        cassettes.map((cassette) => {
          return (
            <Cassette key={cassette.id} id={cassette.id} />
          )
        })
      }
    </div>
  )
}

export default CassetteGrid;