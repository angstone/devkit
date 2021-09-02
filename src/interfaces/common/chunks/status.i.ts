import { validate } from '../../..'

/**
 * A string reference.
 *
 * @TJS-type string
 */
export type IStatus = 'active' | 'inactive'

export const isIStatus = (d: any): d is IStatus =>
  validate('status', { status: d }, 'required', ['active', 'inactive'])
