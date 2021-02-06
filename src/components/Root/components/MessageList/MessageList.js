import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'
import { useLocalStorage } from '@rehooks/local-storage'

import MessageItem from './components/MessageItem'
import GroupCreationButtons from './components/GroupCreationButtons'
import HideHOC from '../../../HideHOC'

import { GET_MESSAGES } from '../../../../srpcFunctionNames'

const MessageList = () => {
  const messages = useSelector(state => state.messages)

  const [jwt] = useLocalStorage('jwt')

  const dispatch = useDispatch()
  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)
  const dispatchGetMessages = () => dispatchSrpcCall(GET_MESSAGES, { jwt })

  useEffect(() => {
    dispatchGetMessages()
  }, [])

  return (
    <ul>
      {
        messages
          .map(message => {
            return (
              <React.Fragment key={message.id}>
                <MessageItem message={message} selectedResponse={message.currentUserAnswer} />
                <GroupCreationButtons messageId={message.id} />
              </React.Fragment>
            )
          })
      }
    </ul>
  )
}

export default HideHOC('hideMessageList')(MessageList)
