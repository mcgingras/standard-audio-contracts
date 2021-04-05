import React, { useState, useEffect } from 'react';

const SpotifyPlayer = () => {
  const [token, setToken] = useState(undefined);
  const [player, setPlayer] = useState(undefined);

  const initializePlayer = () => {
    console.log("initializing player")
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
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();

    setPlayer(player);
  }

  const handlePlayerStatus = async ({device_id}) => {
    console.log("ready")
    console.log(device_id)
    // const { deviceId, devices } = await initializeDevices(device_id);
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
    </div>
  )
}

export default SpotifyPlayer;