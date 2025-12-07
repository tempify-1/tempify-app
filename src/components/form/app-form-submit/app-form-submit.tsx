import { component$ } from '@builder.io/qwik';
import type { Field } from '../app-form/form-types';
import { AppButton } from '~/components/ui/app-button/app-button';

export interface AppFormSubmitProps {
  field: Field;
}

export const AppFormSubmit = component$<AppFormSubmitProps>((props) => {
  return (
    <AppButton
      type="submit"
      style="grid-column: 1 / -1;"
      key={props.field.name}
      disabled={props.field.disabled}
    >
      {props.field.label}
    </AppButton>
  );
});
