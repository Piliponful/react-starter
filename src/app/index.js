import React from 'react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'

import store from './store'

import Text from './components/Text'

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers')
    store.replaceReducer(nextRootReducer)
  })
}

const App = () => <Provider store={store}>
  <Text />
</Provider>

export default hot(module)(App)
