/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { validate } from '../../../tools';

export type ISvgTextCode = string;

const LIMITS = {
  id: {
    max: 200000,
    min: 70
  }
};

export const isISvgTextCode = (d: any): d is ISvgTextCode =>
  validate('svgTextCode', { svgTextCode: d }, 'required', 'string', LIMITS);
