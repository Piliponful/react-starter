import React from 'react'
import { Provider } from 'react-redux'
import projectXUI from 'project-x-ui'

import AuthorizedScreen from './components/AuthorizedScreen'
import AuthorizationScreen from './components/AuthorizationScreen'

import store from '../../store'

const { shallow: { Body } } = projectXUI

export default () => (
  <Provider store={store}>
    <Body>
      <AuthorizationScreen />
      <AuthorizedScreen />
    </Body>
  </Provider>
)
