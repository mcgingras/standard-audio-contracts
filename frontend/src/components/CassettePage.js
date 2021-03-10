import React from 'react';

import Cassette from './Cassette';
const CassettePage = () => {
    return (
        <>
        <div className="bg-red-500 py-20">
            <div className="max-w-sm mx-auto">
                <Cassette color="red" title="m.a.a.d city" />
            </div>
        </div>
        <div className="mt-12 max-w-screen-md mx-auto">
            <h2 class="text-4xl font-bold">m.a.a.d. city</h2>
            <h4 className="text-base text-gray-500 mt-1">Cassette #0001</h4>

            <h2 className="mt-8 text-xl font-bold">Tracklist</h2>
            <ul className="text-gray-700 ml-2 mt-2">
                <li>1. Song 1</li>
                <li>2. Song 2</li>
                <li>3. Song 3</li>
                <li>4. Song 4</li>
                <li>5. Song 5</li>
            </ul>

            <h2 className="mt-8 text-xl font-bold">Attributes</h2>
            <ul className="text-gray-700 mt-2">
                <li>capacity: 5</li>
                <li>quality: pure</li>
                <li>color: red</li>
            </ul>
        </div>
        </>

    )
}

export default CassettePage;