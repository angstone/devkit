/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { validate, isISanitizedMarkdown } from '../../..';

export type IBigText = string;

const LIMITS = {
  id: {
    max: 500000,
    min: 3
  }
};

export const isIBigText = (d: any): d is IBigText =>
  validate(
    'bigText',
    { bigText: d },
    'required',
    'string',
    LIMITS,
    isISanitizedMarkdown
  );
