import React from 'react'
import { useDispatch } from 'react-redux'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'
import { useLocalStorage } from '@rehooks/local-storage'
import projectXUI from 'project-x-ui'

import HideHOC from '../../../HideHOC'

import { SAVE_MESSAGE } from '../../../../srpcFunctionNames'

const { leafs: { NewQuestion } } = projectXUI

export const MessageInput = () => {
  const [jwt] = useLocalStorage('jwt')

  const dispatch = useDispatch()

  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)

  const dispatchSaveMessage = content => dispatchSrpcCall(SAVE_MESSAGE, { jwt, content })

  return <NewQuestion saveQuestion={dispatchSaveMessage} />
}

export default HideHOC('hideMessageInput')(MessageInput)
