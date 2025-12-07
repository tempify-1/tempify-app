import { component$ } from '@builder.io/qwik';
import type { Field } from '../mf-form/form-types';

export interface MfLabelProps {
  field: Field;
}

export const MfLabel = component$<MfLabelProps>((props) => {
  const { name, label } = props.field;
  return (
    <label class="label block mb-2 text-sm font-medium text-gray-900 dark:text-white" for={name}>
      {label}
    </label>
  );
});
