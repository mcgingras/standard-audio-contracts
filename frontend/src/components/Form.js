import React from 'react';
const axios = require('axios');

// Form for submitting NFTs
// really basic right now, not tying this to spotify
// just want to test parsing JSON and submitting to Pinata
const Form = () => {
    return (
        <div className="container mx-auto">
            <h1>Create a Mixtape</h1>
            <form
                onSubmit={(event) => {
                    event.preventDefault();

                    const formData = new FormData(event.target);
                    const value = Object.fromEntries(formData.entries());
                    pinJSONToIPFS(value);
                }}
            >
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" className="border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">Song 1</label>
                    <input type="text" name="song1" className="border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">Song 2</label>
                    <input type="text" name="song2" className="border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">Song 3</label>
                    <input type="text" name="song3" className="border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                </div>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

const pinJSONToIPFS = (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY
            }
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        });
};

export default Form;