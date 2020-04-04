import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'
import { REQUEST_ADD_TWO_NUMBERS } from '../types'
import { addTwoNumbers as createAddTwoNumbersAction } from '../creators/addition'

export function * addTwoNumbers ({ payload: { a, b } }) {
  yield delay(1000)
  const result = a + b
  yield put(createAddTwoNumbersAction(result))
}

export function * addTwoNumbersWatcher () {
  yield takeEvery(REQUEST_ADD_TWO_NUMBERS, addTwoNumbers)
}
