import { component$ } from '@builder.io/qwik';

export interface MfErrorProps {
  message?: string;
  id?: string;
  class?: string;
}

export const MfError = component$<MfErrorProps>((props) => {


  if (!props.message) return null;

  return (
    <div id={props.id} class="error -mb-4 border-red-500 focus:ring-red-500 text-xs text-red-500" role="alert" aria-live="assertive">
      {props.message}
    </div>
  );
});
