import {
  isIStringReference,
  IStringReference,
  IACDataListPropertyEntry,
  isIACDataListPropertyEntry,
  validateEach,
  validate
} from '../../../../../';

export interface IACDataListEntry {
  id: IStringReference;
  properties: IACDataListPropertyEntry[];
}

export const isIACDataListEntry = (d: unknown): d is IACDataListEntry =>
  validate('id', d, 'required', 'string', undefined, isIStringReference) &&
  validateEach('properties', d, isIACDataListPropertyEntry, 'required');
