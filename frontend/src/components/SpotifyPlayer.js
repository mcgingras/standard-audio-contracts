import React, { useState, useEffect, useRef } from 'react';
import { play, next, previous, pause, seek } from '../spotify';

const SpotifyPlayer = ({ uris, setActiveTrack, setCurrentTrackIndex }) => {
  const savedToken = localStorage.getItem('spotify_token');
  const [token, setToken] = useState(savedToken || "");
  const [deviceId, setDeviceId] = useState(undefined);
  const [initializing, setInitializing] = useState(true);
  const [error,setError] = useState(null);

  const [scrubPb, setScrubPb] = useState(null);
  const [playback, setPlayback] = useState(0);
  const [load, setLoad] = useState(false);
  let playerRef = useRef(null);

  let [count, setCount] = useState({
    progress: 0,
    total_time: 0,
    play: false
  });

  //
  //
  // SETUP
  //
  //

  /**
   * Initializes the Spotify SDK.
   * When the WebPlaybackSDK is ready we call initializePlayer
   * initializePlayer is the entry to the app.
   */
  useEffect(() => {
    if (!window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady = initializePlayer;
    } else
    {
      initializePlayer();
    }
  }, []);


  /**
   * initializePlayer creates a new spotify player
   * and adds a variety of event listeners.
   */
  const initializePlayer = () => {
    console.log("Initializing player...")
    const player = new window.Spotify.Player({
      getOAuthToken: (cb) => {
        cb(token);
      }
    })

    player.addListener('initialization_error', ({ message }) => { setError(message); });
    player.addListener('authentication_error', ({ message }) => { setError(message); });
    player.addListener('account_error', ({ message }) => { setError(message);});
    player.addListener('playback_error', ({ message }) => { setError(message); });

    player.addListener("player_state_changed", (player_state) => {
      setActiveTrack(player_state.track_window.current_track);
      setPlayback(player_state.position / player_state.duration);
      setCount((m) => ({
        ...m,
        play: !player_state.paused,
        progress: player_state.position,
        total_time: player_state.duration
      }))
		});

    player.addListener('ready', ({ device_id }) => { handlePlayerStatus(device_id) });
    player.addListener('not_ready', ({ device_id }) => { setError("player has gone offline"); });

    player.connect();
    playerRef.current = player;
  }

  /**
   * When the player is creates a "Device ID"
   * A device ID is the name of a device capable of using spotify.
   * An iPhone could be a device, or a laptop. In this case, we
   * get a deviceID for the browser session. We need this device ID
   * for future API calls, so we store it as state.
   *
   * With that, the initialization is complete, so we set another
   * piece of state letting the rest of the view know it is
   * okay to continue.
   */
  const handlePlayerStatus = async (device_id) => {
    console.log("Setting device ID - initialization complete...")
    setDeviceId(device_id);
    setInitializing(false);
  }

  //
  //
  // CONTROLS
  //
  //

  const togglePlay = async () => {
    if (!load) {
      play(uris, deviceId, token);
      setLoad(true);
    } else {
      const response = await playerRef.current.togglePlay();
      setCount((m) => ({ ...m, play: !m.play }))

      if (!response.status === 204) {
        setError("cannot play");
      }
    }
  }

  const togglePrevious = async () => {
    const response = await previous(token);
    setCurrentTrackIndex((index) => index + - 1);

    if (!response.status === 204) {
      setError("Beginning of tape - no previous songs.");
    }
  }

  const toggleNext = async () => {
    const response = await next(token)
    setCurrentTrackIndex((index) => index + 1)

    if (!response.status === 204) {
      setError("End of tape - no songs remain.");
    }
  }

  useInterval(() => {
    const interval = 500 / count.total_time;
    setPlayback((playback) => playback + interval);
    setCount((m) => ({...m, progress: m.progress + 500}))
  }, count.play ? 500 : null)


  const seekPlayback = async (ratio) => {
		const time = Math.round(ratio * count.total_time);
    const response = await seek(time, token);

    if (response.status === 204) {
      setPlayback(ratio);
      setCount((c) => ({ ...c, progress: time }))
    } else {
      setError("Error seeking.");
    }

		setScrubPb(null);
	};

	const scrubPlayback = (ratio) => {
		const time = ratio * count.total_time;
		setScrubPb(time);
	};


  return (
    <div>
      {error}
      {
        !initializing &&
        <div className="flex items-center">
          <button className="text-white mr-2" onClick={() => { togglePrevious() }}>
            <svg width="1em" height="1em" viewBox="0 0 128 128" preserveAspectRatio="xMidYMid">
              <path d="M29.09 53.749V5.819H5.819v116.363h23.273v-47.93L122.18 128V0z" fill="currentColor" />
            </svg>
          </button>
          <button className="border rounded-full border-white p-4 text-white flex" onClick={() => { togglePlay() }}>
            { !count.play
              ?
              <svg width="1em" height="1em" viewBox="0 0 128 128" preserveAspectRatio="xMidYMid">
                <path d="M119.351 64L8.65 0v128z" fill="currentColor" />
              </svg>
              :
              <svg width="1em" height="1em" viewBox="0 0 128 128" preserveAspectRatio="xMidYMid">
                <path d="M41.86 128V0H8.648v128h33.21zm77.491 0V0h-33.21v128h33.21z" fill="currentColor" />
              </svg>
            }
          </button>
          <button className="text-white mx-2" onClick={() => { toggleNext() }}>
            <svg width="1em" height="1em" viewBox="0 0 128 128" preserveAspectRatio="xMidYMid">
              <path
                d="M98.91 53.749L5.817 0v128L98.91 74.251v47.93h23.273V5.819H98.909z"
                fill="currentColor"
              />
            </svg>
          </button>
          <div className="text-white text-xs mr-1" draggable="false">
            {scrubPb
              ? msTimeFormat(scrubPb)
              : msTimeFormat(count.progress)}
					</div>
          <ProgressBar
            value={playback}
            setValue={(ratio) => seekPlayback(ratio)}
            scrubFunction={scrubPlayback}
          />
          <div className="text-white text-xs ml-1" draggable="false">
            {msTimeFormat(count.total_time)}
          </div>
        </div>
      }
    </div>
  )
}

const ProgressBar = ({value, setValue, scrubFunction}) => {
  const [engage, setEngage] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [scrub, setScrub] = useState(null)

  const wrapperRef = useRef(null)

  useEffect(() => {
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
        window.removeEventListener('mousemove', handleMove)
        window.removeEventListener('mouseup', handleMouseUp)
    }
  })

  const handleMouseUp = (e) => {
    setIsDragging(false)
    if (engage){
      setValue(scrub)
    }
    setScrub(null)
    if (!e.target.classList.contains('progress-slider')) {
      setEngage(false)
    }
  }

  const handleMove = (e) => {
      if (engage && isDragging) {
          const rect = wrapperRef.current.getBoundingClientRect()
          let offsetRatio = (e.pageX - rect.x)/rect.width

          if (offsetRatio < 0){
              offsetRatio = 0.001
          } else if (offsetRatio > 1){
            offsetRatio = 1
          }

          if(scrubFunction){
              scrubFunction(offsetRatio)
          }
          setScrub(offsetRatio)
      }
  }

  const handleEnter = () => {
    setEngage(true)
  }

  const handleLeave = () => {
    if (!isDragging){
      setEngage(false)
    }
  }

  const handleMouseDown = (e) => {
      setIsDragging(true)
      const rect = wrapperRef.current.getBoundingClientRect()
      const offsetRatio = (e.pageX - rect.x)/rect.width
      setScrub(offsetRatio)
  }

  return (
    <div ref={wrapperRef} className="progress-slider flex items-center h-4 w-full relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave} onMouseDown={handleMouseDown}>
        <div className="progress-slider bg-yellow-700 rounded-sm flex h-1 w-full overflow-hidden" >
            <div className="progress-slider bg-white h-1 w-full rounded-sm" style={{transform: `translate(-${((1-(scrub || value))*100).toFixed(2)}%)`}} ></div>
        </div>
        <button className="progress-slider bg-white rounded-lg w-3 h-3 z-5 shadow-md absolute left-0" style={{left: `${((scrub || value)*100).toFixed(2)}%`}} ></button>
    </div>
  )
}

function msTimeFormat(ms){
  const s = Math.floor(ms/1000)
  const min = Math.floor(s /60)
  const sec = (s - min*60)

  return `${min}:${sec < 10? `0${sec}`: sec}`
}


function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default SpotifyPlayer;