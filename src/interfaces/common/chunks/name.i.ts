import { validate } from '../../..';

/**
 * small text
 *
 * @minimum 1
 * @maximum 40
 * @TJS-type string
 */
export type IName = string;

const LIMITS = {
  name: {
    max: 40,
    min: 1
  }
};

export const isIName = (d: unknown): d is IName =>
  validate('name', { name: d }, 'required', 'string', LIMITS);
