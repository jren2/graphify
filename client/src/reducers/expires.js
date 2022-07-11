const default_state = ""
const CHANGE_EXPIRES = "CHANGE_EXPIRES"

const expireReducer = (state = default_state, action) => {
  switch (action.type) {
    case CHANGE_EXPIRES:
      return action.payload
    default:
      return state
  }
}

export default expireReducer
