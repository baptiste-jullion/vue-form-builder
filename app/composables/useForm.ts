import type { ZodType } from "zod";
import { ZodObject } from "zod";

interface UseFormArgs<T> {
  initialValues?: DeepPartial<T>
  schema?: ZodType<T>
}

export default function useForm<T extends object>(args: UseFormArgs<T>) {
  const form = reactive({ ...args.initialValues });

  return {
    form,
    ctx: {
      schema: args.schema,
      form,
    },
  };
}

export function getValidatorByPath<T extends object>(schema: ZodType<T> | undefined, path: string) {
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
