import React from 'react'
import projectXUI from 'project-x-ui'
import { useDispatch } from 'react-redux'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'
import { useLocalStorage } from '@rehooks/local-storage'

import HideHOC from '../../../HideHOC'

import { INITIALIZATION } from '../../../../actions/components'
import { CREATE_USER, VERIFY_USER, GET_USER_TOKEN } from '../../../../srpcFunctionNames'

const { leafs: { Authorization } } = projectXUI

const AuthorizationScreen = () => {
  const [jwt, setJwt] = useLocalStorage('jwt')

  const dispatch = useDispatch()

  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)

  const createUser = async ({ username, password, phoneNumber }) => {
    const { jwt } = await dispatchSrpcCall(CREATE_USER, { username, password, phoneNumber })

    setJwt(jwt)
  }

  const verifyUser = async ({ verificationCode }) => {
    await dispatchSrpcCall(VERIFY_USER, { jwt, verificationCode })

    dispatch({ type: INITIALIZATION, payload: { jwt } })
  }

  const getUserToken = async ({ username, password }) => {
    const { jwt } = await dispatchSrpcCall(GET_USER_TOKEN, { username, password })
    setJwt(jwt)

    dispatch({ type: INITIALIZATION, payload: { jwt } })
  }

  return (
    <Authorization verifyUser={verifyUser} getUserToken={getUserToken} createUser={createUser} />
  )
}

export default HideHOC('hideAuthorizationScreen')(AuthorizationScreen)
