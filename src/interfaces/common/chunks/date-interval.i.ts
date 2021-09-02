import { IIsoTimestamp, isIIsoTimestamp, validate } from '../../../'

export interface IDateInterval {
  dateStart?: IIsoTimestamp
  dateEnd?: IIsoTimestamp
}

export const isIDateInterval = (t: any): t is IDateInterval =>
  validate('dateStart', t, 'optional', 'string', null, isIIsoTimestamp) &&
  validate('dateEnd', t, 'optional', 'string', null, isIIsoTimestamp)
