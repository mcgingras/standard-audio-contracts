import React, {useEffect, useState} from "react";
const axios = require('axios');

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

const Home = () => {
    const [token, setToken] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([])
    const [isSearching, setIsSearching] = useState(false);
    const debouncedQuery = useDebounce(query, 500);

    const [songs, setSongs] = useState([]);

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

    return (
        <div className="container mx-auto">
            Mixtape NFT
            { !isLoggedIn ? <a href="http://localhost:8888/login">login to spotify</a> :
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault();

                    const formData = new FormData(event.target);
                    const value = Object.fromEntries(formData.entries());
                    console.log(value);
                    pinJSONToIPFS(value);
                }}>
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
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        });
};

export default Home;