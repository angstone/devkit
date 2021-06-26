/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { dealErrorToString, validate } from '../../../tools';
const insane = require('@angstone/insane');

export type ISanitizedMarkdown = string;

const sanitizerValidator = (data: any): true | string => {
  try {
    insane(data as string, {
      allowedTags: [],
      throwAsValidationError: true
    });
  } catch (err) {
    return dealErrorToString(err);
  }

  return true;
};

export const isISanitizedMarkdown = (d: any): d is ISanitizedMarkdown =>
  validate(
    'text',
    { text: d },
    'required',
    'string',
    undefined,
    sanitizerValidator
  );
