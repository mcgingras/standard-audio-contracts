import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {

  return (
    <nav className="flex justify-end">
      <div className="rounded-md flex bg-white text-gray-900">
        <Link to="/" className="rounded-l-md p-2 hover:bg-yellow-200">About</Link>
        <Link to="/tapes" className="p-2 hover:bg-yellow-200">All Tapes</Link>
        <Link to="/" className="rounded-r-md p-2 hover:bg-yellow-200">Claim a Tape</Link>
      </div>
      <button className="ml-4 bg-pink-500 hover:bg-pink-600 rounded-full px-4"><Link to="/shelf">My Tapes</Link></button>
      <button className="ml-4 bg-green-300 hover:bg-green-400 rounded-full px-4"><Link to="/">Listen in the Den</Link></button>
    </nav>
  )
}

export default Nav;