import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useLocalStorage from 'local-storage-hook'

import { HIDE_SIGNUP } from '../../../../actionTypes'

export default () => {
  const hideComponent = useSelector(state => state.components.hideSignUp)

  const [state, setState] = useState({
    username: '',
    password: '',
    phoneNumber: '',
    verificationCode: '',
    showVerification: false
  })

  const { username, password, phoneNumber, verificationCode, showVerification } = state

  const [jwt, setJwt] = useLocalStorage('jwt') // eslint-disable-line

  console.log(jwt)

  const dispatch = useDispatch()

  const createUser = async e => {
    if (e.keyCode !== 13 || e.shiftKey) {
      return
    }

    e.preventDefault()

    const jwtFromCreateUser = await dispatch({
      type: 'SRPC_CALL',
      payload: {
        functionName: 'createUser',
        functionArguments: { username, password, phoneNumber }
      }
    })

    console.log(jwtFromCreateUser)

    setJwt(jwtFromCreateUser)
    setState({ ...state, showVerification: true })
  }

  const verifyUser = async e => {
    if (e.keyCode !== 13 || e.shiftKey) {
      return
    }

    e.preventDefault()

    await dispatch({
      type: 'SRPC_CALL',
      payload: {
        functionName: 'verifyUser',
        functionArguments: { jwt, verificationCode }
      }
    })

    dispatch({ type: HIDE_SIGNUP, payload: true })
  }

  const setField = e => setState({ ...state, [e.target.name]: e.target.value })

  if (hideComponent) {
    return null
  }

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
