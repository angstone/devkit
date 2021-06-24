import { validate } from '../../..';

export type IToolName = string;

const LIMITS = {
  toolName: {
    max: 20,
    min: 3
  }
};

export const isIToolName = (d: unknown): d is IToolName =>
  validate('toolName', { toolName: d }, 'required', 'string', LIMITS);
