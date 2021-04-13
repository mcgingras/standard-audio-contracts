const axios = require('axios');

export const pinJSONToIPFS = (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
  .post(url, JSONBody, {
      headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_KEY
      }
  })
  .then(function (response) {
      return response;
  })
  .catch(function (error) {
      console.log(error)
  });
};

export const msTimeFormat = (ms) => {
  const s = Math.floor(ms/1000)
  const min = Math.floor(s /60)
  const sec = (s - min*60)

  return `${min}:${sec < 10? `0${sec}`: sec}`
}