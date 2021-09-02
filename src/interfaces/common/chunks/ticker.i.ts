import { COMMON_VALIDATIONS, validate } from '../../..';

/**
 * ticker in upper case characters.
 *
 * @minimum 1
 * @maximum 10
 * @TJS-type string
 */
export type ITicker = string;

const LIMITS: any = {
	ticker: {
		max: 10,
		min: 1,
	},
};

export const isITicker = (d: any): d is ITicker =>
	validate(
		'ticker',
		{ ticker: d },
		'required',
		'string',
		LIMITS,
		COMMON_VALIDATIONS.ALL_UPPERCASE,
	);
