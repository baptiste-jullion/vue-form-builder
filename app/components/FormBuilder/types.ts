import type { z, ZodType } from "zod";
import type { DateProps } from "~/components/Inputs/Date.vue";
import type { SelectProps } from "~/components/Inputs/Select.vue";
import type { TextProps } from "~/components/Inputs/Text.vue";
import Date from "~/components/Inputs/Date.vue";
import Select from "~/components/Inputs/Select.vue";
import Text from "~/components/Inputs/Text.vue";

export const FormFieldInputs = {
  Date,
  Select,
  Text,
} as const;

export type FormFieldInputsKeys = keyof typeof FormFieldInputs;

export type FieldPropSet<I = unknown>
  = | { type: "Select", props?: SelectProps<I> }
    | { type: "Text", props?: TextProps }
    | { type: "Date", props?: DateProps };

export interface FormContext { schema?: ZodType<object>, form: Record<string, string> }

export type FormContextKeys<Context extends FormContext> = DeepKeyOf<z.infer<NonNullable<Context["schema"]>>>;
