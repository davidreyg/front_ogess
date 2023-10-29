<template>
  <q-form class="row q-col-gutter-sm items-center" @submit="onSubmit">
    <base-input
      label="Encuestador"
      name="dni"
      class="col-7"
      :type="'text'"
      readonly
    />
    <base-input
      label="Fecha"
      name="dni"
      class="col-5"
      :type="'text'"
      readonly
    />
    <div class="col-6">
      <q-btn color="primary" icon="check" label="OK" type="submit" />
    </div>
  </q-form>
</template>

<script setup>
import BaseInput from 'src/core/components/BaseInput.vue';

import { useForm } from 'vee-validate';
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  dni: Yup.number()
    .typeError('DNI debe ser un numero')
    .test('len', 'DNI debe tener 8 caracteres', (val) => {
      if (val) {
        return val.toString().length === 8;
      } else {
        return;
      }
    }),
  fecha_nacimiento: Yup.date().required().label('Fecha de Nacimiento'),
  jefe: Yup.boolean().required(),
  password: Yup.string().min(6).required(),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
});
const { handleSubmit } = useForm({
  validationSchema,
});

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
