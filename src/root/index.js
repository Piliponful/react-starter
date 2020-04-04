import React from 'react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'

import store from '../store'

import Text from './components/Text'

export default hot(() => <Provider store={store}><Text /></Provider>)
