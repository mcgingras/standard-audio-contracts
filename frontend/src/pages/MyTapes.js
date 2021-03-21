import React from 'react';
import Nav from '../components/Nav';

const MyTapes = () => {
  return (
    <div>
      <section class="bg-purple-800">
        <div class="container mx-auto pt-10">
        <Nav />
        <div class="py-40">
          <h1 class="text-white text-4xl w-3/5" style={{"line-height": "3rem"}}>My Tapes</h1>
          <h3 class="text-white text-xl w-2/5 mt-4">Here are all your tapes, click them to load songs onto them, listen to them, or manage them.</h3>
        </div>
        </div>
      </section>
    </div>
  )
}

export default MyTapes;