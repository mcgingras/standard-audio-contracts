let express = require('express')
let request = require('request')
let cors = require('cors')
let querystring = require('querystring')
let cookieParser = require('cookie-parser')

require('dotenv').config()

let app = express()
app.use(cors()).use(cookieParser())

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

let redirect_uri =
    process.env.REDIRECT_URI ||
    'http://localhost:3002/callback'

app.get('/login', function (req, res) {
  console.log(req.query.redirect)
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
          response_type: 'code',
          client_id: process.env.SPOTIFY_CLIENT_ID,
          state: req.query.redirect,
          scope: 'user-read-playback-state, user-modify-playback-state, streaming, user-read-email, user-read-private',
          redirect_uri
  }))
})

app.get('/callback', function (req, res) {
    let state = req.query.state || null;
    console.log(req.cookies[stateKey])
    console.log(state)

    let code = req.query.code || null
    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(
                process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
            ).toString('base64'))
        },
        json: true
    }
    request.post(authOptions, function (error, response, body) {
        var access_token = body.access_token;
        var refresh_token = body.refresh_token;
        uri = 'http://localhost:3002/tapes/1/edit/'
        res.status(200).send({
          access_token, refresh_token
        })
    })
})

app.get('/refresh_token', function(req, res) {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET)
    .toString('base64'))
   },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.status(200).send({
        'access_token': access_token
      });
    }
  });
});

let port = process.env.PORT || 8888
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)