import { validate } from '../../../tools';

export interface ILoggerHandler {
  fatal: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  note: (...args: unknown[]) => void;
  dev: (...args: unknown[]) => void;
  dash: () => void;
}

export const isILoggerHandler = (d: unknown): d is ILoggerHandler =>
  validate('fatal', d, 'required', 'function') &&
  validate('error', d, 'required', 'function') &&
  validate('note', d, 'required', 'function') &&
  validate('dev', d, 'required', 'function') &&
  validate('dash', d, 'required', 'function');
