import { ALL_CURRENCIES_SYMBOLS_ARRAY, validate } from '../../..'

const currencySymbolList = ALL_CURRENCIES_SYMBOLS_ARRAY()

/**
 * currency common symbol
 *
 * @TJS-type string
 */
export type ICurrencySymbol = typeof currencySymbolList[number]

export const isICurrencySymbol = (d: any): d is ICurrencySymbol =>
  validate('currencySymbol', { currencySymbol: d }, 'required', [
    ...currencySymbolList,
  ])
