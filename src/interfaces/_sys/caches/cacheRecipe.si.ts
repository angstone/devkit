import {
  isSICacheOptions,
  SICacheOptions,
  SICacheRead,
  validate,
} from '../../../'

export interface SICacheRecipe<T> {
  cacheOptions?: SICacheOptions
  fetcher: () => Promise<T>
  storeHard?: (read: SICacheRead<T>) => Promise<void>
  storeSoftWide?: (read: SICacheRead<T>) => Promise<void>
  storeSoftLocal?: (read: SICacheRead<T>) => void
  readHard?: () => Promise<SICacheRead<T> | undefined>
  readSoftWide?: () => Promise<SICacheRead<T> | undefined>
  readSoftLocal?: () => Promise<SICacheRead<T> | undefined>
}

export const isSICacheRecipe = <T>(t: any): t is SICacheRecipe<T> =>
  validate('cacheOptions', t, 'optional', 'object', null, isSICacheOptions) &&
  validate('fetcher', t, 'required', 'function') &&
  validate('storeHard', t, 'optional', 'function') &&
  validate('storeSoftLocal', t, 'optional', 'function') &&
  validate('storeSoftWide', t, 'optional', 'function') &&
  validate('readHard', t, 'optional', 'function') &&
  validate('readSoftLocal', t, 'optional', 'function') &&
  validate('readSoftWide', t, 'optional', 'function')
