import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import {
  Routes, Route, Outlet, Link,
} from 'react-router-dom'
import Main from './components/Main'
import { connect } from 'react-redux'
import { changeCode } from './actions'
import { client_id } from './config'
import Loading from './components/Loading'
import Cookies from 'js-cookie'


export function App({ code, dispatchChangeCode }) {
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    const newCode = new URLSearchParams(window.location.search).get('code')
    dispatchChangeCode(newCode)
    console.log(sessionStorage.getItem('code'))
    setLogged(!(sessionStorage.getItem('code') === null))
  })


  const redirect_uri = 'http://localhost:1234/callback'
  const scope = 'streaming%20user-follow-read%20playlist-read-private%20user-top-read%20user-read-private%20user-read-email%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played';
  const responseType = "code"

  const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${responseType}&redirect_uri=${redirect_uri}&scope=${scope}`

  return (
    <div className='app'>
      {
        (!code && !logged) && (
          <Container className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
            <Button href={authorizeUrl}>Log in with Spotify</Button>
          </Container>
        )
      }
      {
        (code || logged) && (
          <>
            <div style={{ backgroundColor: "#F6F7F9" }}>
              <Routes>
                <Route path="/" element={<div>hello</div>}></Route>
                <Route path="/callback" element={<Loading></Loading>}></Route>
                <Route path="/dashboard" element={<Main></Main>}></Route>
                <Route path="*" element={<div>hello3</div>}></Route>
              </Routes>
              <div>
                {/* {code} */}
              </div>
              {/* <Link to="/hello">hi</Link> */}
            </div>
          </>
        )
      }
    </div >
  )
}

const mapStateToProps = state => ({ code: state.codeReducer })

const mapDispatchToProps = dispatch => ({
  dispatchChangeCode: payload => dispatch(changeCode(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
