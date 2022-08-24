import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RightBar = () => {
  const accessToken = sessionStorage.getItem('code')
  const [topArtists, setTopArtists] = useState()
  const [topSongs, setTopSongs] = useState()
  const [followingArtists, setFollowingArtists] = useState()

  useEffect(() => {
    const asyncFunc = async () => {
      if (accessToken) {
        await axios.get('http://localhost:3001/api/getTop/artists', {
          params: {
            accessToken: accessToken
          }
        }).then(response => {
          setTopArtists(response.data.items)
        }).catch(err => {
          console.log(err)
        })

        await axios.get('http://localhost:3001/api/getTop/tracks', {
          params: {
            accessToken: accessToken
          }
        }).then(response => {
          setTopSongs(response.data.items)
        }).catch(err => {
          console.log(err)
        })

        await axios.get('http://localhost:3001/api/getUserFollowing', {
          params: {
            accessToken: accessToken
          }
        }).then(response => {
          setFollowingArtists(response.data)
        }).catch(err => {
          console.log('USER FOLLOWING ERROR')
          console.log(err)
        })
      }
    }

    asyncFunc()
  }, [])

  return (
    <>
      <style type="text/css">
        {`
          .btn.following {
            border: 1px solid #FA9284 !important;
            border-radius: 15px !important;
            color: #FA9284 !important
          }
          .btn:hover.following,
          .btn:active.following,
          .btn:visited.following,
          .btn:focus.following {
            background-color: #FA9284 !important;
            border-color: #FA9284 !important;
            color: white !important
          }
          .btn.add {
            color: #FA9284 !important
          }
          .btn:hover.add,
          .btn:focus.add {
            color: #ffc2ba !important
          }
       `}
      </style>
      <Container fluid style={{ padding: "5px", maxHeight: "86vh" }}>
        <Container id="top_artists_preview" className="bg-white p-2 shadow-sm" style={{ borderRadius: "15px" }}>
          <Row className="py-2">
            <h4 className="pl-3 mx-auto my-auto">Your Top Artists</h4>
            <Link className="ml-auto mx-auto my-auto pr-3 text-muted" to="/">See All</Link>
          </Row>
          <Container className="p-2 overflow-auto" style={{ maxHeight: "32vh" }}>
            {
              topArtists &&
              (
                topArtists.map(artist => {
                  const small_img = artist.images[2].url
                  return (
                    <>
                      <Container className="my-2" fluid>
                        <Row className="py-2" style={{ borderRadius: "10px" }}>
                          <Col xs={4} className="ml-2 mr-1">
                            <Row>
                              <img style={{ objectFit: "cover" }} className="rounded-circle" width="64px" height="64px" key={`${small_img}`} src={small_img}></img>
                            </Row>
                          </Col>
                          <Col xs={5} className="ml-2 my-auto" style={{ padding: "0px" }}>
                            <Row>
                              <a style={{ fontWeight: "500" }} className="text-decoration-none text-dark truncate" key={`${artist.name}`} href={`${artist.external_urls.spotify}`} target="_blank">{artist.name}</a>
                            </Row>
                            <Row>
                              <button type="button" class="mt-1 following btn-sm  btn btn-outline-info">Following</button>
                            </Row>
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
        <div className="my-3" />
        <Container id="top_songs_preview" className="py-2 shadow-sm fluid bg-white" style={{ paddingLeft: "0px", paddingRight: "0px", borderRadius: "15px" }}>
          <Row className="py-2">
            <h4 className="mx-auto pl-3 my-auto">Your Top Songs</h4>
            <Link className="ml-auto mx-auto my-auto pr-3 text-muted" to="/">See All</Link>
          </Row>
          <Container className="overflow-auto fluid" style={{ padding: "0px", maxHeight: "32vh" }}>
            {
              topSongs &&
              (
                topSongs.map(song => {
                  const artists = song.artists
                  const small_img = song.album.images[2].url
                  return (
                    <>
                      <Container className="my-2" fluid>
                        <Row className="mx-1 py-2" style={{ borderRadius: "10px" }}>
                          <Col xs={3} className="mr-2">
                            <Row>
                              <img className="img-fluid" key={`${small_img}`} src={small_img}></img>
                            </Row>
                          </Col>
                          <Col xs={6} className="ml-1 my-auto" style={{ padding: "0px" }}>
                            <a style={{ fontWeight: "500" }} className="text-decoration-none text-dark d-block mt-auto text-truncate" key={`${song.name}`} href={`${song.external_urls.spotify}`} target="_blank">{song.name}</a>
                            <a className="text-muted text-decoration-none text-dark" key={`${artists[0].name}`} href={`${artists[0].external_urls.spotify}`} target="_blank"> {artists[0].name}</a>
                            <br></br>
                          </Col>
                          <Col xs={1} className="my-auto">
                            <button type="button" class="btn add"><h4>+</h4></button>
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
      </Container >
    </>
  )
}

const mapStateToProps = state => ({ accessToken: state.accessReducer })

export default connect(mapStateToProps, null)(RightBar)
