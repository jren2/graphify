const default_state = ""
const CHANGE_CODE = "CHANGE_CODE"

const codeReducer = (state = default_state, action) => {
  switch (action.type) {
    case CHANGE_CODE:
      return action.payload
    default:
      return state
  }
}

export default codeReducer
