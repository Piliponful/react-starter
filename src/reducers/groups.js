import findAndReplace from 'find-and-replace-array'

import { GET_GROUPS, SET_SELECTED_GROUP, CREATE_GROUP as CREATE_GROUP_SRPC } from '../srpcFunctionNames'
import { CREATE_GROUP, SELECT_FOR_COMBINATION, SET_CIRCLE_PARTS } from '../actions/groups'

const initialState = { all: [], selectedForCombination: [], circleParts: ['left-wing', 'right-wing', 'intersection'] }

export default (state = initialState, action = {}) => {
  const { type, payload = {} } = action
  const { group, groups: all } = payload

  const updateStateByFunctionName = {
    [CREATE_GROUP]: () => ({ ...state, all: [group, ...state] }),
    [SET_CIRCLE_PARTS]: () => ({ ...state, all: [group, ...state] }),
    [SELECT_FOR_COMBINATION]: () => {
      const newS =
        state.selectedForCombination.find(i => i.id === group.id)
          ? state.selectedForCombination.filter(i => i.id !== group.id)
          : [...state.selectedForCombination, group]

      return ({
        ...state,
        selectedForCombination: newS.length === 2 ? [{ userCount: 324 }, ...newS] : newS
      })
    },
    [`${CREATE_GROUP_SRPC}Result`]: () => ({ ...state, all: [group, ...state.filter(i => i.name)] }),
    [`${GET_GROUPS}Result`]: () => ({ ...state, all }),
    [`${SET_SELECTED_GROUP}Result`]: () => {
      const selected = state.all.find(i => i.selected)
      return ({
        ...state,
        all: findAndReplace(findAndReplace(state.all, { ...selected, selected: false }, i => i.selected), group, i => i.id === group.id)
      })
    }
  }

  const actionHandler = updateStateByFunctionName[type] || (() => state)
  return actionHandler()
}
