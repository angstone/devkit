/* eslint-disable @typescript-eslint/no-var-requires */
import { ICurrency, ICurrencyCode, ICurrencySymbol, IHashMap } from '../../';

import {
  NON_COUNTRY_CURRENCY_CODES,
  NON_COUNTRY_CURRENCY_SYMBOLS,
  SUPPORTED_CURRENCIES_CODES_ARRAY
} from './currencies-source';

// tslint:disable:no-var-requires
const currencies = require('country-currency');
const getSymbolFromCurrency = require('currency-symbol-map');

const allCurrenciesMappedByCountryTwoCode: Map<string, string> =
  currencies.byCountry();

const all_currencies_array: ICurrency[] = [];
const all_currencies: IHashMap<ICurrency> = {};

allCurrenciesMappedByCountryTwoCode.forEach((currencyCode) => {
  const currency: ICurrency = {
    code: currencyCode as ICurrencyCode,
    symbol: getSymbolFromCurrency(currencyCode) as ICurrencySymbol
  };
  all_currencies_array.push(currency);
  all_currencies[currencyCode] = currency;
});

NON_COUNTRY_CURRENCY_CODES().forEach((currencyCode, index) => {
  const currency: ICurrency = {
    code: currencyCode as ICurrencyCode,
    symbol: NON_COUNTRY_CURRENCY_SYMBOLS()[index]
  };
  all_currencies_array.push(currency);
  all_currencies[currencyCode] = currency;
});

const supported_currencies_array: ICurrency[] =
  SUPPORTED_CURRENCIES_CODES_ARRAY().map((currencyCode: string) => {
    return all_currencies[currencyCode];
  });
const supported_currencies: IHashMap<ICurrency> = {};
supported_currencies_array.forEach((currency) => {
  supported_currencies[currency.code] = currency;
});

const ALL_CURRENCIES = (): IHashMap<ICurrency> => {
  return JSON.parse(JSON.stringify(all_currencies)) as IHashMap<ICurrency>;
};

const ALL_CURRENCIES_ARRAY = (): ICurrency[] => {
  return JSON.parse(JSON.stringify(all_currencies_array)) as ICurrency[];
};

const SUPPORTED_CURRENCIES = (): IHashMap<ICurrency> => {
  return JSON.parse(
    JSON.stringify(supported_currencies)
  ) as IHashMap<ICurrency>;
};

const SUPPORTED_CURRENCIES_ARRAY = (): ICurrency[] => {
  return JSON.parse(JSON.stringify(supported_currencies_array)) as ICurrency[];
};

export {
  ALL_CURRENCIES,
  ALL_CURRENCIES_ARRAY,
  SUPPORTED_CURRENCIES,
  SUPPORTED_CURRENCIES_ARRAY
};
