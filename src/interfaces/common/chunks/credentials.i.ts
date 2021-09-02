import { COMMON_VALIDATIONS, IName, isIName, validate } from '../../..';

const LIMITS = {
	username: {
		min: 4,
		max: 40,
	},
	password: {
		min: 7,
		max: 14,
	},
};

/**
 * the username for login
 *
 * @minimum 4
 * @maximum 40
 * @TJS-type string
 */
export type IUsername = IName;

export const isIUsername = (t: any): t is IUsername =>
	validate(
		'username',
		{ username: t },
		'required',
		'string',
		LIMITS,
		(d: any) => {
			if (!isIName(d)) {
				return false;
			}
			const error: string | undefined = COMMON_VALIDATIONS.NO_SPACE(d);
			if (error !== undefined) {
				throw error;
			}
			return true;
		},
	);

/**
 * the user password
 *
 * @minimum 8
 * @maximum 14
 * @format password
 * @TJS-type string
 */
export type IPassword = IName;

export const isIPassword = (t: any): t is IPassword => {
	validate(
		'password',
		{ password: t },
		'required',
		'string',
		LIMITS,
		(d: any) => {
			if (!isIName(d)) {
				return false;
			}
			const error: string | undefined = COMMON_VALIDATIONS.NO_SPACE(d);
			if (error !== undefined) {
				throw error;
			}
			return true;
		},
	);
	return true;
};

export interface ICredentials {
	username: IUsername;
	password: IPassword;
}

export const isICredentials = (t: any): t is ICredentials =>
	validate('username', t, 'required', 'string', {}, isIUsername) &&
	validate('password', t, 'required', 'string', {}, isIPassword);
