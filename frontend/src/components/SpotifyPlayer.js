import React, { useState, useEffect } from 'react';
import { play, next, previous, pause, seek, getDevices } from '../spotify';

const SpotifyPlayer = ({uris}) => {
  const savedToken = localStorage.getItem('spotify_token');
  const [token, setToken] = useState(savedToken || "");
  const [player, setPlayer] = useState(undefined);
  const [deviceId, setDeviceId] = useState(undefined);
  const [devices, setDevices] = useState(undefined);
  const [initializing, setInitializing] = useState(true);

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
    player.addListener('player_state_changed', state => { console.log(state); });

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
      player
      {
        !initializing &&
        <button onClick={() => {play(uris, deviceId, token)}}>play</button>
      }
    </div>
  )
}

export default SpotifyPlayer;