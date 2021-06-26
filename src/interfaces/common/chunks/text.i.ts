/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { validate, isISanitizedMarkdown } from '../../../';

export type IText = string;

const LIMITS = {
  id: {
    max: 7000,
    min: 3
  }
};

export const isIText = (d: any): d is IText =>
  validate(
    'text',
    { text: d },
    'required',
    'string',
    LIMITS,
    isISanitizedMarkdown
  );
