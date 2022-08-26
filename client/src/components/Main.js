import { useEffect, useState } from "react"
import axios from 'axios'
import { connect, useSelector, getState } from 'react-redux'
import { changeAccessToken, changeExpires, changeRefreshToken } from "../actions"
import Player from './Player'
import Sidebar from './Sidebar'
import RightBar from "./RightBar"
import Topbar from './Topbar'
import Dashboard from './Dashboard'
import { Container, Row, Col, Dropdown, Button, ButtonGroup, DropdownButton, MenuItem } from "react-bootstrap"


const Main = ({ code, refreshToken, expiresIn, dispatchChangeAccessToken, dispatchChangeExpires, dispatchChangeRefreshToken }) => {
  const accessToken = sessionStorage.getItem('code')
  const [userInfo, setUserInfo] = useState({})
  const [image, setImage] = useState()
  const [topArtists, setTopArtists] = useState()

  useEffect(() => {
    if (accessToken) {
      axios.get('http://localhost:3001/api/getUserInfo', {
        params: {
          accessToken: accessToken
        }
      }).then(response => {
        setImage(response.data.images[0].url)
        setUserInfo(response.data)
      }).catch(err => {
        console.log(err)
      })

      axios.get('http://localhost:3001/api/getTop/artists', {
        params: {
          accessToken: accessToken
        }
      }).then(response => {
        setTopArtists(response.data.items)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [])

  return (
    <>
      <Container fluid >
        <Row style={{ height: "93vh" }} >
          <Col xs={2} className="bg-white border border-info">
            <Sidebar></Sidebar>
          </Col>
          <Col xs={10}>
            <Topbar style={{ zIndex: "5" }} className="position-relative" userInfo={userInfo} image={image}></Topbar>
            <Row className="position-relative">
              <Col xs={9} className="border border-success" style={{ padding: "0px" }}>
                {topArtists &&
                  (
                    <Dashboard image={image} refresh_token={refreshToken} expires_in={expiresIn} user_info={userInfo} top_artists={topArtists}></Dashboard>
                  )
                }
              </Col>
              <Col xs={3} className="my-auto border border-danger p-0">
                <RightBar></RightBar>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Player trackUri={"spotify:album:0tGPJ0bkWOUmH7MEOR77qc"}></Player>
        </Row>
      </Container>
    </>
  )
}

const mapStateToProps = state => ({ code: state.codeReducer, accessToken: state.accessReducer, refreshToken: state.refreshReducer, expiresIn: state.expireReducer })

const mapDispatchToProps = dispatch => ({
  dispatchChangeAccessToken: payload => dispatch(changeAccessToken(payload)),
  dispatchChangeRefreshToken: payload => dispatch(changeRefreshToken(payload)),
  dispatchChangeExpires: payload => dispatch(changeExpires(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
