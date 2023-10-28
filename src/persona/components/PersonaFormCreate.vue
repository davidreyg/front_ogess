<template>
  <form class="row q-col-gutter-sm items-center" @submit="onSubmit">
    <base-input label="DNI" name="dni" class="col-3" :type="'text'" />
    <base-input
      label="Fecha de Nacimiento"
      name="fecha_nacimiento"
      class="col-3"
      type="date"
      @change="f"
    />
    <q-input type="text" label="Edad" outlined class="col-2" />
    <base-checkbox
      label="Jefe de Familia"
      name="jefe"
      class="col-2"
      :value="false"
    />
    <q-input type="text" label="Nombres" outlined class="col-6" />
    <q-input type="text" label="Apellidos" outlined class="col-6" />
    <!-- <div class="heigth:30px"></div> -->
    <q-select
      v-model="model"
      :options="['FROG', 'GATO', 'PERRO']"
      label="Ocupacion"
      outlined=""
      class="col-6"
    />
    <q-select
      v-model="model"
      :options="['FROG', 'GATO', 'PERRO']"
      label="Estado"
      outlined=""
      class="col-6"
    />
    <q-select
      v-model="model"
      :options="['FROG', 'GATO', 'PERRO']"
      label="Religion"
      outlined=""
      class="col-6"
    />
    <q-select
      v-model="model"
      :options="['FROG', 'GATO', 'PERRO']"
      label="Seguro"
      outlined=""
      class="col-6"
    />
    <div class="col-6">
      <q-btn color="primary" icon="check" label="OK" type="submit" />
    </div>
  </form>
</template>

<script setup>
import BaseCheckbox from 'src/core/components/BaseCheckbox.vue';
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
const f = () => {
  console.log('fffff');
};
import { date } from 'quasar';

const date1 = new Date();
const date2 = new Date(2000, 10, 30);
const unit = 'days';

const diff = date.getDateDiff(date1, date2, unit);
// `diff` is 34 (days)
console.log(Math.floor(diff / 365));
</script>
