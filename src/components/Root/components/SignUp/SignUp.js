import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'
import { useLocalStorage } from '@rehooks/local-storage'

import HideHOC from '../../../HideHOC'

import { HIDE_SIGNUP, HIDE_MESSAGE_LIST, HIDE_MESSAGE_INPUT } from '../../../../actions/components'
import { CREATE_USER, VERIFY_USER } from '../../../../srpcFunctionNames'

export const SignUp = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    phoneNumber: '',
    verificationCode: '',
    showVerification: false
  })

  const [jwt, setJwt] = useLocalStorage('jwt')

  const dispatch = useDispatch()

  const { username, password, phoneNumber, verificationCode, showVerification } = state

  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)

  const createUser = async e => {
    if (e.keyCode !== 13 || e.shiftKey) {
      return
    }

    e.preventDefault()

    const { jwt } = await dispatchSrpcCall(CREATE_USER, { username, password, phoneNumber })

    setJwt(jwt)
    setState({ ...state, showVerification: true })
  }

  const verifyUser = async e => {
    if (e.keyCode !== 13 || e.shiftKey) {
      return
    }

    e.preventDefault()

    await dispatchSrpcCall(VERIFY_USER, { jwt, verificationCode })

    dispatch({ type: HIDE_SIGNUP, payload: true })
    dispatch({ type: HIDE_MESSAGE_LIST, payload: false })
    dispatch({ type: HIDE_MESSAGE_INPUT, payload: false })
  }

  const setField = e => setState({ ...state, [e.target.name]: e.target.value })

  return (
    <div>
      <input type='text' name='username' placeholder='username' value={username} onChange={setField} onKeyDown={createUser} />
      <input type='password' name='password' placeholder='password' value={password} onChange={setField} onKeyDown={createUser} />
      <input type='tel' name='phoneNumber' placeholder='phoneNumber' value={phoneNumber} onChange={setField} onKeyDown={createUser} />
      {
        showVerification
          ? <input type='number' name='verificationCode' placeholder='verificationCode' value={verificationCode} onChange={setField} onKeyDown={verifyUser} />
          : null
      }
    </div>
  )
}

export default HideHOC('hideSignUp')(SignUp)
