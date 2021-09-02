import { SUPPORTED_COUNTRIES_CODES_ALPHA_THREE_ARRAY, validate } from '../../..'

const countryThreeCodeList = SUPPORTED_COUNTRIES_CODES_ALPHA_THREE_ARRAY()

/**
 * iso-3166-1 alpha2 country code
 *
 * @TJS-type string
 */
export type ICountryThreeCode = typeof countryThreeCodeList[number]

export const isICountryThreeCode = (d: any): d is ICountryThreeCode =>
  validate('countryThreeCode', { countryThreeCode: d }, 'required', [
    ...countryThreeCodeList,
  ])
