import {
	ICurrencyCode,
	ICurrencySymbol,
	isICurrencyCode,
	isICurrencySymbol,
	validate,
} from '../../..';

export interface ICurrency {
	code: ICurrencyCode;
	symbol?: ICurrencySymbol;
}

export const isICurrency = (t: any): t is ICurrency =>
	validate('code', t, 'required', 'string', isICurrencyCode) &&
	validate('symbol', t, 'optional', 'string', isICurrencySymbol);
