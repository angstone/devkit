import { IACDataList, isIACDataList, validate } from '../../../';

export interface IActivityComponent {
  dataList?: IACDataList;
}

export const isIActivityComponent = (d: unknown): d is IActivityComponent =>
  validate('dataList', d, 'optional', 'object', undefined, isIACDataList);
