import {
  isIStringReference,
  IStringReference,
  validate,
  validateEach
} from '../../../../../';

export interface IACDataListProperty {
  name: IStringReference;
  type: 'string' | 'number' | 'date' | 'enum';
  types?: string[];
}

export const isIACDataListProperty = (d: unknown): d is IACDataListProperty =>
  validate('name', d, 'required', 'string', undefined, isIStringReference) &&
  validate('type', d, 'required', ['string', 'number', 'date', 'enum']) &&
  validateEach('types', d, isIStringReference, 'optional');
