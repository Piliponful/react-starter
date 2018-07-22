import { all } from 'redux-saga/effects'
import { watchRequestLeaders } from './user'

export default function * rootSaga () {
  yield all([
    watchRequestLeaders()
  ])
}
