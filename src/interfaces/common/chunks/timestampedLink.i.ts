import {
	isITimestamped,
	isIUrl,
	ITimestamped,
	IUrl,
	validate,
} from '../../../';

export interface ITimestampedLink extends ITimestamped {
	href: IUrl;
}

export const isITimestampedLink = (t: any): t is ITimestampedLink =>
	validate('href', t, 'required', 'string', null, isIUrl) &&
	isITimestamped(t);
