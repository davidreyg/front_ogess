<template>
  <q-card>
    <q-card-section>
      <div class="text-h5 text-center">Actualizar Contraseña</div>
      <div class="text-subtitle text-italic text-center">
        Por seguridad debe cambiar su contraseña...
      </div>
    </q-card-section>
    <q-card-section>
      <q-form
        class="row q-col-gutter-md items-center justify-end"
        @submit="onSubmit"
      >
        <base-input
          name="password"
          label="Contraseña"
          type="text"
          class="col-12"
        />
        <base-input
          name="password_confirmation"
          label="Confirmar Contraseña"
          type="password"
          class="col-12"
        />
        <div class="col-auto">
          <q-btn label="Guardar" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import * as Yup from 'yup';
import BaseInput from 'src/core/components/BaseInput.vue';
import { useForm } from 'vee-validate';
import { IResetPasswordRequest } from 'src/auth';
const emit = defineEmits<{
  (e: 'submit', data: IResetPasswordRequest): void;
}>();
const validationSchema = Yup.object().shape({
  password: Yup.string().min(8).required().label('Contraseña'),
  password_confirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .label('Confirmar contraseña'),
});
const { handleSubmit } = useForm<IResetPasswordRequest>({
  validationSchema,
});

const onSubmit = handleSubmit(
  async (values) => {
    emit('submit', values);
  },
  (f) => console.log(f)
);
</script>
