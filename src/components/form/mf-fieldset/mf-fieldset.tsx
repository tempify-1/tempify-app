import { component$} from '@builder.io/qwik';
import type { MfFieldProps } from '../mf-form/form-types';
import { MfFieldRenderer } from '../mf-field-renderer/mf-field-renderer';

export const MfFieldset = component$<MfFieldProps>((props) => {
  return (
    <fieldset id={props.field.name} key={props.field.name} class="fieldset">
      <legend class="legend">{props.field.label}</legend>
      <MfFieldRenderer fields={props.field.fields || []} formStore={props.formStore} />
    </fieldset>
  );
});
