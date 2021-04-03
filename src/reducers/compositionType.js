import { SET_COMPOSITION_TYPE } from '../actions/compositionType'

const initialState = null

export default (state = initialState, action) => {
  const { type, payload: compositionType } = action

  const updateStateByFunctionName = {
    [SET_COMPOSITION_TYPE]: () => compositionType
  }

  const actionHandler = updateStateByFunctionName[type] || (() => state)

  return actionHandler()
}
