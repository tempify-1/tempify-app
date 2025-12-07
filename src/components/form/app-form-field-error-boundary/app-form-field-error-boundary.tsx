import { component$, Slot, useErrorBoundary } from "@builder.io/qwik";

interface AppFormFieldErrorBoundaryProps {
  fieldName: string;
}

export const AppFormFieldErrorBoundary = component$<AppFormFieldErrorBoundaryProps>(
  ({ fieldName }) => {
    const errorBoundary = useErrorBoundary();

    if (errorBoundary.error) {
      return (
        <div class="field-error-boundary p-4 border border-red-500 bg-red-50 rounded">
          <p class="text-red-700 text-sm">
            Failed to render field: <strong>{fieldName}</strong>
          </p>
          <details class="mt-2 text-xs text-red-600">
            <summary>Error details</summary>
            <pre class="mt-1 overflow-auto">{String(errorBoundary.error)}</pre>
          </details>
        </div>
      );
    }

    return <Slot />;
  }
);

