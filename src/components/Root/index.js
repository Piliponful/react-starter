import React from 'react'
import { Provider } from 'react-redux'

import store from '../../store'

import MessageInput from './components/MessageInput'
import MessageList from './components/MessageList'
import GroupList from './components/GroupList'
import SignUp from './components/SignUp'
import GroupComposition from './components/GroupComposition'

export default () => (
  <Provider store={store}>
    <GroupList />
    <GroupComposition />
    <MessageList />
    <MessageInput />
    <SignUp />
  </Provider>
)
