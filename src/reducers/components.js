import { HIDE_SIGNUP, HIDE_MESSAGE_INPUT, HIDE_MESSAGE_LIST } from '../actionTypes'

const initialState = {
  hideSignUp: false,
  hideMessageInput: true,
  hideMessageList: true
}

export default (state = initialState, action = {}) => {
  const { type, payload } = action

  const updateStateByFunctionName = {
    [HIDE_SIGNUP]: () => ({ ...state, hideSignUp: payload }),
    [HIDE_MESSAGE_INPUT]: () => ({ ...state, hideMessageInput: payload }),
    [HIDE_MESSAGE_LIST]: () => ({ ...state, hideMessageList: payload })
  }

  // default action handler just returns state unmodified
  const actionHandler = updateStateByFunctionName[type] || (() => state)
  return actionHandler()
}
