import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'

import MessageItem from './components/MessageItem'
import GroupCreationButtons from './components/GroupCreationButtons'

import { GET_MESSAGES } from '../../../../srpcFunctionNames'

export const MessageList = () => {
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

  return (
    <ul>
      {
        messages
          .filter(i => !i.parentMessageId)
          .map(message => {
            const response = messages.find(i => i.parentMessageId === message.id)
            const responseContent = response ? response.content : null

            return (
              <>
                <MessageItem key={message.id} message={message} selectedResponse={responseContent} />
                <GroupCreationButtons messageId={message.id} />
              </>
            )
          })
      }
    </ul>
  )
}
