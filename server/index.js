const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const querystring = require('querystring');
const path = require('path');

const { database, client_id, client_secret } = require('./config.js')
const axios = require('axios')


const SpotifyWebApi = require('spotify-web-api-node')

const redirect_uri = 'http://localhost:1234/callback';

const app = express()
const MONGO_URI = process.env.MONGODB_URI || database


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cookieSession({
  name: 'session',
  keys: ['pineapple'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000,
}))

app.use(cors())

app.use(express.json())
app.use(express.static('dist'))

app.post('/login'), (req, res) => {
  // console.log('hello')
  // res.send('hi')
  // const code = req.body.code
  // const spotifyApi = new SpotifyWebApi({
  //   redirectUri: 'http://localhost:3001',
  //   clientId: client_id,
  //   clientSecret: client_secret
  // })

  // spotifyApi.authorizationCodeGrant(code).then(data => {
  //   res.json({
  //     accessToken: data.body.access_token,
  //     refreshToken: data.body.refresh_token,
  //     expiresIn: data.body.expires_in
  //   })
  // }).catch((error) => {
  //   res.send(error)
  // })
}

app.get('/api/getUserInfo', (req, res) => {
  const access_token = req.query.accessToken
  axios.get('https://api.spotify.com/v1/me/', {
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.send(error)
  })
})

app.get('/api/getTop/:item', async (req, res) => {
  const { params } = req
  const { item } = params
  const access_token = req.query.accessToken

  axios.get(`https://api.spotify.com/v1/me/top/${item}?limit=10&time_range=short_term`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.send(error)
  })
})

app.get('/api/getRelatedArtists/:id', async (req, res) => {
  const { params } = req
  const { id } = params
  const access_token = req.query.accessToken

  axios.get(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.send(error)
  })
})

app.get('/api/search/:input', async (req, res) => {
  const { params } = req
  const { input } = params
  const access_token = req.query.accessToken

  axios.get(`https://api.spotify.com/v1/search?q=${input}&type=artist%2Ctrack%2Calbum&market=NA&limit=3`, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  }).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.send(error)
  })
})

app.get('/api/getRecent', async (req, res) => {
  const { params } = req
  const { id } = params
  const access_token = req.query.accessToken

  axios.get('	https://api.spotify.com/v1/me/player/recently-played?limit=6', {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  }).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.send(error)
  })
})

app.get('/api/getNew', async (req, res) => {
  const { params } = req
  const { id } = params
  const access_token = req.query.accessToken

  axios.get('https://api.spotify.com/v1/browse/new-releases?country=NA', {
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  }).then(response => {
    res.send(response.data)
  }).catch(error => {
    res.send(error)
  })
})

app.get('/api/getUserFollowing', (req, res) => {
  const access_token = req.query.accessToken
  axios.get('https://api.spotify.com/v1/me/following?type=artist', {
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).then(response => {
    // console.log(response.data)
    res.send(response.data)
  }).catch(error => {
    res.send(error)
  })
})

app.get('/api/getUserPlaylists', async (req, res) => {
  const access_token = req.query.accessToken

  axios.get('https://api.spotify.com/v1/me/playlists?limit=50', {
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
  }).then(response => {
    res.send(response.data)
  }).catch(err => {
    res.send(err)
  })
})

app.get('/callback', function (req, res) {
  const code = req.query.code || null;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:1234/callback',
    clientId: client_id,
    clientSecret: client_secret
  })

  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.send(data.body)
  }).catch(error => {
    res.send(error)
  })

})

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('listening on 3001')
})