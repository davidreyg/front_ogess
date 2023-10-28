<template>
  <div class="bg-red-3 fullscreen">
    <q-card class="my-card fixed-center">
      <q-card-section>
        <div class="text-h6 text-center">Bienvenido :)</div>
        <div class="text-subtitle2 text-center">by John Doe</div>
      </q-card-section>
      <q-card-section>
        <q-form
          class="row q-col-gutter-md items-center justify-center"
          @submit="onSubmit"
        >
          <base-input
            name="email"
            label="Correo"
            type="text"
            class="col-12"
            prefix-icon="account_circle"
          />
          <base-input
            name="password"
            label="Contraseña"
            type="password"
            class="col-12"
            prefix-icon="lock"
          />
          <div class="col-auto">
            <q-btn
              label="Iniciar Sesión"
              type="submit"
              color="primary"
              :loading="isSubmitting"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-dialog v-model="dialog" persistent>
      <reset-password-form
        style="width: 400px"
        @submit="onResetPassword"
      ></reset-password-form>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import BaseInput from 'src/core/components/BaseInput.vue';
import ResetPasswordForm from '../components/ResetPasswordForm.vue';
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { AuthService, ILoginRequest, IResetPasswordRequest } from 'src/auth';
import { NotifyUtils } from 'src/core/utils';

const router = useRouter();
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Correo'),
  password: Yup.string().required().min(5).label('Contraseña'),
});

const { handleSubmit, resetForm, isSubmitting } = useForm<ILoginRequest>({
  validationSchema,
});

const dialog = ref(false);

const onSubmit = handleSubmit(
  async (values) => {
    console.log(values);
    return await AuthService.login(values).then(async (response) => {
      if (response.isError()) {
        NotifyUtils.error({ message: 'Error' });
        return;
      }
      if (values.password.toLowerCase() === 'ogess2023') {
        dialog.value = !dialog.value;
        return;
      }
      await router.push('/');
    });

    // alert(JSON.stringify(values, null, 2));
  },
  (f) => console.log(f)
);

const onResetPassword = async (values: IResetPasswordRequest) => {
  const response = await AuthService.resetPassword(values);
  if (response.isError()) {
    NotifyUtils.error({ message: 'Error' });
    return;
  }
  dialog.value = !dialog.value;
  resetForm();
  NotifyUtils.success({ message: 'Contraseña actualizada correctamente' });
};
</script>
<style>
.my-card {
  width: 100%;
  max-width: 400px;
  min-width: 400px;
}
</style>
