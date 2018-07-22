import {takeEvery, call, put} from 'redux-saga/effects'

import {
  REQUEST_LEADERS
} from './action/types/leaders'

import {
  setLeaders
} from '../action/creators/leaders'

function * requestLeaders (action) {
  const res = yield call(window.fetch, `/api/players/`)
  const data = yield call([res, res.json])
  yield put(setLeaders(data))
}

export function * watchRequestLeaders (socket) {
  yield takeEvery(REQUEST_LEADERS, requestLeaders)
}
