import React, { useState } from 'react'
import Select from 'react-select'
import { useDispatch } from 'react-redux'

import HideHOC from '../../../HideHOC'

import union from './img/union.png'
import intersection from './img/intersection.png'
import difference from './img/difference.png'

import { SET_CIRCLE_PARTS } from '../../../../actions/groups'

const compositionTypes = [
  { value: 'union', label: 'Union' },
  { value: 'intersection', label: 'Intersection' },
  { value: 'difference', label: 'Difference' }
]

const compositionTypeToCirclePart = {
  intersection: ['intersection'],
  union: ['left-wing', 'right-wing', 'intersection'],
  difference: ['left-wing']
}

const pngByCompositionType = {
  union,
  intersection,
  difference
}

export const GroupComposition = () => {
  const [selectedOption, setOption] = useState(compositionTypes[0])

  const dispatch = useDispatch()

  const onChange = value => {
    setOption(value)
    dispatch({ type: SET_CIRCLE_PARTS, payload: compositionTypeToCirclePart[value] })
  }

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={onChange}
        options={compositionTypes}
      />
      First circle is first group, second circle is second

      Blue indicate new group
      <hr />
      <img src={pngByCompositionType[selectedOption.value]} alt={selectedOption.label} />
    </div>
  )
}

export default HideHOC('hideGroupComposition')(GroupComposition)
