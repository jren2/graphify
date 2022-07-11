const default_state = ""
const CHANGE_REFRESH_TOKEN = "CHANGE_REFRESH_TOKEN"

const refreshReducer = (state = default_state, action) => {
  switch (action.type) {
    case CHANGE_REFRESH_TOKEN:
      return action.payload
    default:
      return state
  }
}

export default refreshReducer
