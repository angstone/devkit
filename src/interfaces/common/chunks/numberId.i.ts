import { validate } from '../../..';

/**
 * An integer id.
 *
 * @minimum 1
 * @TJS-type integer
 */
export type INumberId = number;

const LIMITS: any = {
	numberId: {
		max: Infinity,
		min: 1,
	},
};

export const isINumberId = (d: any): d is INumberId =>
	validate('numberId', { numberId: d }, 'required', 'number', LIMITS);
