import {
	ICountryName,
	IDescription,
	IName,
	isICountryName,
	isIDescription,
	isIName,
	// isIStringReference,
	// SUPPORTED_COUNTRY_NAMES,
	// SUPPORTED_COUNTRY_POSTAL_CODE_VALIDATORS,
	validate,
} from '../../../';

export interface IBillingAddress {
	city: IName;
	country: ICountryName;
	countryName: ICountryName;
	firstLine: IDescription;
	secondLine?: IDescription;
	postalCode: string;
	state: IName;
}

export const isIBillingAddress = (t: any): t is IBillingAddress =>
	validate('city', t, 'required', 'string', null, isIName) &&
	validate('country', t, 'required', 'string', null, isICountryName) &&
	validate('firstLine', t, 'required', 'string', null, isIDescription) &&
	validate('secondLine', t, 'optional', 'string', null, isIDescription) &&
	validate(
		'postalCode',
		t,
		'required',
		'string',
		null /*, (dt: any) => {
		const countryName: ICountryName = t.country as ICountryName;
		let country: string | undefined;
		for (const c in SUPPORTED_COUNTRY_NAMES) {
			if (SUPPORTED_COUNTRY_NAMES[c] === countryName) {
				country = c;
			}
		}
		if (country === undefined) {
			return false;
		}
		const regExString = SUPPORTED_COUNTRY_POSTAL_CODE_VALIDATORS[country];
		if (regExString !== undefined) {
			const regEx = new RegExp(regExString);
			return regEx.test(dt);
		} else {
			return false;
		}
	}*/,
		isIName,
	) &&
	validate('state', t, 'required', 'string', null, isIName);
