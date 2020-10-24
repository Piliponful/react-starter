import React from 'react'
import { Provider } from 'react-redux'

import store from '../../store'

import MessageInput from './components/MessageInput'
import MessageList from './components/MessageList'
import GroupList from './components/GroupList'
import SignUp from './components/SignUp'

export default () => (
  <Provider store={store}>
    <GroupList />
    <MessageList />
    <MessageInput />
    <SignUp />
  </Provider>
)
