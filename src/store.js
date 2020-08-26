import { createStore, applyMiddleware } from 'redux'
import { createSrpcMiddleware } from 'redux-srpc'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers'

const srpcMiddleware = createSrpcMiddleware('/api')

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(srpcMiddleware))
)

export default store
