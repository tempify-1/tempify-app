import { component$ } from '@builder.io/qwik';
import type { Field } from '../app-form/form-types';

export interface AppFormLabelProps {
  field: Field;
}

export const AppFormLabel = component$<AppFormLabelProps>((props) => {
  const { name, label } = props.field;
  return (
    <label class="label block mb-2 text-sm font-medium text-gray-900 dark:text-white" for={name}>
      {label}
    </label>
  );
});
