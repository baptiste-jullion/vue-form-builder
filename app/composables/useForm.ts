import type { ZodType } from "zod";
import * as _ from "lodash-es";
import { ZodObject, ZodRecord } from "zod";

export default function useForm<T extends object>(
  options: UseFormOptions<T>,
) {
  const formId = `form-${useId().replace("v-", "")}`;
  const initialValues = reactive(_.cloneDeep(options.initialValues) || {});
  const values = reactive({ ...initialValues });
  const errors = reactive({});
  const dirty = computed(() => {
    return !_.isEqual(
      cleanUndefined(values),
      cleanUndefined(initialValues),
    );
  });

  function reset(
    overrideOptions?: { overrideValues?: Partial<T>, keepInitialValues?: boolean },
  ) {
    clearObject(errors);
    clearObject(values);

    const newValues = {};

    if (overrideOptions?.keepInitialValues) {
      Object.assign(newValues, initialValues);
    }

    if (overrideOptions?.overrideValues) {
      Object.assign(newValues, overrideOptions.overrideValues);
    }

    Object.assign(initialValues, newValues);
    Object.assign(values, newValues);
  }

  function validate() {
    if (!options.schema) {
      return true;
    }

    clearObject(errors);

    const result = options.schema.safeParse(_.toPlainObject(values) as T);

    if (result.success) {
      return true;
    }
    else {
      for (const issue of result.error.issues) {
        _.set(errors, issue.path.join("."), issue.message);
      }
      return false;
    }
  }

  return {
    values,
    ctx: {
      formId,
      schema: options.schema,
      initialValues,
      values,
      errors,
      meta: {
        dirty,
      },
    },
    methods: {
      reset,
      validate,
    },
  };
}

export function getValidatorByPath<T extends object>(
  schema: ZodType<T> | ZodRecord<any, any> | undefined,
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
    else if (current instanceof ZodRecord) {
      current = current.valueType;
    }
    else {
      return null;
    }
  }

  return current;
}
