import { validate } from '../../..';

/**
 * email address
 *
 * @minimum 1
 * @maximum 100
 * @TJS-type string
 * @format email
 */
export type IEmail = string;

const LIMITS: any = {
	email: {
		max: 100,
		min: 1,
	},
};

export const isIEmail = (d: any): d is IEmail =>
	validate(
		'email',
		{ email: d },
		'required',
		'string',
		LIMITS,
		(emailRaw: any): string | boolean => {
			const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (re.test(String(emailRaw).toLowerCase())) {
				return true;
			} else {
				return 'the email is not valid';
			}
		},
	);
