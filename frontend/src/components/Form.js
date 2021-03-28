import React, {useEffect, useState} from "react";

const axios = require('axios');
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

const Form = ({contract}) => {
    const [token, setToken] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedQuery = useDebounce(query, 500);

    const [songs, setSongs] = useState([]);
    const [txHash, setTxHash] = useState(undefined);
    const [txError, setTxError] = useState(undefined);
    const [txBeingSent, setTxBeingSent] = useState(undefined);

    const mintToken = async (to, uri) => {
        try {
              const tx = await contract.createMixtape(to, uri);
              setTxHash(tx.hash);

              const receipt = await tx.wait();
                if (receipt.status === 0) {
                    throw new Error("Transaction failed");
                }

          } catch (error) {
              console.log(error);
              if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                return;
              }
              setTxError(error);
          } finally {
            setTxBeingSent(undefined);
          }
    }

    useEffect(() => {
        let urlstring = window.location.href;
        let url = new URL(urlstring);
        let c = url.searchParams.get('access_token');

        if (c) {
          setLoggedIn(true);
          setToken(c);
        }
      }, []);


      const searchSpotify = (q) => {
        return fetch(`https://api.spotify.com/v1/search/?q=${q}&type=track`, {
          method: 'GET',
          headers: new Headers({
            'Authorization': `Bearer ${token}`,
          }),
        })
          .then(res => res.json())
      }

      // Effect for API call
      useEffect(
        () => {
          if (debouncedQuery) {
            setIsSearching(true);
            searchSpotify(debouncedQuery).then(results => {
              console.log(results);
              setIsSearching(false);
              setTracks(results.tracks.items);
            });
          } else {
            setTracks([]);
          }
        },
        [debouncedQuery] // Only call effect if debounced search term changes
      );

      const addSong = (song) => {
          let songData = {
              id: song.id,
              name: song.name,
              artists: song.artists.map((artist) => artist.name).join(', ')
          }
          setSongs([...songs, songData])
      }

    const mintNFT = async (event) => {
        event.preventDefault();

        // package form data
        const formdata = new FormData(event.target);
        const value = Object.fromEntries(formdata.entries());

        // send form data off to pinata, collect ipfs hash
        let ipfsResponse = await pinJSONToIPFS(value);
        let hash = ipfsResponse.data.IpfsHash;

        // mint NFT to chain
        let response = await mintToken("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", hash);
        console.log(response);
    }

    return (
        <div className="mt-4 max-w-screen-md mx-auto">
            <h1 className="text-3xl font-bold">Claim your Cassette</h1>
            { !isLoggedIn
            ?
            <div>
                <p>You must be logged into spotify to claim a cassette.</p>
                <a href="http://localhost:8888/login" className="self-end flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Login to Spotify</a>
            </div>
            :
            <form onSubmit={(event) => { mintNFT(event) }}>
            <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-3">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mt-4 mb-2">Title</label>
                            <input type="text" name="title" className="border focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md px-4 py-2" />
                        </div>
                        <label className="block text-sm font-bold text-gray-700 mt-4 mb-2">Tracklist</label>
                        <div className="border p-4 rounded-md">
                            {songs.length === 0 &&
                            <div className="text-gray-500 text-center p-10">
                                Tracklist empty! <br/>
                                Add tracks with the searchbar to the right &rarr;
                            </div>
                            }
                            {songs.map((result, index) => (
                            <div key={result.id} className="w-full px-4 py-1">
                                {`${index + 1}. ${result.name} - ${result.artists}`}
                                <input type="hidden" name={`song-${index}`} value={result.id} />
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mt-4 mb-2">Add Songs</label>
                        <input
                        className={query ? "border-l border-t border-r w-full rounded-t-lg px-4 py-2" : "border w-full rounded-lg px-4 py-2"}
                        type="text"
                        placeholder="Search Spotify"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        />
                        {isSearching && <div>Searching ...</div>}
                        <div className={query && "border rounded-b-lg shadow-md max-h-96 overflow-scroll"}>
                            {tracks.map(result => (
                            <div key={result.id} onClick={() => addSong(result)} className="hover:bg-gray-200 w-full px-2 py-2 flex">
                                <img src={result.album.images[2].url} />
                                <div className="ml-2">
                                    <h4 className="font-lg">{result.name}</h4>
                                    <h4 className="text-gray-500">{result.artists.map((artist) => artist.name).join(', ')}</h4>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-5 border-t">
                        <button type="submit" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Create
                        </button>
                    </div>
                </div>
            </form>
            }
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
        return response;
    })
    .catch(function (error) {
        console.log(error)
    });
};

// We could probably make this a hook instead but ah its fine for now
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        return () => { clearTimeout(handler) };
      },
      [value, delay]
    );
    return debouncedValue;
}

export default Form;