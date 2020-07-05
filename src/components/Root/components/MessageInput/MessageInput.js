import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default () => {
  const hideMessageInput = useSelector(state => state.components.hideMessageInput)

  const [state, setState] = useState('')
  const dispatch = useDispatch()
  const dispatchSaveMessage = content => dispatch({
    type: 'SRPC_CALL',
    payload: {
      functionName: 'saveMessage',
      functionArguments: { content }
    }
  })

  const saveMessage = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      dispatchSaveMessage(e.target.value)
    }
  }

  if (hideMessageInput) {
    return null
  }

  return <textarea
    value={state}
    onChange={e => setState(e.target.value)}
    onKeyDown={saveMessage}
    placeholder='message'
    rows='5'
    cols='33'
  />
}
