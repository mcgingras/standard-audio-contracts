import React, { useState, useEffect, useRef } from 'react';
import { play, next, previous, pause, seek, getDevices, getPlaybackState } from '../spotify';

const SpotifyPlayer = ({uris}) => {
  const savedToken = localStorage.getItem('spotify_token');
  const [token, setToken] = useState(savedToken || "");
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [deviceId, setDeviceId] = useState(undefined);
  const [devices, setDevices] = useState(undefined);
  const [initializing, setInitializing] = useState(true);

  const [scrubPb, setScrubPb] = useState(null);
  const [playback, setPlayback] = useState(0);
  const [playbackState, setPlaybackState] = useState({
		play: false,
		shuffle: false,
		repeat: false,
		progress: 0,
		total_time: 0,
	});

  const [playInfo, setPlayInfo] = useState({
		album: {},
		artists: [],
		name: "",
		id: "",
	});

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
    // player.addListener('player_state_changed', state => {
    //   console.log(state);
    //   initializeState(state);
    // });

    player.addListener("player_state_changed", (state) => {
			console.log(state);
			try {
				const { current_track } = state.track_window;

				setPlayInfo(current_track);
				setPlayback(state.position / state.duration);
				setPlaybackState((state) => ({
					...state,
					play: !state.paused,
					shuffle: state.shuffle,
					repeat: state.repeat_mode !== 0,
					progress: state.position,
					total_time: state.duration,
				}));
			} catch (error) {
				console.log(error);
			}
		});

    // Ready
    player.addListener('ready', ({ device_id }) => { handlePlayerStatus(device_id) });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => { handlePlayerStatus(device_id) });

    // Connect to the player
    player.connect();
    setPlayer(player);
  }

  const togglePlay = async () => {
    const response = await play(uris, deviceId, token);

    if (response.status === 204) {
      setPlaybackState((state) => ({ ...state, play: !state.play }));
      updatePlayback();
    } else {
      // setError("error")
    }
  }

  const updatePlayback = () => {
    const interval = 500 / playbackState.total_time;
    setPlayback((playback) => playback + interval);
    setPlaybackState((state) => ({...state, progress: state.progress + 500}))

    if (playbackState.play) {
      setTimeout(() => {
        updatePlayback()
      }, 500);
    }
  }

  const handlePlayerStatus = async (device_id) => {
    const { deviceId, devices } = await initializeDevices(device_id);
    setDeviceId(device_id);
    setDevices(devices);
    setInitializing(false);
    // status: device_id ? STATUS.READY : STATUS.IDLE,
  }

  const seekPlayback = async (ratio) => {
		const time = Math.round(ratio * playbackState.total_time);
    const response = await seek(time)

    if (response.status === 204) {
      setPlayback(ratio);
      setPlaybackState((state) => ({ ...state, progress: time }));
      // updateState();
    } else {
      // setError
    }

		setScrubPb(null);
	};

	const scrubPlayback = (ratio) => {
		const time = ratio * playbackState.total_time;
		setScrubPb(time);
	};

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
        <div class="flex items-center">
          <button className="text-white mr-2" onClick={() => {previous(token)}}>
            <svg width="1em" height="1em" viewBox="0 0 128 128" preserveAspectRatio="xMidYMid">
              <path d="M29.09 53.749V5.819H5.819v116.363h23.273v-47.93L122.18 128V0z" fill="currentColor" />
            </svg>
          </button>
          { !playbackState.play
            ?
            <button className="border rounded-full border-white p-4 text-white flex" onClick={() => { togglePlay() }}>
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

          <ProgressBar
            value={playback}
            setValue={(ratio) => seekPlayback(ratio)}
            scrubFunction={scrubPlayback}
          />
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
    if (!e.target.classList.contains('progress-wrapper') &&
        !e.target.classList.contains('progress-bar') &&
        !e.target.classList.contains('progress') &&
        !e.target.classList.contains('progress-slider')) {
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
    <div ref={wrapperRef} className="flex items-center h-4 w-full relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave} onMouseDown={handleMouseDown}>
        <div className="bg-yellow-700 rounded-sm flex h-1 w-full overflow-hidden" >
            <div className="bg-white h-1 w-full rounded-sm" style={{transform: `translate(-${((1-(scrub || value))*100).toFixed(2)}%)`}} ></div>
        </div>
        <button className="bg-white rounded-lg w-3 h-3 z-5 shadow-md absolute left-0" style={{left: `${((scrub || value)*100).toFixed(2)}%`}} ></button>
    </div>
  )
}

export default SpotifyPlayer;