import React from 'react'
import projectXUI from 'project-x-ui'
import { useLocalStorage } from '@rehooks/local-storage'
import decodeJwt from 'jwt-decode'

const { leafs: { ActionsPanel: ActionsPanelUI } } = projectXUI

export const ActionsPanel = () => {
  const [jwt,, removeJwt] = useLocalStorage('jwt') // eslint-disable-line

  const { username } = decodeJwt(jwt)

  const signOut = () => removeJwt()

  return (
    <ActionsPanelUI logout={signOut} username={username} />
  )
}
