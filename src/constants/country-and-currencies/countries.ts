import {
  ICountry,
  ICountryName,
  ICountryThreeCode,
  ICountryTwoCode,
  IHashMap,
} from '../../'

import { SUPPORTED_COUNTRIES_CODES_ALPHA_TWO_ARRAY } from './countries-source'
import { ALL_CURRENCIES } from './currencies'

// tslint:disable:no-var-requires
const countriesIso = require('iso-3166-1-codes')
const currencies = require('country-currency')

// tslint:disable:interface-name
interface CountryInfoFromIso {
  numeric: string
  alpha2: string
  alpha3: string
  name: string
}

const allCountriesMappedByAlphaTwo: Map<
  string,
  CountryInfoFromIso
> = countriesIso.byAlpha2()

const allCurrenciesMappedByCountryTwoCode: Map<
  string,
  string
> = currencies.byCountry()

const all_countries_array: ICountry[] = []
const all_countries: IHashMap<ICountry> = {}

allCountriesMappedByAlphaTwo.forEach(countryData => {
  if (
    countryData.name === 'United Kingdom of Great Britain and Northern Ireland'
  ) {
    countryData.name = 'United Kingdom'
  }
  const currencyCode = allCurrenciesMappedByCountryTwoCode.get(
    countryData.alpha2
  )!
  const country: ICountry = {
    name: countryData.name as ICountryName,
    twoCode: countryData.alpha2 as ICountryTwoCode,
    threeCode: countryData.alpha3 as ICountryThreeCode,
    currency: ALL_CURRENCIES()[currencyCode],
  }
  all_countries[country.twoCode] = country
  all_countries_array.push(country)
})

const supported_countries_array: ICountry[] = SUPPORTED_COUNTRIES_CODES_ALPHA_TWO_ARRAY().map(
  (countryCode: string) => all_countries[countryCode]
)
const supported_countries: IHashMap<ICountry> = {}
supported_countries_array.forEach(country => {
  supported_countries[country.twoCode] = country
})

const DEFAULT_COUNTRY = () => {
  return {
    ...supported_countries.GB,
    ...{
      currency: {
        ...supported_countries.GB.currency,
      },
    },
  }
}

const ALL_COUNTRIES = (): IHashMap<ICountry> => {
  return JSON.parse(JSON.stringify(all_countries)) as IHashMap<ICountry>
}

const ALL_COUNTRIES_ARRAY = (): ICountry[] => {
  return JSON.parse(JSON.stringify(all_countries_array)) as ICountry[]
}

const SUPPORTED_COUNTRIES = (): IHashMap<ICountry> => {
  return JSON.parse(JSON.stringify(supported_countries)) as IHashMap<ICountry>
}

const SUPPORTED_COUNTRIES_ARRAY = (): ICountry[] => {
  return JSON.parse(JSON.stringify(supported_countries_array)) as ICountry[]
}

export {
  ALL_COUNTRIES,
  ALL_COUNTRIES_ARRAY,
  DEFAULT_COUNTRY,
  SUPPORTED_COUNTRIES,
  SUPPORTED_COUNTRIES_ARRAY,
}
