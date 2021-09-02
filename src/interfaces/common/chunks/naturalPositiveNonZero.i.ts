import { COMMON_VALIDATIONS, validate } from '../../..';

/**
 * Natural positive non-zero value.
 *
 * @minimum 1
 * @maximum Infinity
 * @TJS-type integer
 */
export type INaturalPositiveNonZero = number;

const LIMITS: any = {
	naturalPositiveNonZero: {
		max: Infinity,
		min: 1,
	},
};

export const isINaturalPositiveNonZero = (
	d: any,
): d is INaturalPositiveNonZero =>
	validate(
		'naturalPositiveNonZero',
		{ naturalPositiveNonZero: d },
		'required',
		'number',
		LIMITS,
		COMMON_VALIDATIONS.INTEGER,
	);
