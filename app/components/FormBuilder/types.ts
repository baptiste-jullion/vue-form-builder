import type { z, ZodType } from "zod";
import type { CheckboxEmits, CheckboxProps } from "~/components/Inputs/Checkbox.vue";
import type { DateProps } from "~/components/Inputs/Date.vue";
import type { NumberProps } from "~/components/Inputs/Number.vue";
import type { SelectEmits, SelectProps } from "~/components/Inputs/Select.vue";
import type { TextEmits, TextProps } from "~/components/Inputs/Text.vue";
import Checkbox from "~/components/Inputs/Checkbox.vue";
import Date from "~/components/Inputs/Date.vue";
import Number from "~/components/Inputs/Number.vue";
import Select from "~/components/Inputs/Select.vue";
import Text from "~/components/Inputs/Text.vue";

export const FieldInputs = {
  Date,
  Select,
  Text,
  Number,
  Checkbox,
} as const;

export type FieldInputsKeys = keyof typeof FieldInputs;

export type FieldPropSet<I>
  = | { type: "Select", props?: SelectProps<I>, emits?: Partial<EmitsToOptions<SelectEmits>> }
    | { type: "Text", props?: TextProps, emits?: Partial<EmitsToOptions<TextEmits>> }
    | { type: "Date", props?: DateProps, emits?: object }
    | { type: "Number", props?: NumberProps, emits?: object }
    | { type: "Checkbox", props?: CheckboxProps, emits?: Partial<EmitsToOptions<CheckboxEmits>> }
    ;

export interface FormContext {
  schema?: ZodType<object>
  values: Record<string, string>
  errors: Record<string, string>
}

export type FormContextKeys<Context extends FormContext> = DeepKeyOf<
  z.infer<NonNullable<Context["schema"]>>
>;
