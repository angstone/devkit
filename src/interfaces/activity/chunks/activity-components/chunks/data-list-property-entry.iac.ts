import {
  isIStringReference,
  IStringReference,
  validate
} from '../../../../../';

export interface IACDataListPropertyEntry {
  name: IStringReference;
  value: unknown;
}

export const isIACDataListPropertyEntry = (
  d: unknown
): d is IACDataListPropertyEntry =>
  validate('name', d, 'required', 'string', undefined, isIStringReference);
