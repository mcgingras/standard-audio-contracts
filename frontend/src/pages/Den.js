import React, { useEffect, useState } from 'react';
import SpotifyPlayer from "../components/SpotifyPlayer";

const Den = () => {
  const savedToken = localStorage.getItem('spotify_token');
  const [tape, setTape] = useState(undefined);
  const [uris, setUris] = useState([]);
  const [token, setToken] = useState(savedToken || "");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [activeTrack, setActiveTrack] = useState(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);


  useEffect(() => {
    let id = window.location.pathname.substring(window.location.pathname.length - 1)
    fetchTapes(id)
    .then(results => {
      setTape(results);
    })
  }, [])

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
    else {
    let urlstring = window.location.href;
    let url = new URL(urlstring);
    let c = url.searchParams.get('access_token');
    console.log(c);

    if (c) {
      setLoggedIn(true);
      setToken(c);
    }
  }
  }, []);

  useEffect(() => {
    if(tape){
      const uris = tape.songs.map((song) => { return song.uri })
      setUris(uris);
    }
  }, [tape])

  return (
      <div>
        { !isLoggedIn
          ?
          <div>you need to be logged in</div>
          :
          <div className="grid grid-cols-4 h-screen">
            <div className="col-span-3 bg-yellow-500 relative">
              <div className="absolute bottom-0 w-full px-8 py-4">
                <SpotifyPlayer uris={uris} setActiveTrack={setActiveTrack} setCurrentTrackIndex={setCurrentTrackIndex} />
              </div>
            </div>

              <div className="col-span-1 bg-gray-900 p-4">
              {
                tape && activeTrack &&
                <>
                  {
                    tape.songs.slice(currentTrackIndex-1, currentTrackIndex).map((tape) => {
                      return (
                        <div className="p-4 bg-gray-700 text-white rounded mb-4">
                          <span className="font-bold text-sm">{ tape.name }</span>
                          <span className="text-sm">- { tape.artists }</span>
                        </div>
                      )
                    })
                  }
                  <h2 className="text-white text-2xl font-bold">{ activeTrack.name }</h2>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <img src={activeTrack.album.images[0].url} />
                    <div className="flex flex-col">
                      <span className="text-white text-sm">{activeTrack.artists[0].name}</span>
                      <span className="text-white text-sm">{activeTrack.album.name}</span>
                    </div>
                  </div>
                  <p className="text-gray-200 font-bold mt-12 mb-4">Up Next</p>
                  {
                    tape.songs.slice(currentTrackIndex+1).map((tape) => {
                      return (
                        <div className="p-4 bg-gray-700 text-white rounded mb-4">
                          <span className="font-bold text-sm">{ tape.name }</span>
                          <span className="text-sm">- { tape.artists }</span>
                        </div>
                      )
                    })
                  }
                </>
              }
              </div>
          </div>
        }
      </div>
  )
}

export default Den;

const fetchTapes = (id) => {
  return fetch(`http://localhost:1234/tape/${id}`, {
    method: 'GET'
  })
  .then(res => res.json())
}