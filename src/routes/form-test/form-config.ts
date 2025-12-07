import { email, minLength, required } from "@modular-forms/qwik";

import { Field } from "~/components/form/app-form/form-types";

export const fields: Field[] = [
  {
    name: "password",
    type: "password",
    label: "Password",
    value: "KFDSHDSFH",
    required: true,
    placeholder: "Enter your password",
    hidden: false,
    validate: [required<string>("Please enter your password.")],
  },
  {
    name: "hiddenField",
    type: "hidden",
    value: "secret-value-123",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    value: "sdah@mail.com",
    required: true,
    placeholder: "your.email@example.com",
    tooltip: "dshdsfhkdfsjkh",
    validate: [
      required<string>("Please enter your email address."),
      email("Please enter a valid email address."),
    ],
  },
  {
    name: "phone",
    type: "tel",
    label: "Phone",
    value: "+6421876778",
    required: true,
    placeholder: "Your phone number",
    min: 10,
    validate: [
      required<string>("Please enter your phone number."),
      minLength(10, "Phone number must be at least 10 characters."),
    ],
  },
  {
    name: "date",
    type: "date",
    label: "Date",
    placeholder: "Select a date",
    required: true,
    value: undefined,
    validate: [required<string>("Please select a date.")],
    minDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    maxDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
  },
  {
    name: "dateRange",
    type: "dateRange",
    label: "Date Range",
    placeholder: "Select a date range",
    required: true,
    value: undefined,
    validate: [required<Array<any>>("Please select a date range.")],
    minDate: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    maxDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
  },
  {
    name: "file",
    type: "file",
    label: "File",
    value: "",
    validate: [required<string>("Please enter your file.")],
  },
  {
    name: "checkbox",
    type: "checkbox",
    label: "Checkbox",
    subLabel: "This is a checkbox",
    value: true,
  },
  {
    name: "color",
    type: "color",
    label: "Color",
    value: "#FFFFFF",
    validate: [required<string>("Please enter your color.")],
  },
  {
    name: "number",
    type: "number",
    label: "Number",
    value: "12",
    validate: [required<string>("Please enter your number.")],
  },
  {
    name: "range",
    type: "range",
    label: "Range",
    value: "24",
    validate: [required<string>("Please enter your range.")],
  },
  {
    name: "textarea",
    type: "textarea",
    label: "Textarea",
    value: "EFWLJK",
    validate: [required<string>("Please enter your textarea.")],
  },
  {
    name: "select",
    type: "select",
    label: "Select",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
    value: "option1",
    validate: [required<string>("Please enter your select.")],
  },
  {
    name: "multiSelect",
    type: "multiSelect",
    label: "Multiple Select",
    options: [
      { label: "Option 1", value: { key: "option1" } },
      { label: "Option 2", value: { key: "option2" } },
      { label: "Option 3", value: { key: "option3" } },
      { label: "Option 4", value: { key: "option4" } },
      { label: "Option 5", value: { key: "option5" } },
    ],
    value: [{ key: "option1" }, { key: "option2" }],
    min: 1,
    max: 3,
    validate: [required<Array<string>>("Please enter your multiSelect.")],
  },

  {
    name: "contactFieldset",
    type: "fieldset",
    label: "Contact Information",
    fields: [
      {
        name: "contactEmail",
        type: "email",
        label: "Email Address",
        value: "",
        required: true,
        placeholder: "contact@example.com",
        validate: [
          required<string>("Please enter your email address."),
          email("Please enter a valid email address."),
        ],
      },
    ],
  },

  {
    name: "rooms",
    type: "fieldArray",
    label: "Rooms",
    singularLabel: "Room",
    min: 0,
    max: 4,
    value: [
      {
        travellers: [{ key: "adult", name: "", email: "" }],
      },
    ],
    style: ".field-array-item .field-wrapper {width:100%;}",
    fields: [
      {
        name: "rooms.#.travellers",
        type: "combobox",
        label: "Travellers",
        singularLabel: "Traveller",
        options: [
          { label: "Adult", value: { key: "adult", name: "", email: "" } },
          { label: "0 years old", value: { key: "0", name: "", email: "" } },
          { label: "1 year old", value: { key: "1", name: "", email: "" } },
          { label: "2 years old", value: { key: "2", name: "", email: "" } },
          { label: "3 years old", value: { key: "3", name: "", email: "" } },
          { label: "4 years old", value: { key: "4", name: "", email: "" } },
          { label: "5 years old", value: { key: "5", name: "", email: "" } },
          { label: "6 years old", value: { key: "6", name: "", email: "" } },
          { label: "7 years old", value: { key: "7", name: "", email: "" } },
          { label: "8 years old", value: { key: "8", name: "", email: "" } },
          { label: "9 years old", value: { key: "9", name: "", email: "" } },
          { label: "10 years old", value: { key: "10", name: "", email: "" } },
          { label: "11 years old", value: { key: "11", name: "", email: "" } },
          { label: "12 years old", value: { key: "12", name: "", email: "" } },
          { label: "13 years old", value: { key: "13", name: "", email: "" } },
          { label: "14 years old", value: { key: "14", name: "", email: "" } },
          { label: "15 years old", value: { key: "15", name: "", email: "" } },
        ],
        value: [{ key: "adult", name: "", email: "" }],
        min: 1,
        max: 8,
        reselectOptions: true,
        group: "rooms",
        fields: [
          {
            name: "rooms.#.travellers.#.key",
            type: "hidden",
          },
          {
            name: "rooms.#.travellers.#.name",
            type: "text",
            label: "Name",
            placeholder: "Enter traveller name",
            value: "",
          },
          {
            name: "rooms.#.travellers.#.email",
            type: "email",
            label: "Email",
            placeholder: "Enter traveller email",
            value: "",
          },
        ],
        validate: [
          required<Array<string>>("Please add at least one traveller."),
        ],
      },
    ],
  },

  {
    name: "todos",
    type: "combobox",
    label: "Todos",
    singularLabel: "Todo",
    min: 1,
    max: 5,
    reselectOptions: true,
    editableOptions: true,
    group: "todo-group",
    options: [
      {
        label: "Buy groceries",
        value: {
          key: "buy-groceries",
          label: "Buy groceries",
          deadline: new Date(Date.now() + 864e5).toISOString().split("T")[0],
        },
      },
      {
        label: "Finish project",
        value: {
          key: "finish-project",
          label: "Finish project",
          deadline: new Date(Date.now() + 1728e5).toISOString().split("T")[0],
        },
      },
      {
        label: "Call dentist",
        value: {
          key: "call-dentist",
          label: "Call dentist",
          deadline: new Date(Date.now() + 2592e5).toISOString().split("T")[0],
        },
      },
      {
        label: "Pay bills",
        value: {
          key: "pay-bills",
          label: "Pay bills",
          deadline: new Date(Date.now() + 432e5).toISOString().split("T")[0],
        },
      },
      {
        label: "Exercise",
        value: {
          key: "exercise",
          label: "Exercise",
          deadline: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        },
      },
    ],
    value: [
      {
        key: "buy-groceries",
        label: "Buy groceries",
        deadline: new Date(Date.now() + 864e5).toISOString().split("T")[0],
      },
      {
        key: "finish-project",
        label: "Finish project",
        deadline: new Date(Date.now() + 1728e5).toISOString().split("T")[0],
      },
    ],
    fields: [
      {
        name: "todos.#.key",
        type: "hidden",
      },
      {
        name: "todos.#.label",
        type: "text",
        placeholder: "Enter todo item",
        validate: [required<string>("Please enter a todo item.")],
      },
      {
        name: "todos.#.deadline",
        type: "date",
        placeholder: "Select deadline",
        validate: [required<string>("Please select a deadline.")],
      },
    ],
  },

  {
    name: "completedTodos",
    type: "combobox",
    label: "Completed Todos",
    singularLabel: "Completed Todo",
    min: 0,
    max: 5,
    reselectOptions: true,
    group: "todo-group",
    options: [
      {
        label: "Buy groceries",
        value: {
          key: "buy-groceries",
          label: "Buy groceries",
          deadline: new Date(Date.now() + 864e5).toISOString().split("T")[0],
        },
      },
      {
        label: "Finish project",
        value: {
          key: "finish-project",
          label: "Finish project",
          deadline: new Date(Date.now() + 1728e5).toISOString().split("T")[0],
        },
      },
      {
        label: "Call dentist",
        value: {
          key: "call-dentist",
          label: "Call dentist",
          deadline: new Date(Date.now() + 2592e5).toISOString().split("T")[0],
        },
      },
      {
        label: "Pay bills",
        value: {
          key: "pay-bills",
          label: "Pay bills",
          deadline: new Date(Date.now() + 432e5).toISOString().split("T")[0],
        },
      },
      {
        label: "Exercise",
        value: {
          key: "exercise",
          label: "Exercise",
          deadline: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        },
      },
    ],
    value: [
      {
        key: "call-dentist",
        label: "Call dentist",
        deadline: new Date(Date.now() + 2592e5).toISOString().split("T")[0],
      },
    ],
    fields: [
      {
        name: "completedTodos.#.key",
        type: "hidden",
      },
      {
        name: "completedTodos.#.label",
        label: "Label",
        type: "text",
        placeholder: "Enter todo item",
        validate: [required<string>("Please enter a todo item.")],
      },
      {
        name: "completedTodos.#.deadline",
        label: "Date",
        type: "date",
        placeholder: "Select deadline",
        validate: [required<string>("Please select a deadline.")],
      },
    ],
  },

  {
    name: "submit",
    type: "submit",
    label: "Submit",
  },
];

export type { FormData } from "./form-test";
