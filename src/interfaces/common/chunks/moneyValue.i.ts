import { COMMON_VALIDATIONS, validate } from '../../..';

/**
 * money value two decimals float
 * @example 136.15
 * @format float-two-decimals
 * @TJS-type float
 */
export type IMoneyValue = number;

const LIMITS: any = {
	moneyValue: {
		max: Infinity,
		min: -Infinity,
	},
};

export const isIMoneyValue = (d: any): d is IMoneyValue =>
	validate(
		'moneyValue',
		{ moneyValue: d },
		'required',
		'number',
		LIMITS,
		COMMON_VALIDATIONS.FLOAT_DECIMALS(18),
	);
