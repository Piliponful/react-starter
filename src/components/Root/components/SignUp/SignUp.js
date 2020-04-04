import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export default () => {
  const [{ username, password, phoneNumber }, setState] = useState({
    username: '',
    password: '',
    phoneNumber: ''
  })

  const dispatch = useDispatch()
  const dispatchCreateUser = () => dispatch({
    type: 'SRPC_CALL',
    payload: {
      functionName: 'createUser',
      functionArguments: { username, password, phoneNumber }
    }
  })

  const setField = e => setState({ [e.target.name]: e.target.value })

  const createUser = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      dispatchCreateUser()
    }
  }

  return (
    <div>
      <input type='text' name='username' value={username} onChange={setField} onKeyDown={createUser} />
      <input type='password' name='password' value={password} onChange={setField} onKeyDown={createUser} />
      <input type='tel' name='phoneNumber' value={phoneNumber} onChange={setField} onKeyDown={createUser} />
    </div>
  )
}
