import SpotifyPlayer from 'react-spotify-web-playback'

const Player = ({ access_token, trackUri }) => {

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
