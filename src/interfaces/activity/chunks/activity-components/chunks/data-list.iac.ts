import {
  IACDataListEntry,
  IACDataListProperty,
  isIACDataListEntry,
  isIACDataListProperty,
  validateEach
} from '../../../../../';

export interface IACDataList {
  properties: IACDataListProperty[];
  entries?: IACDataListEntry[];
}

export const isIACDataList = (d: unknown): d is IACDataList =>
  validateEach('properties', d, isIACDataListProperty, 'required') &&
  validateEach('entries', d, isIACDataListEntry, 'optional');
