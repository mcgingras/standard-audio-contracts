import React, {useState, useEffect} from 'react'

const Callback = () => {
  let urlstring = window.location.href;
  let url = new URL(urlstring);
  let c = url.searchParams.get('code');
  let s = url.searchParams.get('state');

  useEffect(() => {
    getTokens(c,s);
  }, [c,s])

  // definitely want to handle error case
  const getTokens = async (code, state) => {
    let tokens = await fetchAuthToken(code, state);
    localStorage.setItem('spotify_access_token', tokens["access_token"]);
    localStorage.setItem('spotify_refresh_token', tokens["refresh_token"]);

    window.location.href = state;
  }

  const fetchAuthToken = (code, state) => {
    return fetch(`http://localhost:8888/callback?code=${code}&state=${state}`, {
      method: 'GET',
    })
    .then(res => res.json())
  }

  return (
    <div className="text-4xl font-bold">
      LOADER LOADER LOADER
    </div>
  )
}

export default Callback