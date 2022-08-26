import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = ({ image, user_info, refresh_token, expires_in, top_artists }) => {
  const access_token = sessionStorage.getItem('code')
  const [oneRecommended, setOneRecommended] = useState()
  const [twoRecommended, setTwoRecommended] = useState()
  const [threeRecommended, setThreeRecommended] = useState()
  const [newReleases, setNewReleases] = useState()
  const [recents, setRecents] = useState()
  const top1_name = top_artists?.[0].name
  const top2_name = top_artists?.[1].name
  const top3_name = top_artists?.[2].name
  const top1_id = top_artists?.[0].id
  const top2_id = top_artists?.[1].id
  const top3_id = top_artists?.[2].id

  useEffect(() => {
    const asyncFunc = async () => {
      console.log('TOP ARTISTS')
      console.log(top_artists)
      if (top1_id && top2_id && top3_id && access_token) {
        await axios.get('http://localhost:3001/api/getRecent', {
          params: {
            accessToken: access_token
          }
        }).then(response => {
          console.log('RECENTS')
          console.log(response.data)
          setRecents(response.data.items)
        }).catch(err => {
          console.log(err)
        })
        await axios.get(`http://localhost:3001/api/getRelatedArtists/${top1_id}`, {
          params: {
            accessToken: access_token
          }
        }).then(response => {
          setOneRecommended(response.data.artists)
        }).catch(err => {
          console.log(err)
        })

        await axios.get(`http://localhost:3001/api/getRelatedArtists/${top2_id}`, {
          params: {
            accessToken: access_token
          }
        }).then(response => {
          setTwoRecommended(response.data.artists)
        }).catch(err => {
          console.log(err)
        })

        await axios.get(`http://localhost:3001/api/getRelatedArtists/${top3_id}`, {
          params: {
            accessToken: access_token
          }
        }).then(response => {
          console.log(response.data.artists)
          setThreeRecommended(response.data.artists)
        }).catch(err => {
          console.log(err)
        })

        await axios.get('http://localhost:3001/api/getNew', {
          params: {
            accessToken: access_token
          }
        }).then(response => {
          console.log('NEW RELEASES')
          console.log(response.data.albums.items)
          setNewReleases(response.data.albums.items)
        }).catch(err => {
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
        .invisScroll::-webkit-scrollbar {
          display: none;
        }   
        `}
      </style>
      <Container className="border border-info px-3" style={{ overflowY: "auto", overflowX: "hidden", margin: "0px", maxHeight: "86vh" }}>
        <Row>
          <div className="mx-auto text-center">
            <h3 className="position-relative text-center mx-auto my-3">Welcome, {user_info.display_name}!</h3>
            <img src={image} className="mx-auto rounded-circle" width="150vh"></img>
          </div>
        </Row>
        <h3 className="mt-4 mb-2">
          Jump back in!
        </h3>
        <Container className="position-relative px-2">
          <Row>
            {
              recents && (
                recents.map(recent => {
                  const track = recent.track
                  return (
                    <>
                      <Col xs={4}>
                        <Row className="m-1 py-2 bg-white shadow-sm" style={{ borderRadius: "8px" }}>
                          <Col xs={3}>
                            <img style={{ borderRadius: "2px", objectFit: "cover" }} className="shadow-sm" width="64px" height="64px" key={`${track.album.images[0].url}`} src={track.album.images[0].url}></img>
                          </Col>
                          <Col xs={9}>
                            <a className="text-decoration-none text-dark" key={`${track.album.external_urls.spotify}`} href={`${track.album.external_urls.spotify}`} target="_blank">
                              <h5 className="ml-2 text-truncate mt-1 mb-1">
                                {track.name}
                              </h5>
                            </a>
                            <a className="text-decoration-none text-muted" key={`${track.artists[0].name}`} href={`${track.artists[0].external_urls.spotify}`} target="_blank">
                              <p className="ml-2 text-truncate mb-2 -mt-1">
                                {track.artists[0].name}
                              </p>
                            </a>
                          </Col>
                        </Row>
                      </Col>
                    </>
                  )
                })
              )
            }
          </Row>
        </Container>

        <h3 className="mt-4 mb-2">
          More artists like {top1_name}
        </h3>
        <Container className="position-relative" style={{ padding: "0px" }}>
          <Container className="p-3 overflow-auto text-nowrap invisScroll" style={{ overscrollBehaviorX: "none", padding: "0px" }}>
            {
              oneRecommended &&
              (
                oneRecommended.slice(0, 15).map(artist => {
                  const small_img = artist.images[1].url
                  let followersString = ""
                  const followers = artist.followers.total

                  if (followers > 1000000) {
                    followersString += Math.floor(followers / 1000000)
                    followersString += "." + Math.floor((followers % 1000000) / 100000)
                    followersString += " mil "
                  } else if (followers > 1000) {
                    followersString += Math.round(followers / 1000)
                    followersString += "." + Math.floor((followers % 1000) / 100)
                    followersString += "k "
                  } else if (followers > 0) {
                    followersString += followers
                  }

                  return (
                    <>
                      <div className="shadow-sm mr-4 d-inline-block px-3 pb-2 pt-3" style={{ backgroundColor: "#ffffff", borderRadius: "15px" }}>
                        <Col>
                          <Row>
                            <img style={{ objectFit: "cover" }} className="shadow-sm mx-auto rounded-circle" width="160px" height="160px" key={`${small_img}`} src={small_img}></img>
                          </Row>
                          <Row>
                            <Col>
                              <Row>
                                <a className="mx-auto mt-3 mb-1 text-decoration-none text-dark truncate" key={`${artist.name}`} href={`${artist.external_urls.spotify}`} target="_blank">
                                  <h5>
                                    {artist.name}
                                  </h5>
                                </a>
                              </Row>
                              <Row>
                                <p className="d-inline my-auto ml-1 text-muted">{followersString}</p>
                                <button type="button" class="ml-auto mr-1  following btn-sm  btn btn-outline-info">Following</button>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </div>
                    </>
                  )
                }
                )
              )
            }
          </Container>
        </Container>
        <h3 className="mt-4 mb-2">
          More artists like {top2_name}
        </h3>
        <Container className="position-relative" style={{ padding: "0px" }}>
          <Container className="p-3 overflow-auto text-nowrap invisScroll" style={{ overscrollBehaviorX: "none", padding: "0px" }}>
            {
              twoRecommended &&
              (
                twoRecommended.slice(0, 15).map(artist => {
                  const small_img = artist.images[1].url
                  let followersString = ""
                  const followers = artist.followers.total

                  if (followers > 1000000) {
                    followersString += Math.floor(followers / 1000000)
                    followersString += "." + Math.floor((followers % 1000000) / 100000)
                    followersString += " mil "
                  } else if (followers > 1000) {
                    followersString += Math.round(followers / 1000)
                    followersString += "." + Math.floor((followers % 1000) / 100)
                    followersString += "k "
                  } else if (followers > 0) {
                    followersString += followers
                  }

                  return (
                    <>
                      <div className="shadow-sm mr-4 d-inline-block px-3 pb-2 pt-3" style={{ backgroundColor: "#ffffff", borderRadius: "15px" }}>
                        <Col>
                          <Row>
                            <img style={{ objectFit: "cover" }} className="shadow-sm mx-auto rounded-circle" width="160px" height="160px" key={`${small_img}`} src={small_img}></img>
                          </Row>
                          <Row>
                            <Col>
                              <Row>
                                <a className="mx-auto mt-3 mb-1 text-decoration-none text-dark truncate" key={`${artist.name}`} href={`${artist.external_urls.spotify}`} target="_blank">
                                  <h5>
                                    {artist.name}
                                  </h5>
                                </a>
                              </Row>
                              <Row>
                                <p className="d-inline my-auto ml-1 text-muted">{followersString}</p>
                                <button type="button" class="ml-auto mr-1  following btn-sm  btn btn-outline-info">Following</button>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </div>
                    </>
                  )
                }
                )
              )
            }
          </Container>
        </Container>
        <h3 className="mt-4 mb-2">
          New Releases
        </h3>
        <Container className="position-relative" style={{ padding: "0px" }}>
          <Container className="p-3 overflow-auto text-nowrap invisScroll" style={{ overscrollBehaviorX: "none", padding: "0px" }}>
            {
              newReleases &&
              (
                newReleases.map(album => {
                  const small_img = album.images[1].url
                  return (
                    <>
                      <div className="shadow-sm mr-4 d-inline-block px-3 pb-2 pt-3" style={{ maxWidth: "25vh", backgroundColor: "#ffffff", borderRadius: "15px" }}>
                        <Col>
                          <Row>
                            <img style={{ objectFit: "cover" }} className="shadow-sm mx-auto" width="160px" height="160px" key={`${small_img}`} src={small_img}></img>
                          </Row>
                          <Row>
                            <h5 className="mw-100 text-primary mx-auto mt-1">
                              <a className="d-block text-decoration-none text-dark text-truncate" key={`${album.name}`} href={`${album.external_urls.spotify}`} target="_blank">{album.name}</a>
                            </h5>
                          </Row>
                          <Row className="-mt-2">
                            <div className="-mt-2 text-primary">
                              <a className="text-decoration-none text-muted text-truncate" key={`${album.artists[0].name}`} href={`${album.artists[0].external_urls.spotify}`} target="_blank">{album.artists[0].name}</a>
                              <p className="text-muted">
                                {album.type}
                              </p>
                            </div>
                          </Row>
                        </Col>
                      </div>
                    </>
                  )
                }
                )
              )
            }
          </Container>
        </Container>
        <div className="mb-3"></div>
      </Container>

    </>
  )
}

export default Dashboard