import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Container } from 'react-bootstrap'

const QuickPlayer = ({ accessToken }) => {
  const [playlists, setPlaylists] = useState()

  useEffect(() => {
    if (accessToken) {
      axios.get('http://localhost:3001/api/getUserPlaylists', {
        params: {
          accessToken: accessToken
        }
      }).then(response => {
        // console.log('USER PLAYLISTS')
        // console.log(response.data)
        setPlaylists(response.data.items)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [])

  return (
    <>
      <div className="overflow-auto border border-dark" style={{ maxHeight: "35vh" }}>
        {
          playlists &&
          (
            playlists.map(playlist => (
              <div key={`${playlist.name}`} className="my-2" style={{ fontSize: "13px" }}>{playlist.name}</div>
            ))
          )
        }
      </div>
    </>
  )
}

const mapStateToProps = state => ({ accessToken: state.accessReducer })

export default connect(mapStateToProps, null)(QuickPlayer)
