import findAndReplace from 'find-and-replace-array'

import { GET_GROUPS, SET_SELECTED_GROUP, CREATE_GROUP as CREATE_GROUP_SRPC } from '../srpcFunctionNames'
import { CREATE_GROUP } from '../actions/groups'

const initialState = []

export default (state = initialState, action = {}) => {
  const { type, payload = {} } = action
  const { group, groups } = payload

  const updateStateByFunctionName = {
    [CREATE_GROUP]: () => [group, ...state],
    [`${CREATE_GROUP_SRPC}Result`]: () => [group, ...state.filter(i => i.name)],
    [`${GET_GROUPS}Result`]: () => groups,
    [`${SET_SELECTED_GROUP}Result`]: () => {
      const selected = state.find(i => i.selected)
      return findAndReplace(findAndReplace(state, { ...selected, selected: false }, i => i.selected), group, i => i.id === group.id)
    }
  }

  const actionHandler = updateStateByFunctionName[type] || (() => state)
  return actionHandler()
}
