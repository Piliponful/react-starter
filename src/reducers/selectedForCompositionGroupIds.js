import { SET_SELECTED_FOR_COMPOSITION_GROUP_IDS } from '../actions/selectedForCompositionGroupIds'

const initialState = []

export default (state = initialState, action) => {
  const { type, payload: selectedForCompositionGroupIds } = action

  const updateStateByFunctionName = {
    [SET_SELECTED_FOR_COMPOSITION_GROUP_IDS]: () => selectedForCompositionGroupIds
  }

  const actionHandler = updateStateByFunctionName[type] || (() => state)

  return actionHandler()
}
