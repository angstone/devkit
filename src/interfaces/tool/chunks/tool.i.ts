import {
  IMicroText,
  isIMicroText,
  isISmallText,
  isISvgTextCode,
  ISmallText,
  ISvgTextCode,
  validate
} from '../../..';
import { isIToolName, IToolName } from './tool-name.i';

export interface ITool {
  name: IToolName;
  icon: ISvgTextCode;
  bigName?: IMicroText;
  shortDescription: ISmallText;
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
  );
