import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export default () => {
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

  return <textarea
    value={state}
    onChange={e => setState(e.target.value)}
    onKeyDown={saveMessage}
    placeholder='message'
    rows='5'
    cols='33'
  />
}
