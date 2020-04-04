import { combineReducers } from 'redux'

import messagesReducer from './messages'
import userReducer from './user'

const reducer = combineReducers({
  messagesReducer,
  userReducer
})

export default reducer
