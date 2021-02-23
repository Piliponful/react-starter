import { createStore, applyMiddleware } from 'redux'
import { createSrpcMiddleware } from 'redux-srpc'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'

import { INITIALIZATION } from './actions/components'

const srpcMiddleware = createSrpcMiddleware('/api')

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(srpcMiddleware))
)

store.dispatch({ type: INITIALIZATION, payload: Object.fromEntries(Object.entries(window.localStorage)) })

export default store
