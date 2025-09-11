import type z from "zod";

interface UseFormArgs<T> {
  initialValues?: DeepPartial<T>
  schema?: z.ZodSchema<T>
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
