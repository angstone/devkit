import { validate } from '../../..';

const environmentList = <const>['demo', 'production'];

export type IEnvironment = typeof environmentList[number];

export const isIEnvironment = (d: any): d is IEnvironment =>
	validate('environment', { environment: d }, 'required', [
		...environmentList,
	]);
