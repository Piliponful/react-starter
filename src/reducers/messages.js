import { SAVE_MESSAGE, GET_MESSAGES } from '../srpcFunctionNames'

const initialState = {}

export default (state = initialState, action = {}) => {
  const { type: functionName, payload: returnValue = {} } = action
  const { message, messages, messageColumn } = returnValue

  const updateStateByFunctionName = {
    [`${SAVE_MESSAGE}Result`]: () => (
      message.parentMessageId
        ? state.map(i =>
          i.id === message.parentMessageId
            ? ({
              ...i,
              currentUserAnswer: message.content,
              answersCount: { ...i.answersCount, [message.content]: i.answersCount[message.content] + 1 }
            })
            : i
        )
        : [...state, message]
    ).filter(Boolean),
    [`${GET_MESSAGES}Result`]: () => ({ ...state, [messageColumn]: messages })
  }

  const actionHandler = updateStateByFunctionName[functionName] || (() => state)
  return actionHandler()
}
