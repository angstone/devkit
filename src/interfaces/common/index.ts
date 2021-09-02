export * from './chunks/apiResponse.i';
export * from './chunks/assetPrice.i';
export * from './chunks/big-text.i';
export * from './chunks/billingAddress.i';
export * from './chunks/credentials.i';
export * from './chunks/date-interval.i';
export * from './chunks/description.i';
export * from './chunks/deviceToken.i';
export * from './chunks/email.i';
export * from './chunks/environment.i';
export * from './chunks/exchange.i';
export * from './chunks/file.i';
export * from './chunks/fileExtension.i';
export * from './chunks/financialBalanceBroker.i';
export * from './chunks/hashMap.i';
export * from './chunks/hourString.i';
export * from './chunks/httpCall.i';
export * from './chunks/httpPlace.i';
export * from './chunks/httpVerb.i';
export * from './chunks/isoTimestamp.i';
export * from './chunks/log.i';
export * from './chunks/micro-text.i';
export * from './chunks/mimeType.i';
export * from './chunks/moneyDirection.i';
export * from './chunks/moneySide.i';
export * from './chunks/moneyValue.i';
export * from './chunks/moneyValueDescription.i';
export * from './chunks/name.i';
export * from './chunks/naturalPositiveNonZero.i';
export * from './chunks/numberId.i';
export * from './chunks/openingHours.i';
export * from './chunks/phone.i';
export * from './chunks/queryMax.i';
export * from './chunks/sanitized-markdown.i';
export * from './chunks/small-text.i';
export * from './chunks/status.i';
export * from './chunks/stringReference.i';
export * from './chunks/svg-text-code.i';
export * from './chunks/text.i';
export * from './chunks/ticker-exchange.i';
export * from './chunks/ticker.i';
export * from './chunks/timestamped.i';
export * from './chunks/timestampedLink.i';
export * from './chunks/timezone.i';
export * from './chunks/tradableTicker.i';
export * from './chunks/unixTime.i';
export * from './chunks/url.i';
export * from './country/country.i';
export * from './country/countryName.i';
export * from './country/countryThreeCode.i';
export * from './country/countryTwoCode.i';
export * from './currency/assetCurrencySymbol.i';
export * from './currency/currency.i';
export * from './currency/currencyCode.i';
export * from './currency/currencySymbol.i';

export type Types =
  | 'IApiResponse'
  | 'IAssetPrice'
  | 'IBillingAddress'
  | 'ICredentials'
  | 'IUsername'
  | 'IPassword'
  | 'IDateInterval'
  | 'IDescription'
  | 'IDeviceToken'
  | 'IDevice'
  | 'IToken'
  | 'IEmail'
  | 'IEnvironment'
  | 'IExchange'
  | 'IFile'
  | 'IFileExtension'
  | 'IFinancialBalanceBroker'
  | 'IHashMap'
  | 'IHourString'
  | 'IHttpCall'
  | 'IHttpVerb'
  | 'IHttpPlace'
  | 'IIsoTimestamp'
  | 'ILogAggregate'
  | 'ILogType'
  | 'ILog'
  | 'IMimeType'
  | 'IMoneyDirection'
  | 'IMoneySide'
  | 'IMoneyValue'
  | 'IMoneyDescription'
  | 'IName'
  | 'INaturalPositiveNonZero'
  | 'INumberId'
  | 'IOpeningHours'
  | 'IPhone'
  // | 'ICountryCode'
  | 'ICountryDialCode'
  | 'IPhoneNumber'
  | 'IQueryMax'
  | 'IStringReference'
  | 'ITickerExchange'
  | 'ITicker'
  | 'ITimestamped'
  | 'ITimestampedLink'
  | 'ITimezone'
  | 'ITradableTicker'
  | 'IUnixTime'
  | 'IUrl'
  | 'ICountry'
  | 'ICountryName'
  | 'ICountryThreeCode'
  | 'ICountryTwoCode'
  | 'IAssetCurrencySymbol'
  | 'ICurrency'
  | 'ICurrencyCode'
  | 'ICurrencySymbol';
