import {
	IIsoTimestamp,
	isIDescription,
	isIIsoTimestamp,
	validate,
} from '../../..';

const logAggregateList = <const>['User', 'Account', 'Fund'];

/**
 * the log aggregate
 *
 * @TJS-type string
 */
export type ILogAggregate = typeof logAggregateList[number];

export const isILogAggregate = (d: any): d is ILogAggregate =>
	validate('aggregate', { aggregate: d }, 'required', [...logAggregateList]);

const logTypeList = <const>[
	'broker-update',
	'account-settings-update',
	'account-summary-update',
	'order-success',
	'user-login',
	'stop-update-request-ticket',
	'fund-compliance-failure',
	'account-statistics-update',
	'order-close-success',
	'auth-key-app-failure',
	'stop-update-success',
	'stop-update-failure',
	'fund-compliance',
	'stream-message',
	'stop-update-request-all',
	'positions-update',
	'account-mobile-update',
	'fund-summary-update',
	'order-close-failure',
	'auth-key-app-success',
	'fund-compliance-success',
	'order-failure',
];

/**
 * the log type
 *
 * @TJS-type string
 */
export type ILogType = typeof logTypeList[number];

export const isILogType = (d: any): d is ILogType =>
	validate('type', { type: d }, 'required', [...logTypeList]);

export interface ILog {
	/**
	 * The log object description text
	 *
	 * @minimum 1
	 * @maximum Infinity
	 * @TJS-type string
	 */
	description: string;
	aggregate: ILogAggregate;
	type: ILogType;
	createdAt: IIsoTimestamp;
}

export const isILog = (t: any): t is ILog =>
	validate(
		'description',
		t,
		'required',
		'string',
		{
			description: {
				max: Infinity,
				min: 1,
			},
		},
		isIDescription,
	) &&
	validate('aggregate', t, 'required', 'string', {}, isILogAggregate) &&
	validate('type', t, 'required', 'string', {}, isILogType) &&
	validate('createdAt', t, 'required', 'string', {}, isIIsoTimestamp);
