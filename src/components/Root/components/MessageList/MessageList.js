import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'

import MessageItem from './components/MessageItem'

import { GET_MESSAGES } from '../../../../srpcFunctionNames'

export default () => {
  const messages = useSelector(state => state.messages)

  const dispatch = useDispatch()
  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)
  const dispatchGetMessages = () => dispatchSrpcCall(GET_MESSAGES)

  useEffect(() => {
    dispatchGetMessages()
  }, [])

  const hideMessageList = useSelector(state => state.components.hideMessageList)

  if (hideMessageList) {
    return null
  }

  return <ul>{messages.filter(i => !i.parentMessageId).map(message => <MessageItem key={message.id} message={message} />)}</ul>
}
