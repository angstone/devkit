import { validate } from '../../..';

/**
 * the phone number.
 *
 * @minimum 5
 * @maximum 8
 * @format hh:mm:ss
 * @TJS-type string
 */
export type IHourString = string;

const LIMITS: any = {
	hourString: {
		max: 8,
		min: 5,
	},
};

export const isIHourString = (d: any): d is IHourString =>
	validate(
		'hourString',
		{ hourString: d },
		'required',
		'string',
		LIMITS,
		(dt: any) => {
			const t1 = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm.test(
				dt,
			);
			const t2 = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gm.test(dt);
			if (!(t1 || t2)) {
				throw new Error(
					'property hourString must match format HH:MM or HH:MM:SS',
				);
			} else {
				return true;
			}
		},
	);
