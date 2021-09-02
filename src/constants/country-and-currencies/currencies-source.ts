// tslint:disable:no-var-requires
const currencies = require('country-currency')
const getSymbolFromCurrency = require('currency-symbol-map')

const allCurrenciesMappedByCountryTwoCode: Map<
  string,
  string
> = currencies.byCountry()

const allCurrenciesCodesArray: string[] = []
const allCurrenciesSymbolsArray: string[] = []

allCurrenciesMappedByCountryTwoCode.forEach(currencyCode => {
  allCurrenciesCodesArray.push(currencyCode)
  allCurrenciesSymbolsArray.push(getSymbolFromCurrency(currencyCode))
})

export const NON_COUNTRY_CURRENCIES_AND_SYMBOLS: () => any = () => {
  return {
    BTC: '₿',
    ETH: 'Ξ',
  }
}

const non_country_currency_codes: string[] = []
const non_country_currency_symbols: string[] = []

for (const nonCountryCurrencyCode in NON_COUNTRY_CURRENCIES_AND_SYMBOLS()) {
  if (
    Object.hasOwnProperty.call(
      NON_COUNTRY_CURRENCIES_AND_SYMBOLS(),
      nonCountryCurrencyCode
    )
  ) {
    non_country_currency_codes.push(nonCountryCurrencyCode)
    non_country_currency_symbols.push(
      NON_COUNTRY_CURRENCIES_AND_SYMBOLS()[nonCountryCurrencyCode]
    )
  }
}

export const ALL_CURRENCIES_CODES_ARRAY = () => {
  return [...allCurrenciesCodesArray, ...non_country_currency_codes] as const
}

export const ALL_CURRENCIES_SYMBOLS_ARRAY = () => {
  return [
    ...allCurrenciesSymbolsArray,
    ...non_country_currency_symbols,
  ] as const
}

export const SUPPORTED_CURRENCIES_CODES_ARRAY = () => {
  return [
    'AUD',
    'BTC',
    'CHF',
    'CNY',
    'ETH',
    'EUR',
    'GBP',
    'HKD',
    'USD',
  ] as const
}

export const SUPPORTED_CURRENCIES_SYMBOLS_ARRAY = () => {
  return ['$', '₿', 'CHF', '¥', 'Ξ', '€', '£', '$', '$'] as const
}

export const NON_COUNTRY_CURRENCY_CODES: () => string[] = () => {
  return JSON.parse(JSON.stringify(non_country_currency_codes)) as string[]
}
export const NON_COUNTRY_CURRENCY_SYMBOLS: () => string[] = () => {
  return JSON.parse(JSON.stringify(non_country_currency_symbols)) as string[]
}
