import type { QRL } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";
import type { SubmitHandler } from "@modular-forms/qwik";
import {
  getValue,
  type InitialValues,
  useFormStore,
} from "@modular-forms/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  AppForm,
  getFieldArrays,
  getInitialFormValues,
} from "~/components/form/app-form/app-form";
import { type FormData, fields } from "~/routes/form-test/form-config";
import { Field } from "~/components/form/app-form/form-types";

export const useFormLoader = routeLoader$<InitialValues<FormData>>(() =>
  getInitialFormValues(fields),
);
export default component$(() => {
  const loginForm = useFormStore<FormData>({
    loader: useFormLoader(),
    validateOn: "change",
    revalidateOn: "change",
    fieldArrays: getFieldArrays(fields) as any[],
  });

  const mappedFields: Field[] = fields.map((field) => {
    if (field.name === "password") {
      return {
        ...field,
        hidden: getValue(loginForm, "email") === "",
      };
    }
    return field;
  });

  const handleSubmit: QRL<SubmitHandler<FormData>> = $((values, event) => {
    console.log("Form submitted with state:", values, event);
  });

  return (
    <>
      <header class="p-8">
        <div class="content">
          <h1>Forms</h1>
          <p>Forms Playground</p>
        </div>
      </header>

      <main>
        <section class="bg-white p-8 dark:bg-gray-800">
          <AppForm
            formStore={loginForm as any}
            debug={true}
            onSubmit$={handleSubmit}
            fields={mappedFields}
            formClass="max-w-300"
          />
        </section>
      </main>
    </>
  );
});
