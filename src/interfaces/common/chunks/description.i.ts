import { validate } from '../../..';

/**
 * A long text.
 *
 * @minimum 1
 * @maximum 500
 * @TJS-type string
 */
export type IDescription = string;

const LIMITS: any = {
	description: {
		max: 500,
		min: 1,
	},
};

export const isIDescription = (d: any): d is IDescription =>
	validate('description', { description: d }, 'required', 'string', LIMITS);
