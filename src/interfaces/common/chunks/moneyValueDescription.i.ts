import {
	IDescription,
	IMoneyValue,
	isIDescription,
	isIMoneyValue,
	validate,
} from '../../..';

export interface IMoneyValueDescription {
	description?: IDescription;
	value: IMoneyValue;
}

export const isIMoneyValueDescription = (t: any): t is IMoneyValueDescription =>
	validate('description', t, 'optional', 'string', {}, isIDescription) &&
	validate('value', t, 'required', 'number', {}, isIMoneyValue);
