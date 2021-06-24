import { isIToolName, IToolName } from './tool-name.i';
import { validate } from '../../..';

export interface ITool {
  name: IToolName;
}

export const isITool = (d: unknown): d is ITool =>
  validate('name', d, 'required', 'string', undefined, isIToolName);
