import React from 'react';
import Nav from '../components/Nav';
import CassetteGrid from '../components/CassetteGrid';
import Cassette from '../components/Cassette';

const cassetteDemoData = [
  1,
  2,
  3,
  4
]

const Homepage = () => {
  return (
    <div>
      <section class="bg-purple-800">
        <div class="container mx-auto pt-10">
        <Nav />
        <div class="py-40">
          <h1 class="text-white text-4xl w-3/5" style={{"line-height": "3rem"}}>NFTapes bring cassettes to the digital age.</h1>
          <h3 class="text-white text-xl w-2/5 mt-4">Create a digital mixtape that is unique and rewriteable with songs served from Spotify.</h3>
        </div>
        </div>
      </section>

      <section class="container mx-auto mt-10">
        <CassetteGrid cassettes={cassetteDemoData} />
      </section>
    </div>
  )
}

export default Homepage;