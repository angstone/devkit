import { COMMON_VALIDATIONS, validate } from '../../..';

/**
 * UNIX TIME in milliseconds.
 *
 * @minimum 0
 * @TJS-type integer
 */
export type IUnixTime = number;

const LIMITS: any = {
	numberId: {
		max: Infinity,
		min: 0,
	},
};

export const isIUnixTime = (d: any): d is IUnixTime =>
	validate(
		'numberId',
		{ numberId: d },
		'required',
		'number',
		LIMITS,
		COMMON_VALIDATIONS.INTEGER,
	);
