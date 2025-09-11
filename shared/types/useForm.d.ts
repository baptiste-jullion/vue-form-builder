import type { SelectProps } from "~/components/Inputs/Select.vue";
import Select from "~/components/Inputs/Select.vue";

export const FormFieldInputs = {
  Select,
} as const;

export type FormFieldInputsKeys = keyof typeof FormFieldInputs;

export interface FormFieldInputsInterface {
  Select: SelectProps
}
