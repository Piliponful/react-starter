import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import requestHandlers from './request/handlers'

import reducer from './reducers'

// Redux DevTools setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Redux-saga setup
const saga = createSagaMiddleware()

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(saga))
)

saga.run(requestHandlers)

export default store
