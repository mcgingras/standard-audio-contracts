import React from 'react';
import Header from './Header';

// Placeholder for the cassettes
// will fill this out later.
const Placeholder = () => {
    return (
        <div className="cursor-pointer bg-white p-8 border rounded-lg hover:shadow-md text-center text-gray-500">cassette name</div>
    )
}

// Copy could use some work here by eh, its here.
const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="max-w-screen-xl mx-auto">
                <h3 className="text-gray-700 font-semibold text-lg mt-16">For Sale</h3>
                <h5 className="text-gray-500 text-base mt-2">These cassettes are currently for sale by their owner.</h5>
                <div className="grid grid-cols-6 gap-8 mt-8">
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                </div>
                <h3 className="text-gray-700 font-semibold text-lg mt-16">Open Bids</h3>
                <h5 className="text-gray-500 text-base mt-2">These cassettes currently have open bids.</h5>
                <div className="grid grid-cols-6 gap-8 mt-8">
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                    <Placeholder />
                </div>
            </div>
            <footer className="max-w-screen-xl mx-auto mt-16 border-t py-4">
                <span className="text-sm text-gray-500">mg - 2021</span>
            </footer>
        </div>
    )
}

export default Home;