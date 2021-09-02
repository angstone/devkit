import {
	IIsoTimestamp,
	IName,
	isIIsoTimestamp,
	isIName,
	isIStringReference,
	IStringReference,
	validate,
} from '../../..';

export type IToken = string;

export const isIToken = (d: any): d is IToken => {
	validate('token', { token: d }, 'required', 'string', {
		token: {
			max: 1000,
			min: 3,
		},
	});
	return true;
};

export interface IDevice {
	uuid: IStringReference;
	name: IName;
	model: IName;
	systemName: IName;
	systemVersion: IName;
}

export const isIDevice = (t: any): t is IDevice =>
	validate('uuid', t, 'required', 'string', {}, isIStringReference) &&
	validate('name', t, 'required', 'string', {}, isIName) &&
	validate('model', t, 'required', 'string', {}, isIName) &&
	validate('systemName', t, 'required', 'string', {}, isIName) &&
	validate('systemVersion', t, 'required', 'string', {}, isIName);

export interface IDeviceToken {
	device: IDevice;
	token: IToken;
	createdAt: IIsoTimestamp;
	updatedAt: IIsoTimestamp;
}

export const isIDeviceToken = (t: any): t is IDeviceToken =>
	validate('device', t, 'required', 'object', {}, isIDevice) &&
	validate('token', t, 'required', 'string', {}, isIToken) &&
	validate('createdAt', t, 'required', 'string', {}, isIIsoTimestamp) &&
	validate('updatedAt', t, 'required', 'string', {}, isIIsoTimestamp);
