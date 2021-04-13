import { useState, useEffect } from 'react';

/**
 * returns [isLoggedIn, accessToken]
 */
const useSpotify = () => {
  let expiration    = localStorage.getItem('spotify_expiration');
  let access_token  = localStorage.getItem('spotify_access_token');
  let refresh_token = localStorage.getItem('spotify_refresh_token');

  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // get another set of tokens by showing the UI that the user is not logged in
    // and that they should trigger a click to start the auth process again.
    if (expiration === null || access_token === null || refresh_token === null) {
      console.log("all three are null")
      return
    }

    // token is expired
    // could maybe give it a bit of a window
    if (expiration < Date.now()) {
      console.log("token is expired, fetching a new access token...")
      const access_token = unwrapRefreshToken(refresh_token);
      setLoggedIn(true);
      setToken(access_token);

    // get another set of tokens using refresh
    } else {
      console.log("nothing is expired, we should be good to go")
      setLoggedIn(true);
      setToken(access_token);
    }
  }, [])

  return [loggedIn, token];
}

const fetchRefresh = (refresh_token) => {
  return fetch(`http://localhost:8888/?refresh_token=${refresh_token}`, {
    method: 'GET',
  })
  .then(res => res.json())
}

const unwrapRefreshToken = async (refresh_token) => {
  const token = await fetchRefresh(refresh_token);
  return token;
}

export default useSpotify;