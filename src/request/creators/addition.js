import { REQUEST_ADD_TWO_NUMBERS } from '../types'

export const addTwoNumbers = (a, b) => ({ type: REQUEST_ADD_TWO_NUMBERS, payload: { a, b } })
