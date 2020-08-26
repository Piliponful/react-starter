import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'
import { useLocalStorage } from '@rehooks/local-storage'

import { SAVE_MESSAGE } from '../../../../srpcFunctionNames'

export default () => {
  const hideMessageInput = useSelector(state => state.components.hideMessageInput)

  const [state, setState] = useState('')

  const [jwt] = useLocalStorage('jwt')

  const dispatch = useDispatch()

  if (hideMessageInput) {
    return null
  }

  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)

  const dispatchSaveMessage = content => dispatchSrpcCall(SAVE_MESSAGE, { jwt, content })

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
