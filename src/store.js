import { createStore, compose, applyMiddleware } from 'redux'

import reducer from './reducers'

// Redux DevTools setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware())
)

export default store
