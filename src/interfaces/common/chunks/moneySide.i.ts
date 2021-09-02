import { validate } from '../../../';

const moneySideList = <const>['buy', 'sell'];

export type IMoneySide = typeof moneySideList[number];

export const isIMoneySide = (d: any): d is IMoneySide =>
	validate('moneySide', { moneySide: d }, 'required', [
		...moneySideList,
	]);
