import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {

  return (
    <nav class="flex justify-end">
      <div class="rounded-md flex bg-white text-gray-900">
        <Link to="/" class="rounded-l-md p-2 hover:bg-yellow-200">About</Link>
        <Link to="/tapes" class="p-2 hover:bg-yellow-200">All Tapes</Link>
        <Link to="/" class="rounded-r-md p-2 hover:bg-yellow-200">Claim a Tape</Link>
      </div>
      <button class="ml-4 bg-pink-500 hover:bg-pink-600 rounded-full px-4"><Link to="/shelf">My Tapes</Link></button>
      <button class="ml-4 bg-green-300 hover:bg-green-400 rounded-full px-4"><Link to="/">Listen in the Den</Link></button>
    </nav>
  )
}

export default Nav;