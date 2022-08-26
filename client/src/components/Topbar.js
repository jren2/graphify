import { Col, Row, Dropdown, Form, } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

const Topbar = ({ userInfo, image }) => {
  const accessToken = sessionStorage.getItem('code')
  const [searchedArtists, setSearchedArtists] = useState([])
  const [searchedTracks, setSearchedTracks] = useState([])
  const [searchedAlbums, setSearchedAlbums] = useState([])

  const focus = () => {
    document.querySelector("#results").classList.remove("invisible")
    document.querySelector("#search-form").style.width = "40vh"

  }

  const blur = () => {
    document.querySelector("#results").classList.add("invisible")
    document.querySelector("#search-form").style.width = "36vh"
  }

  const search = e => {
    if (e.target.value === '') {
      clearTimeout()
      setSearchedAlbums([])
      setSearchedArtists([])
      setSearchedTracks([])
    } else {
      axios.get(`http://localhost:3001/api/search/${e.target.value}`, {
        params: {
          accessToken: accessToken
        }
      }).then(response => {
        if (e.target.value !== '') {
          console.log(response.data.albums.items)
          setSearchedAlbums(response.data.albums.items)
          setSearchedArtists(response.data.artists.items)
          setSearchedTracks(response.data.tracks.items)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <>
      {userInfo &&
        (
          <Row className="text-center items-center flex-nowrap border border-dark">
            <Col xs={9} >
              <div style={{ width: "40vh" }} className="position-relative mt-2">
                <Form.Control className="mt-2 mx-auto" id="search-form" onChange={e => search(e)} style={{ transitionProperty: "width", transitionDuration: "500ms", width: "36vh" }} onBlur={blur} onFocus={focus} placeholder="Search for songs, artists or albums" />
                <div id="results" style={{ maxHeight: "50vh", zIndex: "2", width: "40vh", left: "auto" }} className="overflow-auto shadow left-100 invisible rounded-bottom bg-white position-absolute">
                  {
                    searchedArtists.length > 0 &&
                    <div className="ml-2 mt-2 text-left text-muted">
                      Artists
                    </div>
                  }
                  <div></div>
                  {
                    searchedArtists.map(artist => {
                      const image = artist.images[0].url
                      return (
                        <>
                          <Row className="px-4 py-2">
                            <Col xs={3} className="ml-2 mr-1">
                              <Row>
                                <img style={{ objectFit: "cover" }} className="rounded-circle" width="64px" height="64px" key={`${image}`} src={image}></img>
                              </Row>
                            </Col>
                            <Col xs={5} className="ml-3 mt-1" style={{ padding: "0px" }}>
                              <Row>
                                <a style={{ fontWeight: "500" }} className="text-decoration-none text-dark text-truncate" key={`${artist.name}`} href={`${artist.external_urls.spotify}`} target="_blank">{artist.name}</a>
                              </Row>
                              <Row>
                                <p className="text-muted text-truncate">{artist.genres[0]}</p>
                              </Row>
                            </Col>
                            <Col xs={2} className="my-auto mx-auto">
                              <button type="button" className="mx-auto btn add"><h4>+</h4></button>
                            </Col>
                          </Row>
                        </>
                      )
                    })
                  }
                  {
                    searchedTracks.length > 0 &&
                    <div className="ml-2 mt-2 text-left text-muted">
                      Tracks
                    </div>
                  }
                  <div></div>
                  {
                    searchedTracks.map(track => {
                      const image = track.album.images[0].url
                      return (
                        <>
                          <Row className="px-4 py-2">
                            <Col xs={3} className="ml-2 mr-1">
                              <Row>
                                <img className="img-fluid" key={`${image}`} src={image}></img>
                              </Row>
                            </Col>
                            <Col xs={5} className="ml-3 mt-1" style={{ padding: "0px" }}>
                              <a style={{ fontWeight: "500" }} className="text-decoration-none text-dark d-block text-left text-truncate" key={`${track.name}`} href={`${track.external_urls.spotify}`} target="_blank">{track.name}</a>
                              <a className="text-muted text-left d-block text-decoration-none" key={`${track.artists[0].name}`} href={`${track.artists[0].external_urls.spotify}`} target="_blank"> {track.artists[0].name}</a>
                              <br></br>
                            </Col>
                            <Col xs={2} className="my-auto mx-auto">
                              <button type="button" class="btn add"><h4>+</h4></button>
                            </Col>
                          </Row>
                        </>
                      )
                    })
                  }
                  {
                    searchedAlbums.length > 0 &&
                    <div className="ml-2 mt-2 text-left text-muted">
                      Albums
                    </div>
                  }
                  <div></div>
                  {
                    searchedAlbums.map(album => {
                      const image = album.images[0].url
                      return (
                        <>
                          <Row className="px-4 py-2">
                            <Col xs={3} className="ml-2 mr-1">
                              <Row>
                                <img className="img-fluid" key={`${image}`} src={image}></img>
                              </Row>
                            </Col>
                            <Col xs={5} className="ml-3 mt-1" style={{ padding: "0px" }}>
                              <a style={{ fontWeight: "500" }} className="text-decoration-none text-dark d-block text-left text-truncate" key={`${album.name}`} href={`${album.external_urls.spotify}`} target="_blank">{album.name}</a>
                              <a className="text-muted text-left d-block text-decoration-none" key={`${album.artists[0].name}`} href={`${album.artists[0].external_urls.spotify}`} target="_blank"> {album.artists[0].name}</a>
                              <br></br>
                            </Col>
                            <Col xs={2} className="my-auto mx-auto">
                              <button type="button" class="btn add"><h4>+</h4></button>
                            </Col>
                          </Row>
                        </>
                      )
                    })
                  }
                </div>
              </div>
            </Col>

            <div className="my-auto ml-auto mr-3">
              <Dropdown style={{ outline: "none" }}>
                <Dropdown.Toggle variant="light" style={{ borderRadius: "35px" }}>
                  <div className="d-inline-flex">
                    <div className="px-1 my-auto">{userInfo.display_name}</div>
                    <img src={image} className="rounded-circle" width="40px"></img>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu variant="light">
                  <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/action-3">Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Row>
        )
      }
    </>
  )
}

export default Topbar