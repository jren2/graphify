import { BsHouse, BsWindowDock, BsPeople, BsBookmarks } from 'react-icons/bs'
import { Container, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import QuickPlayer from './QuickPlayer'

const Sidebar = () => {
  const accessToken = sessionStorage.getItem('code')
  return (
    <>
      <Container className="p-0">
        <h1 className="text-center mb-4">Graphify</h1>
        <Row className="d-flex align-content-start ml-2">
          <div style={{ marginTop: "2px" }}><BsHouse /></div>
          <div className="text-muted ml-3 pt-1" style={{ fontSize: "16px" }}> Home</div>
        </Row>
        <Row className="d-flex align-content-start ml-2 mt-2">
          <div style={{ marginTop: "2px" }}><BsWindowDock /></div>
          <div className="text-muted ml-3 pt-1" style={{ fontSize: "16px" }}> Forum</div>
        </Row>
        <Row className="d-flex align-content-start ml-2 mt-2">
          <div style={{ marginTop: "2px" }}><BsPeople /></div>
          <div className="text-muted ml-3 pt-1" style={{ fontSize: "16px" }}> Friend Network</div>
        </Row>
        <Row className="d-flex align-content-start ml-2 mt-2">
          <div style={{ marginTop: "2px" }}><BsBookmarks /></div>
          <div className="text-muted ml-3 pt-1" style={{ fontSize: "16px" }}> Library</div>
        </Row>
        <Row className="ml-2 mt-4">
          <p className='pt-1 mb-0 pl-1 border-bottom w-100 mr-2' style={{ fontSize: "14px" }}>Quick Player</p>
          <QuickPlayer></QuickPlayer>
        </Row>
      </Container>
    </>
  )
}

export default Sidebar 
