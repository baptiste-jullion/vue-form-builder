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

const { form, ctx } = useForm({
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
});
</script>

<template>
  <div style="display: grid; grid-template-columns: 1fr 1fr;">
    <FormBuilderForm v-model="form">
      <FormBuilderFormFieldInput
        :ctx
        type="Select"
        path="hobbies"
        :props="{
          options: ['reading', 'gaming', 'cooking', 'traveling', 1],
        }"
      />
      <FormBuilderFormField
        :ctx
        type="Text"
        path="name"
      />
      <FormBuilderFormField
        :ctx
        type="Text"
        path="height"
        :initial="180"
      />
      <FormBuilderFormField
        :ctx
        type="Date"
        path="birthdate"
        :props="{ max: new Date().toISOString().split('T')[0] }"
      />
      <FormBuilderFormField
        :ctx
        type="Text"
        path="isActive"
        :emits="{
          change: (value: boolean) => console.log('Checkbox changed:', value),
        }"
      />
      <FormBuilderFormField
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
        <FormBuilderFormField
          :ctx
          type="Text"
          path="address.street"
        />
        <FormBuilderFormFieldInput
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
    </FormBuilderForm>

    <pre>{{ ctx.form }}</pre>
  </div>
</template>
