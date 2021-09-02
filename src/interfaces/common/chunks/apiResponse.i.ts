import { validate } from '../../..';

export interface IApiResponse {
	status: 'success' | 'failure';
	message?: string;
	data?: any;
}

const LIMITS: any = {
	message: {
		max: 5000,
		min: 0,
	},
};

export const isIApiResponse = (t: any): t is IApiResponse =>
	validate('status', t, 'required', ['success', 'failure'], LIMITS) &&
	validate('message', t, 'required', 'string', LIMITS);
