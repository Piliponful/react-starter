import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default () => {
  const messages = useSelector(state => state.messagesReducer.messages)

  const dispatch = useDispatch()
  const dispatchGetMessages = () => dispatch({
    type: 'SRPC_CALL',
    payload: {
      functionName: 'getMessages'
    }
  })

  useEffect(() => {
    dispatchGetMessages()
  })

  return <ul>{messages.map(message => <li key={message.id}>{message.content}</li>)}</ul>
}
