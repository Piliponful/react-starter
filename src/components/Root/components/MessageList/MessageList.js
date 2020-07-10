import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'

import { GET_MESSAGES } from '../../../../srpcFunctionNames'

export default () => {
  const hideMessageList = useSelector(state => state.components.hideMessageList)

  const messages = useSelector(state => state.messages)

  const dispatch = useDispatch()
  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)
  const dispatchGetMessages = () => dispatchSrpcCall(GET_MESSAGES)

  useEffect(() => {
    dispatchGetMessages()
  }, [])

  if (hideMessageList) {
    return null
  }

  return <ul>{messages.map(message => <li key={message.id}>{message.content}</li>)}</ul>
}
