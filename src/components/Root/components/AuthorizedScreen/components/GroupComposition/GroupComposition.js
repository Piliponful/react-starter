import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import projectXUI from 'project-x-ui'

import { SET_COMPOSITION_TYPE } from '../../../../../../actions/compositionType'

const { leafs: { Circles } } = projectXUI

export const GroupComposition = () => {
  const selectedForComposition = useSelector(state => state.selectedForCompositionGroupIds)
  const dispatch = useDispatch()

  if (selectedForComposition.length === 0) {
    return null
  }

  const setCompositionType = compositionType =>
    dispatch({ type: SET_COMPOSITION_TYPE, payload: compositionType })

  return (
    <Circles
      selectedGroups={selectedForComposition}
      handleCompositionTypeChange={setCompositionType}
    />
  )
}

export default GroupComposition
