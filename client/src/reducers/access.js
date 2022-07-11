const default_state = ""
const CHANGE_ACCESS_TOKEN = "CHANGE_ACCESS_TOKEN"

const accessReducer = (state = default_state, action) => {
  switch (action.type) {
    case CHANGE_ACCESS_TOKEN:
      return action.payload
    default:
      return state
  }
}

export default accessReducer
