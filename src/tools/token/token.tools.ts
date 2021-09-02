import * as crypto from 'crypto'

export const createToken = (length?: number): string => {
  let useLength = 22
  if (length) {
    useLength = length
  }

  const token = crypto
    .randomBytes(64)
    .toString('hex')
    .slice(0, useLength)

  // keyvault can't handle any underscores, so we replace these
  const rtoken = token.replace('_', '-')

  return rtoken
}

export const tokenTools = {
  createToken,
}
