import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocalStorage } from '@rehooks/local-storage'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'

import HideHOC from '../../../HideHOC'

import { GET_GROUPS, SET_SELECTED_GROUP, CREATE_GROUP } from '../../../../srpcFunctionNames'

const NewGroupContent = ({ group }) => {
  const [state, setState] = useState('')
  const [jwt] = useLocalStorage('jwt')
  const dispatch = useDispatch()
  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)
  const createGroup = () => dispatchSrpcCall(CREATE_GROUP, { jwt, ...group, name: state })

  return (
    <>
      <input value={state} onChange={e => setState(e.target.value)} />
      <button onClick={createGroup}>Save</button>
    </>
  )
}

const GroupList = () => {
  const groups = useSelector(state => state.groups)

  const [jwt] = useLocalStorage('jwt')

  const dispatch = useDispatch()
  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)
  const getGroups = () => dispatchSrpcCall(GET_GROUPS, { jwt })
  const setSelectedGroup = groupId => dispatchSrpcCall(SET_SELECTED_GROUP, { jwt, groupId })

  useEffect(() => {
    getGroups()
  }, [])

  return <ul>
    {
      groups.map(group => (
        <span key={group.id}>
          {group.name || <NewGroupContent group={group} />}
          {group.name ? <button onClick={() => setSelectedGroup(group.id)}>{group.selected ? 'Unselect' : 'Select'}</button> : null}
        </span>
      ))
    }
  </ul>
}

export default HideHOC('hideGroupList')(GroupList)
