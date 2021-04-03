import { SET_SELECTED_GROUP_ID } from '../actions/selectedGroupId'

const initialState = null

export default (state = initialState, action) => {
  const { type, payload: selectedGroupId } = action

  const updateStateByFunctionName = {
    [SET_SELECTED_GROUP_ID]: () => selectedGroupId
  }

  const actionHandler = updateStateByFunctionName[type] || (() => state)

  return actionHandler()
}
