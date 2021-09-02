import { IExchange, isIExchange, isITicker, ITicker, validate } from '../../../'

export interface ITickerExchange {
  ticker: ITicker
  exchange: IExchange
}

export const isITickerExchange = (t: any): t is ITickerExchange =>
  validate('ticker', t, 'required', 'string', null, isITicker) &&
  validate('exchange', t, 'required', 'string', null, isIExchange)
