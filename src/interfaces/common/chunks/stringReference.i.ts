import { validate } from '../../..';

/**
 * A string reference.
 *
 * @minimum 1
 * @maximum 100
 * @TJS-type string
 */
export type IStringReference = string;

const LIMITS: any = {
	stringReference: {
		max: 100,
		min: 1,
	},
};

export const isIStringReference = (d: any): d is IStringReference =>
	validate(
		'stringReference',
		{ stringReference: d },
		'required',
		'string',
		LIMITS,
	);
