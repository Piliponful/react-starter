import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import projectXUI from 'project-x-ui'

import HideHOC from '../../../../../HideHOC'

import { SET_CIRCLE_PARTS } from '../../../../../../actions/groups'

const { leafs: { Circles } } = projectXUI

export const GroupComposition = () => {
  const selectedCircleParts = useSelector(state => state.groups.selectedCircleParts)
  const selectedForCombination = useSelector(state => state.groups.selectedForCombination)
  const dispatch = useDispatch()

  const setCircleParts = value => {
    dispatch({ type: SET_CIRCLE_PARTS, payload: { selectedCircleParts: value } })
  }

  console.log('here')

  return <Circles
    selectedCircleParts={selectedCircleParts}
    selectedGroups={selectedForCombination.filter(i => i.name)}
    onSelect={setCircleParts}
  />
}

export default HideHOC('hideGroupComposition')(GroupComposition)
