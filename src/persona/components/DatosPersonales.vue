<template>
  <q-form class="row q-col-gutter-sm items-center q-pa-md">
    <base-input
      label="Encuestador"
      name="dni"
      class="col-7"
      type="text"
      readonly
    />
    <base-input label="Fecha" name="dni" class="col-5" type="text" readonly />
    <base-input
      label="Unidad Ejecutora"
      name="unidad_ejecutora"
      class="col-3"
      type="text"
      readonly
    />
    <base-input
      label="Red Salud"
      name="red_salud"
      class="col-3"
      type="text"
      readonly
    />
    <base-input
      label="Micro Redes"
      name="micro_redes"
      class="col-3"
      type="text"
      readonly
    />
    <base-input
      label="Establecimiento de Salud"
      name="red_salud"
      class="col-3"
      type="text"
      readonly
    />
  </q-form>
</template>

<script setup lang="ts">
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
useForm({
  validationSchema,
});
</script>
