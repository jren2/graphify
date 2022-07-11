import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'

const RightBar = ({ accessToken }) => {
  const [topArtists, setTopArtists] = useState()
  const [topSongs, setTopSongs] = useState()

  useEffect(() => {
    if (accessToken) {
      axios.get('http://localhost:3001/api/getTop/artists', {
        params: {
          accessToken: accessToken
        }
      }).then(response => {
        console.log('USER TOP')
        console.log(response.data.items)
        setTopArtists(response.data.items)
      }).catch(err => {
        console.log(err)
      })

      axios.get('http://localhost:3001/api/getTop/tracks', {
        params: {
          accessToken: accessToken
        }
      }).then(response => {
        console.log('USER TOP')
        console.log(response.data.items)
        setTopSongs(response.data.items)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [])

  return (
    <Container className="p-0" fluid>
      <Container id="top_songs_preview" className="p-0">
        <div>Your Top Songs</div>
        {
          topSongs &&
          (
            topSongs.map(song => {
              const artists = song.artists
              const small_img = song.album.images[2].url
              return (
                <>
                  <Container className="my-4" fluid>
                    <Row>
                      <Col xs={4}>
                        <img key={`${small_img}`} src={small_img}></img>
                      </Col>
                      <Col xs={8}>
                        <a key={`${song.name}`} href={`${song.external_urls.spotify}`} target="_blank">{song.name}</a>
                        <br></br>
                        {
                          artists.map(artist => (
                            <>
                              <a key={`${artist.name}`} href={`${artist.external_urls.spotify}`} target="_blank"> {artist.name}</a>
                            </>
                          ))
                          // <div>{song.artists[0].name}</div>
                        }
                        <br></br>
                      </Col>
                    </Row>
                  </Container>
                </>
              )
            }
            )
          )
        }
      </Container>
    </Container>
  )
}

const mapStateToProps = state => ({ accessToken: state.accessReducer })

export default connect(mapStateToProps, null)(RightBar)
