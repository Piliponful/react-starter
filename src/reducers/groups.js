import findAndReplace from 'find-and-replace-array'
import { omit } from 'lodash'

import { GET_GROUPS, SET_SELECTED_GROUP, CREATE_GROUP as CREATE_GROUP_SRPC, CREATE_COMPOSITE_GROUP } from '../srpcFunctionNames'
import { CREATE_GROUP, SELECT_FOR_COMBINATION, SET_CIRCLE_PARTS } from '../actions/groups'

const initialState = { all: [], selectedForCombination: [], selectedCircleParts: [] }

export default (state = initialState, action = {}) => {
  const { type, payload = {} } = action
  const { group, groups: all, selectedCircleParts } = payload

  const updateStateByFunctionName = {
    [CREATE_GROUP]: () => ({ ...state, all: [group, ...state.all] }),
    [SET_CIRCLE_PARTS]: () => ({ ...state, selectedCircleParts }),
    [SELECT_FOR_COMBINATION]: () => {
      const newS =
        state.selectedForCombination.find(i => i.id === group.id)
          ? state.selectedForCombination.filter(i => (i.id !== group.id && i.name))
          : (
            [
              ...state.selectedForCombination,
              {
                selected: true,
                ...group,
                color: state.selectedForCombination.length === 0
                  ? '#d24a43'
                  : (state.selectedForCombination[0].color === '#3eb5f1' ? '#d24a43' : '#3eb5f1')
              }
            ]
          )

      const newGroups = state.selectedForCombination.find(i => i.id === group.id)
        ? state.all.map(i => i.id === group.id ? omit(i, ['selected', 'color']) : i)
        : (
          state.all.map(i =>
            (i.id === group.id
              ? ({
                ...i,
                selected: true,
                color: state.selectedForCombination.length === 0
                  ? '#d24a43'
                  : (state.selectedForCombination[0].color === '#3eb5f1' ? '#d24a43' : '#3eb5f1')
              })
              : i
            ))
        )

      return ({
        ...state,
        selectedForCombination: newS.length === 2 ? [...newS, { userCount: 324, selected: true, color: '#92278f' }] : newS,
        all: newGroups
      })
    },
    [`${CREATE_GROUP_SRPC}Result`]: () => ({ ...state, all: [group, ...state.all.filter(i => i.name)] }),
    [`${CREATE_COMPOSITE_GROUP}Result`]: () => ({
      ...initialState,
      all: [
        group,
        ...state.all.filter(i => i.name).map(i => i.color ? omit(i, ['color', 'selected']) : i)
      ]
    }),
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
