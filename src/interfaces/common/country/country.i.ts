import {
	ICountryName,
	ICountryThreeCode,
	ICountryTwoCode,
	ICurrency,
	isICountryName,
	isICountryThreeCode,
	isICountryTwoCode,
	isICurrency,
	validate,
} from '../../..';

export interface ICountry {
	name: ICountryName;
	twoCode: ICountryTwoCode;
	threeCode: ICountryThreeCode;
	// states?: ICountryState[];
	currency: ICurrency;
	// dialCodes?: IDialCode[];
}

export const isICountry = (t: any): t is ICountry =>
	validate('name', t, 'required', 'string', null, isICountryName) &&
	validate('twoCode', t, 'required', 'string', null, isICountryTwoCode) &&
	validate('threeCode', t, 'required', 'string', null, isICountryThreeCode) &&
	validate('currency', t, 'required', 'object', null, isICurrency);
