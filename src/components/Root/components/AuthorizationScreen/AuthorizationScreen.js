import React from 'react'
import projectXUI from 'project-x-ui'
import { useLocalStorage } from '@rehooks/local-storage'

import { useSrpcApi } from '../../../../hooks/useSrpcApi'

const { leafs: { Authorization } } = projectXUI

export const AuthorizationScreen = () => {
  const [jwt, setJwt] = useLocalStorage('jwt')

  if (jwt) {
    return null
  }

  const srpcApi = useSrpcApi()

  const createUser = async ({ username, password, phoneNumber }) => {
    const { jwt } = await srpcApi.createUser({ username, password, phoneNumber })

    setJwt(jwt)
  }

  const verifyUser = ({ verificationCode }) => srpcApi.verifyUser({ jwt, verificationCode })

  const getUserToken = async ({ username, password }) => {
    const { jwt } = await srpcApi.getUserToken({ username, password })

    setJwt(jwt)
  }

  return (
    <Authorization verifyUser={verifyUser} getUserToken={getUserToken} createUser={createUser} />
  )
}
