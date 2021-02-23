import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocalStorage } from '@rehooks/local-storage'
import { dispatchSrpcCall as createDispatchSrpcCall } from 'redux-srpc'
import projectXUI from 'project-x-ui'
import { isEqual } from 'lodash'

import { GET_GROUPS, SET_SELECTED_GROUP, CREATE_GROUP, CREATE_COMPOSITE_GROUP } from '../../../../../../srpcFunctionNames'
import { SELECT_FOR_COMBINATION } from '../../../../../../actions/groups'
import { HIDE_GROUP_COMPOSITION } from '../../../../../../actions/components'

const { leafs: { GroupCard: GroupCardUI } } = projectXUI

const circlePartsToCompositionType = circleParts => {
  if (isEqual(circleParts, ['intersection'])) {
    return 'intersection'
  }
  if (isEqual(circleParts, ['left-wing'])) {
    return 'difference'
  }
  if (isEqual(circleParts, ['left-wing', 'intersection', 'right-wing'])) {
    return 'union'
  }
}

const GroupCard = ({ group }) => {
  const [jwt] = useLocalStorage('jwt')

  const circleParts = useSelector(state => state.groups.selectedCircleParts)

  const selectedForCombination = useSelector(state => state.groups.selectedForCombination.filter(i => i.name))

  const dispatch = useDispatch()
  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)

  const createSimpleGroup = name => dispatchSrpcCall(CREATE_GROUP, { jwt, ...group, name })
  const createCompositeGroup = name => dispatchSrpcCall(CREATE_COMPOSITE_GROUP, {
    jwt,
    groupIdLeft: selectedForCombination[0].id,
    groupIdRight: selectedForCombination[1].id,
    compositionType: circlePartsToCompositionType(circleParts),
    name
  })

  const createGroup = name => {
    dispatch({ type: HIDE_GROUP_COMPOSITION, payload: true })
    return selectedForCombination.length === 2 ? createCompositeGroup(name) : createSimpleGroup(name)
  }

  const combine = group => {
    dispatch({ type: SELECT_FOR_COMBINATION, payload: { group } })
    if (selectedForCombination.length === 1 && selectedForCombination.find(i => i.id === group.id)) {
      dispatch({ type: HIDE_GROUP_COMPOSITION, payload: true })
    }
  }

  const toggleGroupSelection = groupId => dispatchSrpcCall(SET_SELECTED_GROUP, { jwt, groupId })

  return <GroupCardUI
    readyToSave={selectedForCombination.length ? circleParts.length : true}
    save={createGroup}
    toggleSelection={() => selectedForCombination.map(i => i.id).includes(group.id) ? combine(group) : toggleGroupSelection(group.id)}
    combine={() => combine(group)}
    {...group}
  />
}

export const GroupList = () => {
  const [jwt] = useLocalStorage('jwt')

  const dispatch = useDispatch()
  const dispatchSrpcCall = createDispatchSrpcCall(dispatch)
  const getGroups = () => dispatchSrpcCall(GET_GROUPS, { jwt })

  const hideGroupComposition = useSelector(state => state.components.hideGroupComposition)
  const selectedForCombination = useSelector(state => state.groups.selectedForCombination)

  useEffect(() => {
    getGroups()
  }, [])

  useEffect(() => {
    if (selectedForCombination.length === 1 && hideGroupComposition) {
      dispatch({ type: HIDE_GROUP_COMPOSITION, payload: false })
    }
  }, [selectedForCombination.length])

  const groups = useSelector(state => state.groups.all)

  const groupsToDisplay = selectedForCombination.length === 3 ? selectedForCombination : groups

  return groupsToDisplay.map(g => <GroupCard key={g.id || 'new'} group={g} />)
}
