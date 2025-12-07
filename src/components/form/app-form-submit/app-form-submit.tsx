import { component$ } from '@builder.io/qwik';
import type { Field } from '../app-form/form-types';
import { AppButton } from '~/components/ui/app-button/app-button';
import type { FormStore } from '@modular-forms/qwik';

export interface AppFormSubmitProps {
  field: Field;
  formStore: FormStore<Record<string, string>, undefined>;
}

export const AppFormSubmit = component$<AppFormSubmitProps>(({ field, formStore }) => {
  return (
    <AppButton
      type="submit"
      style="grid-column: 1 / -1;"
      key={field.name}
      disabled={field.disabled || formStore.submitting}
      loading={formStore.submitting}
    >
      {formStore.submitting ? 'Submitting...' : field.label}
    </AppButton>
  );
});
