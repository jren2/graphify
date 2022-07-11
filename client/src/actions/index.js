export const changeCode = (code) => {
  return {
    type: 'CHANGE_CODE',
    payload: code
  }
}

export const changeAccessToken = (accessToken) => {
  return {
    type: 'CHANGE_ACCESS_TOKEN',
    payload: accessToken
  }
}

export const changeRefreshToken = (refreshToken) => {
  return {
    type: 'CHANGE_REFRESH_TOKEN',
    payload: refreshToken
  }
}

export const changeExpires = (expires) => {
  return {
    type: 'CHANGE_EXPIRES',
    payload: expires
  }
}