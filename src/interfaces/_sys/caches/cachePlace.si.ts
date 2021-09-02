import { validate } from '../../../'

const cachePlaceList = ['none', 'hard', 'softLocal', 'softWide'] as const

export type SICachePlace = typeof cachePlaceList[number]

export const isSICachePlace = (t: any): t is SICachePlace =>
  validate('cachePlace', { cachePlace: t }, 'required', [...cachePlaceList])
