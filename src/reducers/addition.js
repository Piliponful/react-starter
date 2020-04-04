import { REQUEST_ADD_TWO_NUMBERS } from '../request/types'

const initialState = {
  result: null
}

export default (state = initialState, action = {}) => {
  const { type, payload = {} } = action
  const { result } = payload

  const typeToFunc = {
    [REQUEST_ADD_TWO_NUMBERS]: () => ({ ...state, result })
  }

  // default action handler just returns state unmodified
  const actionHandler = typeToFunc[type] || (() => state)
  return actionHandler()
}
