import React from 'react'

import { useDispatch } from 'react-redux'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'
import { useLocalStorage } from '@rehooks/local-storage'

import { CREATE_GROUP } from '../../../../../../srpcFunctionNames'

export default ({ messageId }) => {
  const [jwt] = useLocalStorage('jwt')

  const dispatch = useDispatch()

  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)

  const dispatchCreateGroup = content => dispatchSrpcCall(CREATE_GROUP, { jwt, messageId, content, name: 'test' })

  return (
    <span>
      <button onClick={() => dispatchCreateGroup('Yes')}>Create Group that answered Yes</button>
      <button onClick={() => dispatchCreateGroup('No')}>Create Group that answered No</button>
    </span>
  )
}
