import { combineReducers } from 'redux'

import messages from './messages'
import components from './components'

const reducer = combineReducers({
  messages,
  components
})

export default reducer
