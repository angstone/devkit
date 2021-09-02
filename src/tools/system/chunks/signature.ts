import { env, Log } from '../'

export const signature = () => {
  Log.dash()
  Log.note(`
   SIXWEALTH INTEGRATION COMPONENT PACKAGE
  `)
  Log.dash()
  Log.note(`
   APP_NAME: ${env.APP_NAME}
   APP_DESCRIPTION: ${env.APP_DESCRIPTION}
   APP_VERSION: ${env.APP_VERSION}
   APP_AUTHOR: ${env.APP_AUTHOR}
   APP_LICENSE: ${env.APP_LICENSE}

   APP_ENV: ${env.APP_ENV}
   APP_LOGLEVEL: ${env.APP_LOGLEVEL}

   APP_LOADED_AT: ${env.APP_LOADED_AT}
  `)
}
