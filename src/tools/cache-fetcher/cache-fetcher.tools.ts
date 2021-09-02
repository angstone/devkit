import { rest, SICacheOptions, SICacheRead, SICacheRecipe } from '../../'

const DEFAULT_OPTIONS: SICacheOptions = {
  fromCache: 'hard',
  toCache: 'hard',
  expiration: Infinity,
  autoRefresh: false,
}

const DEFAULT_RECIPE: SICacheRecipe<any> = {
  cacheOptions: DEFAULT_OPTIONS,
  fetcher: async () => {
    throw new Error('Cache Fetcher Not Implemented!')
  },
  storeHard: async () => {
    throw new Error('Cache Hard Cache Not Implemented!')
  },
  storeSoftLocal: async () => {
    throw new Error('Cache Soft Local Not Implemented!')
  },
  storeSoftWide: async () => {
    throw new Error('Cache Soft Wide Not Implemented!')
  },
  readHard: async () => {
    throw new Error('Cache Hard Cache Not Implemented!')
  },
  readSoftLocal: async () => {
    throw new Error('Cache Soft Local Not Implemented!')
  },
  readSoftWide: async () => {
    throw new Error('Cache Soft Wide Not Implemented!')
  },
}

class CacheFetcher<T> {
  private defaultRecipe: SICacheRecipe<T>
  private storingHard: boolean = false
  private storingSoftWide: boolean = false
  private storingSoftLocal: boolean = false

  constructor(
    defaultOptions: SICacheOptions = DEFAULT_OPTIONS,
    defaultRecipe: SICacheRecipe<T> = DEFAULT_RECIPE
  ) {
    // console.log('options received on constructor')
    // console.log(defaultOptions)
    const def = { ...DEFAULT_OPTIONS, ...defaultOptions }
    // console.log(def)
    const rec = { ...DEFAULT_RECIPE, ...defaultRecipe }
    // console.log(rec)
    rec.cacheOptions = def
    this.defaultRecipe = rec
    // console.log('construction results:');
    // console.log(this);
  }

  public async get(recipe?: SICacheRecipe<T>): Promise<T> {
    let usedRecipe = this.defaultRecipe
    if (recipe !== undefined) {
      usedRecipe = { ...usedRecipe, ...recipe }
    }
    usedRecipe.cacheOptions = {
      ...this.defaultRecipe.cacheOptions,
      ...usedRecipe.cacheOptions,
    }
    // console.log('recipe');
    // console.log(recipe);
    // console.log('usedRecipe');
    // console.log(usedRecipe);
    // here we do implement default localCache simpler function
    // console.log('now trying data:');
    const dataRead = await this.getData(usedRecipe)
    // console.log('data');
    // console.log(dataRead);
    await this.storeData(usedRecipe, dataRead)
    return dataRead.data
  }

  private async getData(recipe: SICacheRecipe<T>): Promise<SICacheRead<T>> {
    const options = recipe.cacheOptions!
    switch (options.fromCache) {
      case 'hard':
        if (options.expiration === 0) {
          return {
            data: await recipe.fetcher(),
            updatedAt: Date.now(),
            origin: 'none',
          }
        } else if (options.expiration === Infinity) {
          const dataRead = await recipe.readHard!()
          if (dataRead === undefined) {
            return {
              data: await recipe.fetcher(),
              updatedAt: Date.now(),
              origin: 'none',
            }
          } else {
            dataRead.origin = 'hard'
            return dataRead
          }
        } else {
          let dataRead = await recipe.readHard!()
          if (dataRead === undefined) {
            dataRead = {
              data: await recipe.fetcher(),
              updatedAt: Date.now(),
              origin: 'none',
            }
            return dataRead
          } else {
            dataRead.origin = 'hard'
          }

          if (Date.now() - dataRead.updatedAt > options.expiration!) {
            return {
              data: await recipe.fetcher(),
              updatedAt: Date.now(),
              origin: 'none',
            }
          } else {
            return dataRead
          }
        }
      case 'softWide':
        if (options.expiration === 0) {
          return {
            data: await recipe.fetcher(),
            updatedAt: Date.now(),
            origin: 'none',
          }
        } else if (options.expiration === Infinity) {
          const dataRead = await recipe.readSoftWide!()
          if (dataRead === undefined) {
            return {
              data: await recipe.fetcher(),
              updatedAt: Date.now(),
              origin: 'none',
            }
          } else {
            dataRead.origin = 'softWide'
            return dataRead
          }
        } else {
          let dataRead = await recipe.readSoftWide!()
          if (dataRead === undefined) {
            dataRead = {
              data: await recipe.fetcher(),
              updatedAt: Date.now(),
              origin: 'none',
            }
            return dataRead
          } else {
            dataRead.origin = 'softWide'
          }

          if (Date.now() - dataRead.updatedAt > options.expiration!) {
            return {
              data: await recipe.fetcher(),
              updatedAt: Date.now(),
              origin: 'none',
            }
          } else {
            return dataRead
          }
        }
      case 'softLocal':
        if (options.expiration === 0) {
          return {
            data: await recipe.fetcher(),
            updatedAt: Date.now(),
            origin: 'none',
          }
        } else if (options.expiration === Infinity) {
          const dataRead = await recipe.readSoftLocal!()
          if (dataRead === undefined) {
            return {
              data: await recipe.fetcher(),
              updatedAt: Date.now(),
              origin: 'none',
            }
          } else {
            dataRead.origin = 'softLocal'
            return dataRead
          }
        } else {
          let dataRead = await recipe.readSoftLocal!()
          if (dataRead === undefined) {
            dataRead = {
              data: await recipe.fetcher(),
              updatedAt: Date.now(),
              origin: 'none',
            }
            return dataRead
          } else {
            dataRead.origin = 'softLocal'
          }

          if (Date.now() - dataRead.updatedAt > options.expiration!) {
            return {
              data: await recipe.fetcher(),
              updatedAt: Date.now(),
              origin: 'none',
            }
          } else {
            return dataRead
          }
        }
      default:
        return {
          data: await recipe.fetcher(),
          updatedAt: Date.now(),
          origin: 'none',
        }
    }
  }

  private async storeData(
    recipe: SICacheRecipe<T>,
    dataRead: SICacheRead<T>
  ): Promise<void> {
    const options = recipe.cacheOptions!
    switch (options.toCache) {
      case 'hard':
        if (dataRead.origin !== 'hard') {
          await rest(async () => {
            return !this.storingHard
          }, 50)
          await recipe.storeHard!(dataRead).catch(err => {
            this.storingHard = false
            throw err
          })
          this.storingHard = false
          break
        } else {
          break
        }
      case 'softWide':
        if (dataRead.origin !== 'softWide') {
          await rest(async () => {
            return !this.storingSoftWide
          }, 50)
          await recipe.storeSoftWide!(dataRead).catch(err => {
            this.storingSoftWide = false
            throw err
          })
          this.storingSoftWide = false
          break
        } else {
          break
        }
      case 'softLocal':
        if (dataRead.origin !== 'softLocal') {
          await rest(async () => {
            return !this.storingSoftLocal
          }, 50)
          try {
            recipe.storeSoftLocal!(dataRead)
          } catch (err) {
            this.storingSoftLocal = false
            throw err
          }
          this.storingSoftLocal = false
          break
        } else {
          break
        }
    } // end of switch
  } // end of funcion storeData
} // END OF CLASS

const getFetcher = <T>(defaultOptions?: SICacheOptions): CacheFetcher<T> => {
  return new CacheFetcher<T>(defaultOptions)
}

export const cacheFetcher = {
  getFetcher,
}
