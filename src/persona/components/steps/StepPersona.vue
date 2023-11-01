<template>
  <form class="row q-col-gutter-sm items-center" @submit="onSubmit">
    <base-input
      label="DNI"
      name="dni"
      class="col-3"
      :type="'text'"
      :loading="reniecLoading"
    >
      <template #after>
        <q-btn
          round
          flat
          icon="search"
          class="text-primary"
          @click="searchDniApi"
        >
          <q-tooltip
            transition-show="flip-right"
            transition-hide="flip-left"
            anchor="top middle"
            self="bottom middle"
            :offset="[10, 10]"
            class="text-body2"
          >
            Consultar en RENIEC
          </q-tooltip>
        </q-btn>
      </template>
    </base-input>
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
      class="col-4"
      :value="false"
    />
    <base-input label="Nombres" name="nombres" class="col-6" type="text" />
    <base-input label="Apellidos" name="apellidos" class="col-6" type="text" />
    <base-select
      name="ocupacion"
      label="Ocupaciones"
      :options="ocupaciones"
      class="col-6"
      with-add-option
      @add-option="dialogOcupacion = true"
    />
    <base-select
      name="estado_civil"
      label="Estado Civil"
      :options="estados_civiles"
      class="col-6"
    />
    <div class="col-12">
      <div class="row justify-end items-center q-col-gutter-x-md">
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

    <!-- DIALOG PARA CREAR OCUPACIONES -->
    <q-dialog v-model="dialogOcupacion">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Nueva Ocupacion</div>
          <div class="text-subtitle2">Los campos con * son obligatorios...</div>
        </q-card-section>
        <q-card-section>
          <ocupacion-form @submit="onOcupationFormSubmit"
        /></q-card-section>
      </q-card>
    </q-dialog>
  </form>
</template>

<script setup lang="ts">
import BaseCheckbox from 'src/core/components/BaseCheckbox.vue';
import BaseInput from 'src/core/components/BaseInput.vue';
import BaseSelect from 'src/core/components/BaseSelect.vue';
import OcupacionForm from '../ocupacion/OcupacionForm.vue';
import { calculateBirthday } from 'src/core/utils';
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { IPersona } from 'src/persona/models';
import {
  useDniApi,
  useInitialPersonaData,
  useOcupationActions,
} from 'src/persona/composables';
import { ref } from 'vue';
import { IOcupacion } from 'src/core/models';

/**VUE CONFIGURATION */
const emit = defineEmits<{
  (e: 'navigate', isOK: boolean): void;
}>();

/** VARIABLES */
const dialogOcupacion = ref(false);
const { ocupaciones, estados_civiles, fetchOcupaciones } =
  useInitialPersonaData();
const { saveOcupacion } = useOcupationActions();
const { fetchDniApi, reniecLoading, reniecResponse } = useDniApi();
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
  nombres: Yup.string().trim().required().label('Nombres'),
  apellidos: Yup.string().trim().required().label('Apellidos'),
  fecha_nacimiento: Yup.date()
    .typeError('Debe ser una fecha valida')
    .required()
    .label('Fecha de Nacimiento'),
  jefe: Yup.boolean().required(),
  ocupacion: Yup.number().required().label('Ocupacion'),
  estado_civil: Yup.number().required().label('Estado Civil'),
});
const { handleSubmit, setFieldValue, values } = useForm<IPersona>({
  validationSchema,
});

/** FUNCIONES */
const onSubmit = handleSubmit(() => {
  emit('navigate', true);
});

const onOcupationFormSubmit = async (values: IOcupacion) => {
  await saveOcupacion(values).then(() => {
    fetchOcupaciones();
    dialogOcupacion.value = false;
  });
};

// CONSULTA API RENIEC
const searchDniApi = async () => {
  await fetchDniApi(values.dni + '');
  setFieldValue('nombres', reniecResponse.value.nombres);
  setFieldValue(
    'apellidos',
    reniecResponse.value
      ? reniecResponse.value.apellidoPaterno.concat(
          ' ',
          reniecResponse.value.apellidoMaterno
        )
      : ''
  );
};

/** COMPUTADAS */
const onFechaChange = (val: string) => {
  setFieldValue('edad', calculateBirthday(val));
};
</script>
