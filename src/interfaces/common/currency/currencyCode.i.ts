import { ALL_CURRENCIES_CODES_ARRAY, validate } from '../../..'

const currencyCodeList = ALL_CURRENCIES_CODES_ARRAY()

/**
 * ISO 4217 currency code
 *
 * @TJS-type string
 */
export type ICurrencyCode = typeof currencyCodeList[number]

export const isICurrencyCode = (d: any): d is ICurrencyCode =>
  validate('currencyCode', { currencyCode: d }, 'required', [
    ...currencyCodeList,
  ])
