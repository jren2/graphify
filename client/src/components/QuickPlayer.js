import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Container } from 'react-bootstrap'

const QuickPlayer = () => {
  const accessToken = sessionStorage.getItem('code')
  const [playlists, setPlaylists] = useState()

  useEffect(() => {
    if (accessToken) {
      axios.get('http://localhost:3001/api/getUserPlaylists', {
        params: {
          accessToken: accessToken
        }
      }).then(response => {
        setPlaylists(response.data.items)
      }).catch(err => {
        console.log(err)
      })
    }
  }, [])

  return (
    <>
      <div className="ml-2 overflow-auto" style={{ maxHeight: "59vh" }}>
        {
          playlists &&
          (
            playlists.map(playlist => (
              <div key={`${playlist.name}`} className="text-muted my-2 text-truncate" style={{ fontSize: "13px" }}>{playlist.name}</div>
            ))
          )
        }
      </div>
    </>
  )
}

const mapStateToProps = state => ({ accessToken: state.accessReducer })

export default connect(mapStateToProps, null)(QuickPlayer)
