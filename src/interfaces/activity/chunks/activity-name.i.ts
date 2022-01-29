import { validate } from '../../..';

export type IActivityName = string;

const LIMITS = {
  toolName: {
    max: 30,
    min: 3
  }
};

export const isIActivityName = (d: unknown): d is IActivityName =>
  validate('toolName', { toolName: d }, 'required', 'string', LIMITS);
