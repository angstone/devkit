import { validate } from '../../..';

/**
 * An string reference.
 *
 * @minimum 4
 * @maximum 1000
 * @format url
 * @TJS-type string
 */
export type IUrl = string;

const LIMITS: any = {
	url: {
		max: 1000,
		min: 4,
	},
};

export const isIUrl = (d: any): d is IUrl =>
	validate('url', { url: d }, 'required', 'string', LIMITS);
