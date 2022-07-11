import accessReducer from "./access"
import codeReducer from "./code"
import expireReducer from "./expires"
import refreshReducer from "./refresh"
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  accessReducer,
  codeReducer,
  expireReducer,
  refreshReducer
})

export default rootReducer
