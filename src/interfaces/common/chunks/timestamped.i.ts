import { IIsoTimestamp, isIIsoTimestamp, validate } from '../../../';

export interface ITimestamped {
	timestamp: IIsoTimestamp;
}

export const isITimestamped = (t: any): t is ITimestamped =>
	validate('timestamp', t, 'required', 'string', null, isIIsoTimestamp);
