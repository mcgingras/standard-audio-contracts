import React from 'react';

const Cassette = ({color, title}) => {
    return (
        <div className={`bg-${color}-200 p-3 rounded-lg relative hover:shadow-lg cursor-pointer`}>
            <div className={`w-100 h-20 bg-${color}-500 rounded-lg`}>
                <div className="flex justify-around items-center h-full w-1/2 mx-auto">
                    <div className="rounded-full h-5 w-5 bg-gray-900"></div>
                    <div className="h-4 w-10 bg-gray-900"></div>
                    <div className="rounded-full h-5 w-5 bg-gray-900"></div>
                </div>
            </div>
            <div className="w-100 bg-white text-center text-xs my-2 py-1 text-gray-700">
                {title}
            </div>
            <div className={`absolute h-2 w-2 bg-${color}-900 top-0 left-0 m-1 rounded-full`}></div>
            <div className={`absolute h-2 w-2 bg-${color}-900 top-0 right-0 m-1 rounded-full`}></div>
            <div className={`absolute h-2 w-2 bg-${color}-900 bottom-0 left-0 m-1 rounded-full`}></div>
            <div className={`absolute h-2 w-2 bg-${color}-900 bottom-0 right-0 m-1 rounded-full`}></div>
        </div>
    )
}

export default Cassette;