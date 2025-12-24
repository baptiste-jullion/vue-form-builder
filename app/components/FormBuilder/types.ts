import type {
  z,
  ZodType,
} from "zod";
import type {
  CheckboxEmits,
  CheckboxProps,
} from "~/components/Inputs/Checkbox.vue";
import type { DateProps } from "~/components/Inputs/Date.vue";
import type { NumberProps } from "~/components/Inputs/Number.vue";
import type {
  SelectEmits,
  SelectProps,
} from "~/components/Inputs/Select.vue";
import type {
  TextEmits,
  TextProps,
} from "~/components/Inputs/Text.vue";
import Checkbox from "~/components/Inputs/Checkbox.vue";
import Date from "~/components/Inputs/Date.vue";
import Number from "~/components/Inputs/Number.vue";
import Select from "~/components/Inputs/Select.vue";
import Text from "~/components/Inputs/Text.vue";

export const FieldInputs = {
  Checkbox,
  Date,
  Number,
  Select,
  Text,
} as const;

export type FieldInputsKeys = keyof typeof FieldInputs;

export type FieldPropSet<I>
  = | {
    emits?: Partial<EmitsToOptions<SelectEmits>>
    props?: SelectProps<I>
    type: "Select"
  }
  | {
    emits?: Partial<EmitsToOptions<TextEmits>>
    props?: TextProps
    type: "Text"
  }
  | {
    emits?: object
    props?: DateProps
    type: "Date"
  }
  | {
    emits?: object
    props?: NumberProps
    type: "Number"
  }
  | {
    emits?: Partial<EmitsToOptions<CheckboxEmits>>
    props?: CheckboxProps
    type: "Checkbox"
  }
    ;

export interface FormContext {
  schema?: ZodType<object>
  values: Record<string, string>
  errors: Record<string, string>
}

export type FormContextKeys<Context extends FormContext> = DeepKeyOf<
  z.infer<NonNullable<Context["schema"]>>
>;
