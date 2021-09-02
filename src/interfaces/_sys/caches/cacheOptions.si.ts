import {
  COMMON_VALIDATIONS,
  isSICachePlace,
  SICachePlace,
  validate
} from '../../../';

export interface SICacheOptions {
  fromCache?: SICachePlace;
  toCache?: SICachePlace;
  expiration?: number;
  autoRefresh?: boolean;
}

export const isSICacheOptions = (t: unknown): t is SICacheOptions =>
  validate('fromCache', t, 'optional', 'string', null, isSICachePlace) &&
  validate('toCache', t, 'optional', 'string', null, isSICachePlace) &&
  validate(
    'expiration',
    t,
    'optional',
    'number',
    {
      expiration: {
        max: Infinity,
        min: 0
      }
    },
    COMMON_VALIDATIONS.INTEGER
  ) &&
  validate('autoRefresh', t, 'optional', 'boolean');
