import React, {useEffect, useState} from "react";

// We could probably make this a hook instead but ah its fine for no
function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
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

    return (
        <div className="container mx-auto">
            Mixtape NFT
            { !isLoggedIn ? <a href="http://localhost:8888/login">login to spotify</a> :
            <div>
                <input
                className="border-l border-t border-r mt-2 w-full rounded-t-lg px-4 py-2"
                type="text"
                placeholder="Search Spotify"
                onChange={e => setQuery(e.target.value)}
                />
                {isSearching && <div>Searching ...</div>}
                <div className="border rounded-b-lg">
                    {tracks.map(result => (
                    <div key={result.id} onClick={() => {setSongs([...songs, result.id])}} className="hover:bg-gray-200 w-full px-4 py-1">
                        <h4>{result.name} - {result.artists.map((artist) => artist.name)}</h4>
                    </div>
                    ))}
                </div>
            </div>
            }
            {songs.map(result => (
                <div key={result.id} className="hover:bg-gray-200 w-full px-4 py-1">
                    selected song....
                </div>
            ))}
        </div>
    )
}

export default Home;