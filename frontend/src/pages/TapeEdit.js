import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";

const TapeEdit = () => {
  const [token, setToken] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const [songs, setSongs] = useState([]);

  const searchSpotify = (q) => {
    return fetch(`https://api.spotify.com/v1/search/?q=${q}&type=track`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${token}`,
      }),
    })
      .then(res => res.json())
  }

  useEffect(() => {
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

  useEffect(() => {
    let urlstring = window.location.href;
    let url = new URL(urlstring);
    let c = url.searchParams.get('access_token');

    if (c) {
      setLoggedIn(true);
      setToken(c);
    }
  }, []);

  const addSong = (song) => {
    let songData = {
        id: song.id,
        name: song.name,
        artists: song.artists.map((artist) => artist.name).join(', ')
    }
    setSongs([...songs, songData])
  }

  return (
    <div class="bg-gray-800 text-white">
      <div class="container mx-auto min-h-screen">
      { !isLoggedIn
        ?
          <>
          <div class="pt-16 mb-8 flex justify-between items-center">
            <h1 class="text-2xl font-bold">Configure Cassette</h1>
            <Link to="/tape/4" class="uppercase text-sm">Back to Viewer</Link>
          </div>
          <div class="flex flex-col">
            <span class="bg-gray-700 p-16 text-center rounded-md">NFTapes requires you have Spotify account to add and listen to songs from cassettes. Please login.</span>
            <button class="bg-green-300 hover:bg-green-400 text-gray-900 self-start px-4 py-2 rounded-full mx-auto mt-8"><a href="http://localhost:8888/login">Log into Spotify</a></button>
          </div>
          </>
        :
        <>
        <div class="pt-16 mb-8 flex justify-between items-center">
          <h1 class="text-2xl font-bold">Configure Cassette</h1>
          <Link to="/tape/4" class="uppercase text-sm">Back to Viewer</Link>
        </div>

        <section class="grid grid-cols-2 gap-8 mb-12">
          <div>
            <div class="flex flex-col mb-8">
              <label class="mb-2">Cassette Title</label>
              <input type="text" class="rounded-md px-4 py-2 text-gray-900" placeholder="title" />
            </div>

            <div>
              <label class="mb-2 block">Tracklist</label>
              <ul>
                {songs.map((result, index) => (
                  <li key={result.id} className="bg-gray-700 p-4 rounded-md block mb-4">
                      {`${index + 1}. ${result.name} - ${result.artists}`}
                      <input type="hidden" name={`song-${index}`} value={result.id} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div class="flex flex-col">
              <label class="mb-2">Add Songs</label>
              <input
                type="text"
                class="rounded-lg px-4 py-2 text-gray-900"
                placeholder="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              {isSearching && <div>Searching ...</div>}
              <div className={query && "bg-white border rounded-b-lg shadow-md max-h-96 overflow-scroll rounded-b-lg"}>
                  {tracks.map(result => (
                  <div key={result.id} onClick={() => addSong(result)} className="hover:bg-gray-200 w-full px-2 py-2 flex">
                      <img src={result.album.images[2].url} />
                      <div className="ml-2">
                          <h4 className="font-lg text-gray-500">{result.name}</h4>
                          <h4 className="text-gray-500">{result.artists.map((artist) => artist.name).join(', ')}</h4>
                      </div>
                  </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
        </>
        }
      </div>
    </div>
  )
}

export default TapeEdit;

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