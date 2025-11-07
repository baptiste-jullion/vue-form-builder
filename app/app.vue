<script lang="ts" setup>
import z from "zod";

const schema = z.object({
  address: z.object({
    city: z.string(),
  }),
  birthdate: z.coerce.date(),
  consent: z.boolean(),
  email: z.email().optional(),
  height: z.number().min(100).max(250).nullable(),
  id: z.uuid(),
  name: z.string().min(3),
});

const { values, ctx, methods: { reset, validate } } = useForm({
  initialValues: {
    birthdate: "2000-01-01",
    name: "John Doe",
  },
  schema,
});
</script>

<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
    <FormBuilderForm v-model="values">
      <FormBuilderField :ctx path="address.city" type="Text" />
      <FormBuilderField :ctx path="birthdate" type="Date" />
      <FormBuilderField :ctx path="consent" type="Checkbox" />
      <FormBuilderField :ctx path="email" type="Text" />
      <FormBuilderField :ctx path="height" type="Number" />
      <FormBuilderField :ctx path="id" type="Text" />
      <FormBuilderField :ctx path="name" type="Text" />
    </FormBuilderForm>

    <div>
      <button @click="reset({ overrideValues: { id: '08a42261-7702-51e4-b4b2-b6a3ceac9a62' }, keepInitialValues: true })">
        Reset with ID override and keep initial values
      </button>
      <button @click="validate()">
        Validate
      </button>

      <pre>{{ { values: ctx.values, errors: ctx.errors, meta: ctx.meta } }}</pre>
    </div>
  </div>
</template>

<style>
body {
  color: #0f0f0f;
  background: white;
}
</style>
