import { IDescription, isIDescription, validate } from '../../..';

export interface IQueryMax {
	q?: IDescription;
	max?: number;
}

const LIMITS: any = {
	max: {
		max: 300,
		min: 1,
	},
};

export const isIQueryMax = (t: any): t is IQueryMax =>
	validate('q', t, 'optional', 'string', LIMITS, isIDescription) &&
	validate('max', t, 'optional', 'number', LIMITS);
