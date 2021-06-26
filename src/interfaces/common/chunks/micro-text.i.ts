/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { validate, isISanitizedMarkdown } from '../../../';

export type IMicroText = string;

const LIMITS = {
  id: {
    max: 50,
    min: 3
  }
};

export const isIMicroText = (d: any): d is IMicroText =>
  validate(
    'microText',
    { microText: d },
    'required',
    'string',
    LIMITS,
    isISanitizedMarkdown
  );
