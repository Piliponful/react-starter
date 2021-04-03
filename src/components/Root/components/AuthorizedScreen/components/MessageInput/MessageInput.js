import React from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import projectXUI from 'project-x-ui'

import { useSrpcApi } from '../../../../../../hooks/useSrpcApi'

const { leafs: { NewQuestion } } = projectXUI

export const MessageInput = () => {
  const [jwt] = useLocalStorage('jwt')

  const srpcApi = useSrpcApi()

  const saveQuestion = content => srpcApi.saveMessage({ jwt, content })

  return <NewQuestion saveQuestion={saveQuestion} />
}
