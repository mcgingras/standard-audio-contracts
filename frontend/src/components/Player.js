import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = () => {
    const [token, setToken] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [uris, setUris] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedQuery = useDebounce(query, 500);

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

      const addUri = (track) => {
          let uri = track.uri;
          setUris([...uris, uri]);
          console.log(uris);
      }

      return (
          <div className="mt-4 max-w-screen-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">Cassette Player (demo)</h1>
            { !isLoggedIn
            ?
            <div>
                <p>You must be logged into spotify to listen to cassettes.</p>
                <a href="http://localhost:8888/login" className="self-end flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Login to Spotify</a>
            </div>
            :
            <div>
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
                    <div key={result.id} onClick={() => addUri(result)} className="hover:bg-gray-200 w-full px-2 py-2 flex">
                        <img src={result.album.images[2].url} />
                        <div className="ml-2">
                            <h4 className="font-lg">{result.name}</h4>
                            <h4 className="text-gray-500">{result.artists.map((artist) => artist.name).join(', ')}</h4>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="mt-12">
                {token &&
                    <SpotifyPlayer
                        token={token}
                        uris={uris}
                    />
                }
                </div>
            </div>
            }
          </div>
      )

}

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

export default Player;