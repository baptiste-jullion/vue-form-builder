import type { ZodType } from "zod";

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
