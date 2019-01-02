import { all } from 'redux-saga/effects'
import { addTwoNumbersWatcher } from './addition'

export default function * rootSaga () {
  yield all([
    addTwoNumbersWatcher()
  ])
}
