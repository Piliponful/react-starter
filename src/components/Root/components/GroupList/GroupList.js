import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocalStorage } from '@rehooks/local-storage'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'

import HideHOC from '../../../HideHOC'

import { GET_GROUPS, SET_SELECTED_GROUP, CREATE_GROUP, CREATE_COMPOSITE_GROUP } from '../../../../srpcFunctionNames'
import { SELECT_FOR_COMBINATION } from '../../../../actions/groups'
import { HIDE_GROUP_COMPOSITION } from '../../../../actions/components'

const circlePartsToCompositionType = circleParts => {
  if (circleParts.length > 1) {
    return 'union'
  }
  if (circleParts[0] === 'intersection') {
    return 'intersection'
  }
  if (circleParts[0] === 'right-wing') {
    return 'difference'
  }
}

const NewGroupContent = ({ group }) => {
  const selectedForCombination = useSelector(state => state.groups.selectedForCombination.filter(i => i.name))
  const circleParts = useSelector(state => state.groups.circleParts)
  const [state, setState] = useState('')
  const [jwt] = useLocalStorage('jwt')
  const dispatch = useDispatch()
  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)
  const createGroup = () => dispatchSrpcCall(CREATE_GROUP, { jwt, ...group, name: state })
  const createCompositeGroup = () => dispatchSrpcCall(CREATE_COMPOSITE_GROUP, {
    jwt,
    groupIdLeft: selectedForCombination[0].id,
    groupIdRight: selectedForCombination[1].id,
    compositionType: circlePartsToCompositionType(circleParts),
    name: state
  })

  return (
    <>
      <input value={state} onChange={e => setState(e.target.value)} />
      <button onClick={selectedForCombination.length === 2 ? createCompositeGroup : createGroup}>Save</button>
    </>
  )
}

const GroupList = () => {
  const groups = useSelector(state => state.groups.all)
  const selectedForCombination = useSelector(state => state.groups.selectedForCombination)

  const [jwt] = useLocalStorage('jwt')

  const dispatch = useDispatch()
  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)
  const getGroups = () => dispatchSrpcCall(GET_GROUPS, { jwt })
  const setSelectedGroup = groupId => dispatchSrpcCall(SET_SELECTED_GROUP, { jwt, groupId })

  const combine = group => {
    dispatch({ type: SELECT_FOR_COMBINATION, payload: { group } })
    dispatch({ type: HIDE_GROUP_COMPOSITION, payload: false })
  }

  useEffect(() => {
    getGroups()
  }, [])

  const groupsToDisplay = selectedForCombination.length === 3 ? selectedForCombination : groups

  return <ul>
    {
      groupsToDisplay.map(group => (
        <span key={group.id || 'new'}>
          {group.name || <NewGroupContent group={group} />}
          {
            group.name
              ? (
                <button
                  onClick={() => selectedForCombination.length === 1
                    ? combine(group)
                    : setSelectedGroup(group.id)
                  }
                >
                  {group.selected ? 'Unselect' : 'Select'}
                </button>
              )
              : null
          }
          {
            selectedForCombination.length === 0
              ? <button onClick={() => combine(group)}>Combine</button>
              : null
          }
        </span>
      ))
    }
  </ul>
}

export default HideHOC('hideGroupList')(GroupList)
