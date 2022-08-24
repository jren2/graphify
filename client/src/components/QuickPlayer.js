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
      <div className="ml-1 overflow-auto border border-dark" style={{ maxHeight: "52vh" }}>
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
