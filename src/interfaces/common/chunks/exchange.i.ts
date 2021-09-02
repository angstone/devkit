import { SUPPORTED_EXCHANGES_ARRAY, validate } from '../../..'

const exchangeList = SUPPORTED_EXCHANGES_ARRAY()

/**
 * @TJS-type string
 */
export type IExchange = typeof exchangeList[number]

export const isIExchange = (d: any): d is IExchange =>
  validate('exchange', { exchange: d }, 'required', [...exchangeList])
