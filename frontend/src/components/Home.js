import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';

import Modal from './Modal';
import Cassette from './Cassette';


const Home = () => {
    const state = useSelector(state => state.test);

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-gradient-to-r from-light-blue-800 to-cyan-600 w-100">
                <div className="max-w-screen-xl mx-auto">
                    <div className="py-16 flex justify-between">
                        <div>
                            <h3 className="text-white text-4xl font-semibold">The same mixtapes you love,</h3>
                            <h3 className="text-white text-4xl font-semibold text-opacity-50">now on the Ethereum network.</h3>
                        </div>
                        <a href="/new" className="self-end flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Claim Cassette</a>
                    </div>
                </div>
            </header>
            <div className="max-w-screen-xl mx-auto">
                <h3 className="text-gray-700 font-semibold text-lg mt-16">For Sale</h3>
                <h5 className="text-gray-500 text-base mt-2">These cassettes are currently for sale by their owner.</h5>
                <div className="grid grid-cols-4 gap-8 mt-8">
                    <Cassette color="gray" title="kool aid and frozen pizza" />
                    <Cassette color="red" title="m.a.a.d city" />
                    <Cassette color="green" title="views" />
                    <Cassette color="yellow" title="If youre reading this its too late" />
                    <Cassette color="blue" title="more life" />
                    <Cassette color="indigo" title="In Colour" />
                    <Cassette color="purple" title="DAMN." />
                    <Cassette color="pink" title="Best Day Ever" />
                </div>
                <h3 className="text-gray-700 font-semibold text-lg mt-16">Open Bids</h3>
                <h5 className="text-gray-500 text-base mt-2">These cassettes currently have open bids.</h5>
                <div className="grid grid-cols-4 gap-8 mt-8">
                    <Cassette color="gray" title="kool aid and frozen pizza" />
                    <Cassette color="red" title="m.a.a.d city" />
                    <Cassette color="green" title="views" />
                    <Cassette color="yellow" title="If youre reading this its too late" />
                    <Cassette color="blue" title="more life" />
                    <Cassette color="indigo" title="In Colour" />
                    <Cassette color="purple" title="DAMN." />
                    <Cassette color="pink" title="Best Day Ever" />
                </div>
            </div>
            <footer className="max-w-screen-xl mx-auto mt-16 border-t py-4">
                <span className="text-sm text-gray-500">mg - 2021</span>
            </footer>
        </div>
    )
}

export default Home;