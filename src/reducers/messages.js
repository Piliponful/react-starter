import { SAVE_MESSAGE, GET_MESSAGES } from '../srpcFunctionNames'

const initialState = []

export default (state = initialState, action = {}) => {
  const { type: functionName, payload: returnValue = {} } = action
  const { message, messages } = returnValue

  const updateStateByFunctionName = {
    [`${SAVE_MESSAGE}Result`]: () => ([...state, message.parentMessageId ? null : message].filter(Boolean)),
    [`${GET_MESSAGES}Result`]: () => messages
  }

  const actionHandler = updateStateByFunctionName[functionName] || (() => state)
  return actionHandler()
}
