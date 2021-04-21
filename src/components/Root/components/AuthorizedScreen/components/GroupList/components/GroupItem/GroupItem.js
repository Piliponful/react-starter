import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocalStorage } from '@rehooks/local-storage'
import projectXUI from 'project-x-ui'

import { useSrpcApi } from '../../../../../../../../hooks/useSrpcApi'

import { SET_SELECTED_FOR_COMPOSITION_GROUP_IDS } from '../../../../../../../../actions/selectedForCompositionGroupIds'
import { SET_SELECTED_GROUP_ID } from '../../../../../../../../actions/selectedGroupId'
import { SET_NEW_GROUP } from '../../../../../../../../actions/newGroup'

const { leafs: { GroupCard: GroupCardUI } } = projectXUI

const colors = ['#d24a43', '#3eb5f1']

export const GroupItem = ({ group }) => {
  const [jwt] = useLocalStorage('jwt')

  const compositionType = useSelector(state => state.compositionType)
  const selectedForComposition = useSelector(state => state.selectedForCompositionGroupIds)
  const selectedGroupId = useSelector(state => state.selectedGroupId)
  const newGroup = useSelector(state => state.newGroup)

  const dispatch = useDispatch()

  const srpcApi = useSrpcApi()

  const createSimpleGroup = async name => {
    await srpcApi.createGroup({ jwt, ...group, name })

    dispatch({ type: SET_NEW_GROUP, payload: { ...newGroup, created: true } })
  }

  const createCompositeGroup = async name => {
    await srpcApi.createCompositeGroup({
      jwt,
      groupIdLeft: selectedForComposition[0].id,
      groupIdRight: selectedForComposition[1].id,
      compositionType,
      name
    })

    dispatch({ type: SET_NEW_GROUP, payload: { ...newGroup, created: true } })
    dispatch({ type: SET_SELECTED_FOR_COMPOSITION_GROUP_IDS, payload: [] })
  }

  const createGroup = selectedForComposition.length === 2 ? createCompositeGroup : createSimpleGroup

  const combine = async () => {
    const newGroup = {
      id: group.id,
      color: selectedForComposition.length ? (selectedForComposition[0].color === colors[1] ? colors[0] : colors[1]) : colors[0]
    }

    const newSelectedForCompositionGroupIds =
      selectedForComposition.find(i => i.id === group.id)
        ? selectedForComposition.filter(i => i.id !== group.id)
        : [...selectedForComposition, newGroup]

    if (newSelectedForCompositionGroupIds.length === 2) {
      dispatch({ type: SET_NEW_GROUP, payload: { userCount: 0, color: '#92278f' } })
    }

    dispatch({
      type: SET_SELECTED_FOR_COMPOSITION_GROUP_IDS,
      payload: newSelectedForCompositionGroupIds
    })
  }

  const toggleGroupSelection = () => {
    if (group.id === undefined) {
      dispatch({
        type: SET_NEW_GROUP,
        payload: null
      })
      dispatch({
        type: SET_SELECTED_FOR_COMPOSITION_GROUP_IDS,
        payload: []
      })
      return
    }
    srpcApi.setSelectedGroup({ jwt, groupId: group.id })
    dispatch({ type: SET_SELECTED_GROUP_ID, payload: selectedGroupId === group.id ? null : group.id })
  }

  const cancel = () => {
    dispatch({ type: SET_NEW_GROUP, payload: null })
  }

  useEffect(() => {
    if (newGroup && (group.id === newGroup.id)) {
      if (compositionType) {
        srpcApi.getCompositeGroupUserCount({
          jwt,
          groupIdLeft: selectedForComposition[0].id,
          groupIdRight: selectedForComposition[1].id,
          compositionType
        })
          .then(({ userCount }) => {
            dispatch({ type: SET_NEW_GROUP, payload: { userCount, color: '#92278f' } })
          })
      } else {
        dispatch({ type: SET_NEW_GROUP, payload: { userCount: 0, color: '#92278f' } })
      }
    }
  }, [compositionType])

  return (
    <GroupCardUI
      readyToSave={selectedForComposition.length ? compositionType : true}
      save={createGroup}
      toggleSelection={selectedForComposition.find(i => i.id === group.id) ? combine : toggleGroupSelection}
      combine={combine}
      cancel={cancel}
      {...group}
    />
  )
}
