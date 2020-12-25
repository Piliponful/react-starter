import findAndReplace from 'find-and-replace-array'

import { CREATE_GROUP, GET_GROUPS, SET_SELECTED_GROUP } from '../srpcFunctionNames'

const initialState = []

export default (state = initialState, action = {}) => {
  const { type: functionName, payload: returnValue = {} } = action
  const { group, groups } = returnValue

  const updateStateByFunctionName = {
    [`${CREATE_GROUP}Result`]: () => ([...state, group]),
    [`${GET_GROUPS}Result`]: () => groups,
    [`${SET_SELECTED_GROUP}Result`]: () => {
      const selected = state.find(i => i.selected)
      return findAndReplace(findAndReplace(state, { ...selected, selected: false }, i => i.selected), group, i => i.id === group.id)
    }
  }

  const actionHandler = updateStateByFunctionName[functionName] || (() => state)
  return actionHandler()
}
