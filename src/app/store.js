import { createStore, applyMiddleware, compose } from 'redux'
import { logger } from 'redux-logger'

import reducer from './reducers'

// Redux DevTools
const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger)
  )
)

export default store
