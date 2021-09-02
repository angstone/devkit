import {
	IFileExtension,
	IMimeType,
	isIFileExtension,
	isIMimeType,
	isIStringReference,
	isIUrl,
	IStringReference,
	IUrl,
	validate,
} from '../../..';

export interface IFile {
	url: IUrl;
	type: IMimeType;
	reference: IStringReference;
	fileExtension: IFileExtension;
}

export const isIFile = (t: any): t is IFile =>
	validate('url', t, 'required', 'string', {}, isIUrl) &&
	validate('type', t, 'required', 'string', {}, isIMimeType) &&
	validate('reference', t, 'required', 'string', {}, isIStringReference) &&
	validate('fileExtension', t, 'required', 'string', {}, isIFileExtension);
