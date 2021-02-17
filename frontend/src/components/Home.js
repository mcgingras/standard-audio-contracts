import React, {useEffect, useState} from "react";
const axios = require('axios');

const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

const Home = ({contract}) => {
    const [token, setToken] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([])
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
      }, [])

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
          setQuery("");
          let songData = {
              id: song.id,
              name: song.name
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
        <div className="container mx-auto">
            Mixtape NFT
            { !isLoggedIn ? <a href="http://localhost:8888/login">login to spotify</a> :
            <div>
                <form onSubmit={(event) => { mintNFT(event) }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" className="border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <label className="block text-sm font-medium text-gray-700">Songs</label>
                    <input
                    className="border-l border-t border-r w-full rounded-t-lg px-4 py-2"
                    type="text"
                    placeholder="Search Spotify"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    />
                    {isSearching && <div>Searching ...</div>}
                    <div className="border rounded-b-lg">
                        {tracks.map(result => (
                        <div key={result.id} onClick={() => addSong(result)} className="hover:bg-gray-200 w-full px-4 py-1">
                            <h4>{result.name} - {result.artists.map((artist) => artist.name)}</h4>
                        </div>
                        ))}
                    </div>
                    {songs.map((result, index) => (
                    <div key={result.id} className="w-full px-4 py-1">
                        {result.name}
                        <input type="hidden" name={`song-${index}`} value={result.id} />
                    </div>
                    ))}
                    <button type="submit">submit</button>
                </form>
            </div>
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

        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay]
    );

    return debouncedValue;
}

export default Home;