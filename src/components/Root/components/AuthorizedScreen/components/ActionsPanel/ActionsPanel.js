import React from 'react'
import projectXUI from 'project-x-ui'
import { useLocalStorage } from '@rehooks/local-storage'

const { leafs: { ActionsPanel: ActionsPanelUI } } = projectXUI

export const ActionsPanel = () => {
  const [_, _1, removeJwt] = useLocalStorage('jwt') // eslint-disable-line

  const signOut = () => removeJwt()

  return (
    <ActionsPanelUI logout={signOut} />
  )
}
