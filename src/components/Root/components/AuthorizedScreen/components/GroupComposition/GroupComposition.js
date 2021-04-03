import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import projectXUI from 'project-x-ui'
import { isEqual } from 'lodash'

import { SET_COMPOSITION_TYPE } from '../../../../../../actions/compositionType'

const { leafs: { Circles } } = projectXUI

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

export const GroupComposition = () => {
  const selectedForComposition = useSelector(state => state.selectedForCompositionGroupIds)
  const dispatch = useDispatch()

  if (selectedForComposition.length === 0) {
    return null
  }

  const setCircleParts = value =>
    dispatch({ type: SET_COMPOSITION_TYPE, payload: circlePartsToCompositionType(value) })

  return (
    <Circles
      selectedGroups={selectedForComposition}
      onSelect={setCircleParts}
    />
  )
}

export default GroupComposition
