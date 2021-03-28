import React from 'react';
import { Link } from "react-router-dom";
import cw from '../assets/images/crystal_watermelon.png';
import wave from '../assets/images/wave.svg';

const Cassette = ({color, title}) => {
    return (
        <Link to="/tapes/1">
          <div className="bg-red-500 rounded-md flex flex-col cursor-pointer">
            <img src={cw} className="mx-auto" alt="cassette model" />
            <div className="p-4 flex justify-between bg-green-300 rounded-b-md">
              <img src={wave} className="" alt="audio waveform" />
              <span>60min</span>
              <span>2.00E</span>
            </div>
          </div>
        </Link>
    )
}

export default Cassette;