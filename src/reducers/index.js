import { combineReducers } from 'redux'

import compositionType from './compositionType'
import newGroup from './newGroup'
import selectedGroupId from './selectedGroupId'
import selectedForCompositionGroupIds from './selectedForCompositionGroupIds'

const reducer = combineReducers({
  compositionType,
  newGroup,
  selectedGroupId,
  selectedForCompositionGroupIds
})

export default reducer
