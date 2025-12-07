/**
 * Form Test Route Types
 *
 * This file contains types for form test route components.
 */

/**
 * Traveller type for nested array in rooms
 */
export type Traveller = {
  key: string;
  name: string;
  email: string;
};

/**
 * Room type for field array
 */
export type Room = {
  travellers: Traveller[];
};

/**
 * Todo item type
 */
export type TodoItem = {
  key: string;
  label: string;
  deadline: string;
};

/**
 * Multi-select option type
 */
export type MultiSelectOption = {
  key: string;
};

/**
 * Form test data type
 */
export type FormData = {
  email: string;
  password: string;
  hiddenField: string;
  phone: string;
  date: string;
  dateRange: string[] | undefined;
  file: string;
  checkbox: boolean;
  color: string;
  number: string;
  range: string;
  textarea: string;
  select: string;
  multiSelect: MultiSelectOption[];
  contactEmail: string;
  rooms: Room[];
  todos: TodoItem[];
  completedTodos: TodoItem[];
};
