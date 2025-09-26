<script setup lang="ts">
import z from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  height: z.number().min(0, "Height must be a positive number").optional(),
  birthdate: z.date(),
  isActive: z.boolean(),
  hobbies: z.enum(["reading", "gaming", "cooking", "traveling"]),
  address: z.object({
    street: z.string().min(1, "Street is required").nullable(),
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
      trigger: {

      },
    },
  },
});
</script>

<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr;">
    <FormBuilderForm v-model="values">
      <FormBuilderFieldInput
        :ctx
        type="Select"
        path="hobbies"
        :props="{
          options: ['reading', 'gaming', 'cooking', 'traveling', 1, null],
        }"
      />
      <FormBuilderField
        :ctx
        type="Text"
        path="name"
      />
      <FormBuilderField
        :ctx
        type="Text"
        path="name"
      />
      <FormBuilderField
        :ctx
        type="Number"
        path="height"
      />
      <FormBuilderField
        :ctx
        type="Date"
        path="birthdate"
      />
      <FormBuilderField
        :ctx
        type="Checkbox"
        path="isActive"
      />
      <FormBuilderField
        :ctx
        type="Text"
        path="address.foo"
      />
      <FormBuilderField
        :ctx
        type="Select"
        path="hobbies"
        :props="{
          options: [{ label: 'Reading', value: 'reading' }, { label: 'Gaming', value: 'gaming' }],
          optionLabel: 'label',
          optionValue: 'value',
        }"
      />
      <div>
        <FormBuilderField
          :ctx
          type="Text"
          path="address.street"
        />
        <FormBuilderFieldInput
          type="Select"
          :props="{
            options: [{ label: 'City A', value: 'city_a' }, { label: 'City B', value: 'city_b' }],
            optionValue: 'value',
            optionLabel: 'label',
          }"
          :ctx
          path="address.city"
        />
      </div>
      <FormBuilderFieldErrors :ctx path="name" />
    </FormBuilderForm>

    <pre>{{ { formValues: ctx.values, errors: ctx.errors } }}</pre>
  </div>
</template>
