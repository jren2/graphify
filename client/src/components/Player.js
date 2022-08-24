import SpotifyPlayer from 'react-spotify-web-playback'

const Player = ({ trackUri }) => {
  const access_token = sessionStorage.getItem('code')

  return (
    <>
      <div className="fixed-bottom">
        <SpotifyPlayer
          token={access_token}
          showSaveIcon
          uris={trackUri ? [trackUri] : []}
        ></SpotifyPlayer>
      </div>
    </>
  )
}

export default Player
