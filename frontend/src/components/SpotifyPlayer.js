import React, { useState, useEffect } from 'react';
import { play, next, previous, pause, seek, getDevices, getPlaybackState } from '../spotify';

const SpotifyPlayer = ({uris}) => {
  const savedToken = localStorage.getItem('spotify_token');
  const [token, setToken] = useState(savedToken || "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [deviceId, setDeviceId] = useState(undefined);
  const [devices, setDevices] = useState(undefined);
  const [initializing, setInitializing] = useState(true);

  // range slider
  const [songProgress, setSongProgress] = useState(0);
  const [songLength, setSongLength] = useState(10);

  const initializePlayer = () => {
    const player = new window.Spotify.Player({
      getOAuthToken: (cb) => {
        cb(token);
      }
    })

    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => {
      console.log(state);
      initializeState(state);
    });

    // Ready
    player.addListener('ready', ({ device_id }) => { handlePlayerStatus(device_id) });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => { handlePlayerStatus(device_id) });

    // Connect to the player
    player.connect();
    console.log(player);

    setPlayer(player);
  }

  const handlePlayerStatus = async (device_id) => {
    const { deviceId, devices } = await initializeDevices(device_id);
    setDeviceId(device_id);
    setDevices(devices);
    setInitializing(false);
    // status: device_id ? STATUS.READY : STATUS.IDLE,
  }

  const initializeDevices = async (id) => {
    const {devices} = await getDevices(token);
    return { id, devices }
  }

  const initializeState = (state) => {

    const progressSong = (val, duration) => {
      if (val < duration) {
        setSongProgress(val);
        setTimeout(() => {
          progressSong(val+1000, duration);
        }, 1000);
      }
    }

    if (!state.paused) {
      setSongLength(state.duration);
      progressSong(state.position, state.duration);
    }

  }

  const getState = async () => {
    const state = await getPlaybackState(token);
    setSongProgress(state.progress_ms);
    setSongLength(state.item.duration_ms);
  }


  useEffect(() => {
    if (!window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady = initializePlayer;
    } else
    {
      initializePlayer();
    }
  }, [])

  return (
    <div>
      {
        !initializing &&
        <div class="flex">
          <button className="text-white mr-2" onClick={() => {previous(token)}}>
            <svg width="1em" height="1em" viewBox="0 0 128 128" preserveAspectRatio="xMidYMid">
              <path d="M29.09 53.749V5.819H5.819v116.363h23.273v-47.93L122.18 128V0z" fill="currentColor" />
            </svg>
          </button>
          { !isPlaying
            ?
            <button className="border rounded-full border-white p-4 text-white flex" onClick={() => { play(uris, deviceId, token); setIsPlaying(true); }}>
              <svg width="1em" height="1em" viewBox="0 0 128 128" preserveAspectRatio="xMidYMid">
                <path d="M119.351 64L8.65 0v128z" fill="currentColor" />
              </svg>
            </button>
            :
            <button className="border rounded-full border-white p-4 text-white flex" onClick={() => { pause(token); setIsPlaying(false); }}>
              <svg width="1em" height="1em" viewBox="0 0 128 128" preserveAspectRatio="xMidYMid">
                <path d="M41.86 128V0H8.648v128h33.21zm77.491 0V0h-33.21v128h33.21z" fill="currentColor" />
              </svg>
            </button>
          }
          <button className="text-white mx-2" onClick={() => {next(token)}}>
            <svg width="1em" height="1em" viewBox="0 0 128 128" preserveAspectRatio="xMidYMid">
              <path
                d="M98.91 53.749L5.817 0v128L98.91 74.251v47.93h23.273V5.819H98.909z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* <button onClick={() => { getState() }}>
            state
          </button> */}

          <input class="flex-grow" type="range" value={songProgress} min={0} max={songLength} />
        </div>

      }
    </div>
  )
}

export default SpotifyPlayer;