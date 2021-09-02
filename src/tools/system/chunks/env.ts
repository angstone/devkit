import * as path from 'path'
import * as dotenv from 'dotenv'

try {
  dotenv.config()
} catch (err) {} // do nothing

import { ENVS, LOGLEVELS } from '../../../'
const CONFIG_KEYWORD = 'npm_package_config_'

/* tslint:disable:no-var-requires */
let app: any
try {
  app = require(process.env.PWD + path.sep + 'package.json') || {}
} catch (err) {
  /* tslint:disable:no-console */
  console.log(
    'ENV: package.json not found, safely ignoring package util info..'
  )
  app = {}
}

process.env.APP_NAME = '' + (app.name || 'Unamed App')
process.env.APP_AUTHOR = '' + (app.author || 'Unknown Author')
process.env.APP_DESCRIPTION =
  '' + (app.description || 'no description provided')
process.env.APP_LICENSE = '' + (app.license || 'no license info provided')
process.env.APP_VERSION = '' + app.version
process.env.APP_LOADED_AT = '' + Date.now()

// Defaults env to prod for security reasons
if (process.env.APP_ENV === undefined) {
  process.env.APP_ENV = ENVS.PROD
}

// Defaults loglevel to error
if (process.env.APP_LOGLEVEL === undefined) {
  process.env.APP_LOGLEVEL = LOGLEVELS.NOTE
}

const env = process.env

const envOrConfig = (key: string): string | undefined => {
  // console.log('asking for key: ')
  // console.log(key)
  const onEnv = env[key]
  // console.log(env)
  // console.log(env['APP_ENV'])

  if (onEnv === undefined || onEnv === '') {
    const onConfig = env[CONFIG_KEYWORD + key]
    if (onConfig === '') {
      // console.log('ON CONFIG UNDEFINED:')
      return undefined
    }
    // console.log('FOUND ON CONFIG:')
    // console.log(onConfig)
    return onConfig
  } else {
    return onEnv
  }
}

export { env, envOrConfig }
