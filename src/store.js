import { createStore, compose, applyMiddleware } from 'redux'
import createSrpcMiddleware from 'redux-srpc'

import reducer from './reducers'

const srpcMiddleware = createSrpcMiddleware('/api')

// Redux DevTools setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(srpcMiddleware))
)

export default store
