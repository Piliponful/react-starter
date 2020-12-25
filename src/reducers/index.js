import { combineReducers } from 'redux'

import messages from './messages'
import groups from './groups'

import components from './components'

const reducer = combineReducers({
  messages,
  groups,

  components
})

export default reducer
