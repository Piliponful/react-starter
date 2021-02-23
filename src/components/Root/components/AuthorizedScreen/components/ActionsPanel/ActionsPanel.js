import React from 'react'
import { useDispatch } from 'react-redux'
import projectXUI from 'project-x-ui'
import { useLocalStorage } from '@rehooks/local-storage'

import { INITIALIZATION } from '../../../../../../actions/components'

const { leafs: { ActionsPanel: ActionsPanelUI } } = projectXUI

export const ActionsPanel = () => {
  const [_, _1, removeJwt] = useLocalStorage('jwt') // eslint-disable-line
  const dispatch = useDispatch()

  const signOut = () => {
    removeJwt()
    dispatch({ type: INITIALIZATION, payload: { jwt: null } })
  }

  return (
    <ActionsPanelUI logout={signOut} />
  )
}
