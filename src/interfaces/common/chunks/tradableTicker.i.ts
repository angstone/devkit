import { validate } from '../../..';

/**
 * tradable ticker.
 *
 * @minimum 1
 * @maximum 100
 * @TJS-type string
 */
export type ITradableTicker = string;

const LIMITS: any = {
	tradableTicker: {
		max: 100,
		min: 1,
	},
};

export const isITradableTicker = (d: any): d is ITradableTicker =>
	validate(
		'tradableTicker',
		{ tradableTicker: d },
		'required',
		'string',
		LIMITS,
	);
