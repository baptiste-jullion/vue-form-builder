import type { ZodType } from "zod";
import { ZodObject } from "zod";

export default function useForm<T extends object>(
  options: UseFormOptions<T>,
) {
  const values = reactive({ ...options.initialValues });
  const errors = reactive({});

  return {
    values,
    ctx: {
      schema: options.schema,
      values,
      errors,
    },
  };
}

export function getValidatorByPath<T extends object>(
  schema: ZodType<T> | undefined,
  path: string,
) {
  if (!schema)
    return null;

  const parts = path.split(".");
  let current = schema;

  for (const part of parts) {
    if (current instanceof ZodObject) {
      current = current.shape[part];
    }
    else {
      return null;
    }
  }

  return current;
}
