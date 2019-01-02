import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import { REQUEST_ADD_TWO_NUMBERS } from '../types'
import { setAdditionResult } from '../../actions/addition'

export function * addTwoNumbers ({ payload: { a, b } }) {
  yield delay(1000)
  const result = a + b
  yield put(setAdditionResult(result))
}

export function * addTwoNumbersWatcher () {
  yield takeEvery(REQUEST_ADD_TWO_NUMBERS, addTwoNumbers)
}
