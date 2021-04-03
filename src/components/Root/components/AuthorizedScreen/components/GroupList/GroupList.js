import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocalStorage } from '@rehooks/local-storage'

import GroupItem from './components/GroupItem'

import { useSrpcApi } from '../../../../../../hooks/useSrpcApi'

import { SET_SELECTED_GROUP_ID } from '../../../../../../actions/selectedGroupId'
import { SET_NEW_GROUP } from '../../../../../../actions/newGroup'

export const GroupList = () => {
  const [groups, setGroups] = useState([])
  const [jwt] = useLocalStorage('jwt')
  const srpcApi = useSrpcApi()
  const dispatch = useDispatch()

  const selectedForComposition = useSelector(state => state.selectedForCompositionGroupIds)
  const newGroup = useSelector(state => state.newGroup)
  const selectedGroupId = useSelector(state => state.selectedGroupId)

  useEffect(() => {
    srpcApi.getGroups({ jwt })
      .then(({ groups }) => {
        setGroups(groups)
        const selectedGroup = groups.find(g => g.selected)
        if (selectedGroup) {
          dispatch({ type: SET_SELECTED_GROUP_ID, payload: selectedGroup.id })
        }
      })
  }, [])

  useEffect(() => {
    if (newGroup && newGroup.created) {
      srpcApi.getGroups({ jwt }).then(({ groups }) => setGroups(groups))
      dispatch({
        type: SET_NEW_GROUP,
        payload: null
      })
    }
  }, [newGroup])

  const groupsToDisplay = (selectedForComposition.length === 2
    ? [...selectedForComposition.map(g => ({ ...g, ...groups.find(i => i.id === g.id) })), newGroup]
    : selectedForComposition.length === 1
      ? groups
          .map(g => selectedForComposition.find(i => i.id === g.id)
            ? ({ ...g, color: selectedForComposition.find(i => i.id === g.id).color })
            : g
          )
      : [newGroup, ...groups.map(g => ({ ...g, selected: g.id === selectedGroupId }))]).filter(Boolean)

  return groupsToDisplay.map(g => <GroupItem key={g.id || 'new'} group={g} />)
}
