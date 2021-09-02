import { validate } from '../../../';

const moneyDirectionList = <const>['long', 'short'];

export type IMoneyDirection = typeof moneyDirectionList[number];

export const isIMoneyDirection = (d: any): d is IMoneyDirection =>
	validate('moneyDirection', { moneyDirection: d }, 'required', [
		...moneyDirectionList,
	]);
