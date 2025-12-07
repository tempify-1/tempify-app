import { component$} from '@builder.io/qwik';
import type { AppFormFieldProps } from '../app-form/form-types';
import { AppFormFieldRenderer } from '../app-form-field-renderer/app-form-field-renderer';

export const AppFormFieldset = component$<AppFormFieldProps>((props) => {
  return (
    <fieldset id={props.field.name} key={props.field.name} class="fieldset">
      <legend class="legend">{props.field.label}</legend>
      <AppFormFieldRenderer fields={props.field.fields || []} formStore={props.formStore} />
    </fieldset>
  );
});
