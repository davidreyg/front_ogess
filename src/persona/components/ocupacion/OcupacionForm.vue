<template>
  <form class="row q-col-gutter-sm items-center justify-end" @submit="onSubmit">
    <base-input label="Nombre" name="ocup_nombre" class="col-12" type="text" />
    <base-input
      label="Descripcion"
      name="ocup_descripcion"
      class="col-12"
      type="text"
    />
    <div class="col-auto q-mt-md">
      <q-btn color="primary" icon="save" label="Guardar" type="submit" />
    </div>
  </form>
</template>

<script setup lang="ts">
import BaseInput from 'src/core/components/BaseInput.vue';
import { IOcupacion } from 'src/core/models';
import { useForm } from 'vee-validate';
import * as Yup from 'yup';

const emit = defineEmits<{
  (e: 'submit', values: IOcupacion): void;
}>();

const validationSchema = Yup.object().shape({
  ocup_nombre: Yup.string().required().label('Nombre'),
  ocup_descripcion: Yup.string().nullable().label('Descripcion'),
});

const { handleSubmit } = useForm<IOcupacion>({
  validationSchema,
});
const onSubmit = handleSubmit((values) => {
  emit('submit', values);
});
</script>
