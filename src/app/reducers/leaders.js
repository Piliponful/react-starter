import { SET_LEADERS } from '../action/types/leaders.js'

const initialState = {
  value: [],
  leaders: []
}

export default (state = initialState, action = {}) => {
  const { type, payload = {} } = action
  const { leaders } = payload

  const typeToFunc = {
    [SET_LEADERS]: () => ({ ...state, leaders })
  }

  const actionHandler = typeToFunc[type] || (() => state)
  return actionHandler()
}
