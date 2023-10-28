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
          <base-input name="email" label="Correo" type="text" class="col-12" />
          <base-input
            name="password"
            label="Contraseña"
            type="password"
            class="col-12"
          />
          <div class="col-auto">
            <q-btn label="Iniciar Sesión" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import BaseInput from 'src/core/components/BaseInput.vue';
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { AuthService, ILoginRequest } from './';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
const $q = useQuasar();
const router = useRouter();
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Correo'),
  password: Yup.string().required().min(5).label('Contraseña'),
});
const { handleSubmit } = useForm<ILoginRequest>({
  validationSchema,
});

const onSubmit = handleSubmit(async (values) => {
  const response = await AuthService.login(values);
  if (response.isError()) {
    $q.notify({ type: 'negative', message: 'Error' });
    return;
  }

  await router.push('/');

  // alert(JSON.stringify(values, null, 2));
});
</script>
<style>
.my-card {
  width: 100%;
  max-width: 400px;
  min-width: 400px;
}
</style>
