import type { z, ZodType } from "zod";

export type FormValues<T> = DeepPartial<T>;
export type FormSchema<T> = ZodType<T>;

export type FormValidationTriggerMode
  = | "change"
    | "blur"
    | "submit"
    | "input"
    | "mount";

export type FormValidationTrigger<T>
  = | Arrayable<FormValidationTriggerMode>
    | DeepPartial<
      Record<DeepKeyOf<
        z.infer<NonNullable<FormSchema<T>>>
      > | "*", Arrayable<FormValidationTriggerMode>>
    >;

export interface FormValidationRules<T> {
  trigger?: FormValidationTrigger<T>
}

export interface FormConfig<T> {
  validation?: FormValidationRules<T>
}

export interface UseFormOptions<T> {
  initialValues?: FormValues<T>
  schema?: FormSchema<T>
  config?: FormConfig<T>
}
