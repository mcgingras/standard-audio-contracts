import React from 'react';
import { Link } from "react-router-dom";
import cw from '../assets/images/crystal_watermelon.png';
import wave from '../assets/images/wave.svg';

const Cassette = ({color, title}) => {
    return (
        <Link to="/tapes/1">
          <div className="bg-red-500 rounded-md flex flex-col cursor-pointer">
            <img src={cw} class="mx-auto" />
            <div class="p-4 flex justify-between bg-green-300 rounded-b-md">
              <img src={wave} class="" />
              <span>60min</span>
              <span>2.00E</span>
            </div>
          </div>
        </Link>
    )
}

export default Cassette;