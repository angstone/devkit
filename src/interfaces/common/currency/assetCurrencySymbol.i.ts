import { ALL_ASSET_CURRENCIES_SYMBOLS_ARRAY, validate } from '../../..'

const assetCurrencySymbolList = ALL_ASSET_CURRENCIES_SYMBOLS_ARRAY()

/**
 * asset currency symbol
 *
 * @TJS-type string
 */
export type IAssetCurrencySymbol = typeof assetCurrencySymbolList[number]

export const isIAssetCurrencySymbol = (d: any): d is IAssetCurrencySymbol =>
  validate('assetCurrencySymbol', { assetCurrencySymbol: d }, 'required', [
    ...assetCurrencySymbolList,
  ])
