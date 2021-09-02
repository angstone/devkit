import { IHourString, isIHourString, validate } from '../../..';

const daysOfWeek = <const>[
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

export interface IOpeningHours {
	day: typeof daysOfWeek[number];
	open: boolean;
	openTime: IHourString;
	closeTime: IHourString;
}

export const isIOpeningHours = (t: any): t is IOpeningHours =>
	validate('day', t, 'required', [...daysOfWeek]) &&
	validate('open', t, 'required', 'boolean') &&
	validate('openTime', t, 'required', 'string', null, isIHourString) &&
	validate('closeTime', t, 'required', 'string', null, isIHourString);
