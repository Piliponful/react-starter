import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default () => {
  const hideMessageList = useSelector(state => state.components.hideMessageList)

  const messages = useSelector(state => state.messages)

  const dispatch = useDispatch()
  const dispatchGetMessages = () => dispatch({
    type: 'SRPC_CALL',
    payload: {
      functionName: 'getMessages'
    }
  })

  useEffect(() => {
    dispatchGetMessages()
  }, [])

  if (hideMessageList) {
    return null
  }

  return <ul>{messages.map(message => <li key={message.id}>{message.content}</li>)}</ul>
}
