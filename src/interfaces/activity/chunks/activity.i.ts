import {
  IActivityComponent,
  IActivityName,
  isIActivityComponent,
  isIActivityName,
  validate,
  validateEach
} from '../../../';

export interface IActivity {
  name: IActivityName;
  components: IActivityComponent[];
}

export const isIActivity = (d: unknown): d is IActivity =>
  validate('name', d, 'required', 'string', undefined, isIActivityName) &&
  validateEach('components', d, isIActivityComponent, 'required');
