import { isITickerExchange, ITickerExchange, validate } from '../../..'
import { IMoneyValue, isIMoneyValue } from './moneyValue.i'
import { isIStringReference, IStringReference } from './stringReference.i'

/**
 * money value two decimals float
 * @example 136.15
 * @format float-two-decimals
 * @TJS-type float
 */
export interface IAssetPrice {
  tickerExchange: ITickerExchange
  bid?: IMoneyValue
  offer?: IMoneyValue
  price?: IMoneyValue
  fromExternalPriceProvider?: IStringReference
}

export const isIAssetPrice = (d: any): d is IAssetPrice =>
  validate('tickerExchange', d, 'required', 'object', {}, isITickerExchange) &&
  validate('bid', d, 'optional', 'number', {}, isIMoneyValue) &&
  validate('offer', d, 'optional', 'number', {}, isIMoneyValue) &&
  validate('price', d, 'optional', 'number', {}, isIMoneyValue) &&
  validate(
    'fromExternalPriceProvider',
    d,
    'optional',
    'string',
    {},
    isIStringReference
  )
