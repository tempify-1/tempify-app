import { component$, type Signal } from "@builder.io/qwik";
import { Button, Modal } from "flowbite-qwik";
import type { Field } from "../mf-form/form-types";
import type { FormStore } from "@modular-forms/qwik";
import { MfFieldRenderer } from "../mf-field-renderer/mf-field-renderer";
import { setFieldArrayFieldNames } from "../mf-form/form-utils";

export interface MfArrayComboboxModalProps {
  fields: Field;
  formStore: FormStore<Record<string, any>, undefined>;
  index: number;
  modalVisible: Signal<boolean>;
}

export const MfArrayComboboxModal = component$<MfArrayComboboxModalProps>(
  ({ fields, formStore, index, modalVisible }) => {
    const { singularLabel } = fields;

    return (
      <Modal
        size="6xl"                       
        header={
          <div class="flex items-center text-lg">
            {singularLabel} {index + 1}
          </div>
        }
        footer={
          <div class="flex justify-end">
            <Button
              type="button"
              onClick$={() => {
                modalVisible.value = false;
              }}
              color="blue"
            >
              Done
            </Button>
          </div>
        }
        bind:show={modalVisible}
        onClickOutside$={() => {
          modalVisible.value = false;
        }}
      >
        {fields.fields && (
          <div class="form-grid">
          <MfFieldRenderer
            fields={setFieldArrayFieldNames(fields.fields, index, fields.arrayDepth || [])}
            formStore={formStore}
          />
          </div>
        )}
      </Modal>
    );
  },
);
