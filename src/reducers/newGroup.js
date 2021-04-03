import { SET_NEW_GROUP } from '../actions/newGroup'

const initialState = null

export default (state = initialState, action) => {
  const { type, payload: newGroup } = action

  const updateStateByFunctionName = {
    [SET_NEW_GROUP]: () => newGroup
  }

  const actionHandler = updateStateByFunctionName[type] || (() => state)

  return actionHandler()
}
