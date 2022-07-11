import { useEffect, useState } from "react"
import axios from 'axios'
import { connect, useSelector, getState } from 'react-redux'
import { changeAccessToken, changeExpires, changeRefreshToken } from "../actions"
import Player from './Player'
import Sidebar from './Sidebar'
import RightBar from "./RightBar"
import { Container, Row, Col, Dropdown, Button, ButtonGroup, DropdownButton, MenuItem } from "react-bootstrap"


const Main = ({ code, accessToken, refreshToken, expiresIn, dispatchChangeAccessToken, dispatchChangeExpires, dispatchChangeRefreshToken }) => {
  const [userInfo, setUserInfo] = useState({})
  const [image, setImage] = useState()

  useEffect(() => {
    console.log("Access token from Main")
    console.log(accessToken)
    if (accessToken) {
      axios.get('http://localhost:3001/api/getUserInfo', {
        params: {
          accessToken: accessToken
        }
      }).then(response => {
        console.log('USER INFO')
        console.log(response.data)
        setImage(response.data.images[0].url)
        setUserInfo(response.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [])

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} className="border border-info">
            <Sidebar access_token={accessToken}></Sidebar>
          </Col>
          <Col xs={10}>
            <Row className="text-center items-center border border-dark">
              <p className="my-auto p-2">Search Bar</p>

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
            <Row>
              <Col xs={9} className="border border-success">
                <p>Welcome to main!</p>
                <p>Your access token:</p>
                <p className="text-break">{accessToken}</p>
                <br></br>
                <div>Your refresh token</div>
                <div className="text-break">{refreshToken}</div>
                <br></br>
                <div>Your access expires in:</div>
                <div>{expiresIn}</div>
                <br></br>
                <div>User Info</div>
                <div>{userInfo.display_name}</div>
                <img src={image}></img>
                <br></br>
              </Col>
              <Col xs={3} className="border border-danger p-0">
                <RightBar></RightBar>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Player access_token={accessToken}></Player>
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
