import {
  IActivity,
  IMicroText,
  isIActivity,
  isIMicroText,
  isISmallText,
  isISvgTextCode,
  isIToolName,
  ISmallText,
  ISvgTextCode,
  IToolName,
  validate,
  validateEach
} from '../../../';

export interface ITool {
  name: IToolName;
  icon: ISvgTextCode;
  bigName?: IMicroText;
  shortDescription: ISmallText;
  activities: IActivity[];
}

export const isITool = (d: unknown): d is ITool =>
  validate('name', d, 'required', 'string', undefined, isIToolName) &&
  validate('icon', d, 'required', 'string', undefined, isISvgTextCode) &&
  validate('bigName', d, 'optional', 'string', undefined, isIMicroText) &&
  validate(
    'shortDescription',
    d,
    'required',
    'string',
    undefined,
    isISmallText
  ) &&
  validateEach('activities', d, isIActivity, 'required');
