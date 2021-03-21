import React from 'react'
import Cassette from './Cassette';

const CassetteGrid = ({cassettes}) => {
  return (
    <div class="grid grid-cols-4 gap-4">
      {
        cassettes.map((cassette) => {
          return (
            <Cassette />
          )
        })
      }
    </div>
  )
}

export default CassetteGrid;