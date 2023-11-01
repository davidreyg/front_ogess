<template>
  <form class="row q-col-gutter-sm items-center" @submit="onSubmit">
    <base-input label="DNI" name="dni" class="col-3" :type="'text'" />
    <base-input
      label="Fecha de Nacimiento"
      name="fecha_nacimiento"
      class="col-3"
      type="date"
      @update:model-value="onFechaChange"
    />
    <base-input label="Edad" name="edad" class="col-2" type="text" disable />
    <base-checkbox
      label="Jefe de Familia"
      name="jefe"
      class="col-auto"
      :value="false"
    />
    <!-- <div class="heigth:30px"></div> -->
    <!-- <q-select
      v-model="model"
      :options="['FROG', 'GATO', 'PERRO']"
      label="Ocupacion"
      outlined
      class="col-6"
    />
    <q-select
      v-model="model"
      :options="['FROG', 'GATO', 'PERRO']"
      label="Estado"
      outlined
      class="col-6"
    />
    <q-select
      v-model="model"
      :options="['FROG', 'GATO', 'PERRO']"
      label="Religion"
      outlined
      class="col-6"
    />
    <q-select
      v-model="model"
      :options="['FROG', 'GATO', 'PERRO']"
      label="Seguro"
      outlined=""
      class="col-6"
    /> -->
    <div class="col-12">
      <div class="row justify-end items-center q-col-gutter-x-md">
        <div class="col-auto">
          <q-btn
            color="warning"
            icon="arrow_back"
            label="Atrás"
            @click="emit('navigate', false)"
          />
        </div>
        <div class="col-auto">
          <q-btn
            color="primary"
            icon="arrow_forward"
            label="Siguiente"
            type="submit"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseCheckbox from 'src/core/components/BaseCheckbox.vue';
import BaseInput from 'src/core/components/BaseInput.vue';
import { calculateBirthday } from 'src/core/utils';
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { IPersona } from 'src/persona/models/IPersona';

const emit = defineEmits<{
  (e: 'navigate', isOK: boolean): void;
}>();

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
  edad: Yup.number()
    .typeError('Edad debe ser un numero')
    .required()
    .label('Edad'),
  fecha_nacimiento: Yup.date().required().label('Fecha de Nacimiento'),
  jefe: Yup.boolean().required(),
});

const { handleSubmit, setFieldValue } = useForm<IPersona>({
  validationSchema,
});
const onFechaChange = (val: string) => {
  console.log(val, 'xddddddddddddddddd');
  setFieldValue('edad', calculateBirthday(val));
};
const onSubmit = handleSubmit(() => {
  emit('navigate', true);
});
</script>
