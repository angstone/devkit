/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { validate, isISanitizedMarkdown } from '../../../';

export type ISmallText = string;

const LIMITS = {
  id: {
    max: 700,
    min: 3
  }
};

export const isISmallText = (d: any): d is ISmallText =>
  validate(
    'smallText',
    { smallText: d },
    'required',
    'string',
    LIMITS,
    isISanitizedMarkdown
  );
