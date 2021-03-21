import React from 'react';
import Nav from '../components/Nav';
import CassetteGrid from '../components/CassetteGrid';

const TapeIndex = () => {
  return (
    <div>
      <section class="bg-purple-800">
        <div class="container mx-auto pt-10">
        <Nav />
        <div class="py-40">
          <h1 class="text-white text-4xl w-3/5" style={{"line-height": "3rem"}}>All Tapes</h1>
          <h3 class="text-white text-xl w-2/5 mt-4">A catalog of all 500 tapes in existence.</h3>
        </div>
        </div>
      </section>

      <section class="container mx-auto mt-10">
        <CassetteGrid cassettes={[1,2,3,4]} />
      </section>
    </div>
  )
}

export default TapeIndex;