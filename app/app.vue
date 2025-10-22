<script lang="ts" setup>
import z from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  height: z.number().min(0, "Height must be a positive number").optional(),
  birthdate: z.date(),
  isActive: z.boolean(),
  hobbies: z.enum(["reading", "gaming", "cooking", "traveling"]),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(2, "State must be at least 2 characters"),
    zip: z.string().length(5, "Zip code must be exactly 5 characters").nullish(),
    foo: z.string().min(1),
  }),
  preferences: z.object({
    notifications: z.array(z.object({
      type: z.string(),
      enabled: z.boolean(),
    }).partial({ enabled: true })),
  }),
}).superRefine(({ isActive, address }, context) => {
  if (isActive && !address.zip) {
    context.addIssue({
      path: ["address", "zip"],
      message: "Zip code is required when active",
    });
  }
});

const { values, ctx } = useForm({
  initialValues: {
    name: "John",
    birthdate: new Date("1990-01-01"),
    isActive: true,
    hobbies: "gaming",
    height: 175,
    address: {
      street: "123 Main St",
      city: "city_a",
      state: "CA",
      zip: "12345",
    },
    preferences: {
      notifications: [
        { type: "email", enabled: true },
        { type: "sms", enabled: false },
      ],
    },
  },
  schema,
  config: {
    validation: {
      trigger: {},
    },
  },
});
</script>

<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr;">
    <FormBuilderForm v-model="values">
      <FormBuilderFieldInput
        :ctx
        path="hobbies"
        :props="{
          options: ['reading', 'gaming', 'cooking', 'traveling', 1, null],
        }"
        type="Select"
      />
      <FormBuilderField
        :ctx
        path="name"
        type="Text"
      />
      <FormBuilderField
        :ctx
        path="name"
        type="Text"
      />
      <FormBuilderField
        :ctx
        path="height"
        type="Number"
      />
      <FormBuilderField
        :ctx
        path="birthdate"
        type="Date"
      />
      <FormBuilderField
        :ctx
        path="isActive"
        type="Checkbox"
      />
      <FormBuilderField
        :ctx
        path="address.foo"
        type="Text"
      />
      <FormBuilderField
        :ctx
        path="hobbies"
        :props="{
          options: [{ label: 'Reading', value: 'reading' }, { label: 'Gaming', value: 'gaming' }],
          optionLabel: 'label',
          optionValue: 'value',
        }"
        type="Select"
      />
      <div>
        <FormBuilderField
          :ctx
          path="address.street"
          type="Text"
        />
        <FormBuilderField
          :ctx
          path="address.zip"
          type="Text"
        />
        <FormBuilderFieldInput
          :ctx
          path="address.city"
          :props="{
            options: [{ label: 'City A', value: 'city_a' }, { label: 'City B', value: 'city_b' }],
            optionValue: 'value',
            optionLabel: 'label',
          }"
          type="Select"
        />
      </div>
    </FormBuilderForm>

    <pre>{{ { formValues: ctx.values, errors: ctx.errors } }}</pre>
  </div>
</template>

<style>
body {
  background: #0f0f0f;
  color: white;
}
</style>
