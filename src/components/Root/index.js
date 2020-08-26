import React from 'react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'

import store from '../../store'

import MessageInput from './components/MessageInput'
import MessageList from './components/MessageList'
import GroupList from './components/GroupList'
import SignUp from './components/SignUp'

export default hot(() => (
  <Provider store={store}>
    <GroupList />
    <MessageList />
    <MessageInput />
    <SignUp />
  </Provider>
))
