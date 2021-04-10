import React, { useState } from 'react'
import projectXUI from 'project-x-ui'
import { useLocalStorage } from '@rehooks/local-storage'

import { useSrpcApi } from '../../../../hooks/useSrpcApi'

const { leafs: { Authorization } } = projectXUI

export const AuthorizationScreen = () => {
  const [jwt, setJwt] = useLocalStorage('jwt')
  const [userId, setUserId] = useState(null)

  if (jwt) {
    return null
  }

  const srpcApi = useSrpcApi()

  const createUser = async ({ username, password, phoneNumber }) => {
    const { userId } = await srpcApi.createUser({ username, password, phoneNumber })
    setUserId(userId)
  }

  const verifyUser = async ({ verificationCode }) => {
    const { jwt } = await srpcApi.verifyUser({ userId, verificationCode })
    setJwt(jwt)
  }

  const getUserToken = async ({ username, password }) => {
    const { jwt } = await srpcApi.getUserToken({ username, password })

    setJwt(jwt)
  }

  return (
    <Authorization verifyUser={verifyUser} getUserToken={getUserToken} createUser={createUser} />
  )
}
