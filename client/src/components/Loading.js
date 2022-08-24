import { Navigate } from "react-router"
import { useEffect, useState } from "react"
import axios from 'axios'
import { connect } from 'react-redux'
import { changeAccessToken, changeExpires, changeRefreshToken } from "../actions"

const Loading = ({ code, dispatchChangeAccessToken, dispatchChangeExpires, dispatchChangeRefreshToken }) => {
  const [found, setFound] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/callback', {
      params: {
        code
      }
    }).then(response => {
      const accessToken = response.data.access_token
      const refreshToken = response.data.refresh_token
      const expiresIn = response.data.expires_in

      dispatchChangeAccessToken(accessToken)
      dispatchChangeExpires(expiresIn)
      dispatchChangeRefreshToken(refreshToken)

      setFound(true)
      sessionStorage.setItem('code', accessToken)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <>
      <div>Loading</div>
      {
        found &&
        <Navigate to="/dashboard"></Navigate>
      }
    </>
  )
}

const mapStateToProps = state => ({ code: state.codeReducer })

const mapDispatchToProps = dispatch => ({
  dispatchChangeAccessToken: payload => dispatch(changeAccessToken(payload)),
  dispatchChangeRefreshToken: payload => dispatch(changeRefreshToken(payload)),
  dispatchChangeExpires: payload => dispatch(changeExpires(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Loading)