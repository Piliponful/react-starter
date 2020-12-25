import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'
import { useLocalStorage } from '@rehooks/local-storage'

import HideHOC from '../../../HideHOC'

import { SAVE_MESSAGE } from '../../../../srpcFunctionNames'

export const MessageInput = () => {
  const [state, setState] = useState('')

  const [jwt] = useLocalStorage('jwt')

  const dispatch = useDispatch()

  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)

  const dispatchSaveMessage = content => dispatchSrpcCall(SAVE_MESSAGE, { jwt, content })

  const saveMessage = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      dispatchSaveMessage(e.target.value)
      setState('')
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

export default HideHOC('hideMessageInput')(MessageInput)
