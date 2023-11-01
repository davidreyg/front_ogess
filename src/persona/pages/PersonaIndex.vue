<template>
  <q-page padding>
    <div class="row q-col-gutter-y-md">
      <div class="col-12">
        <q-expansion-item
          group="1"
          class="shadow-12"
          header-class="bg-primary text-h6"
          icon="perm_identity"
          expand-icon-class="text-black"
          label="Datos del Encuestador"
        >
          <datos-personales />
        </q-expansion-item>
      </div>
      <!-- STEPPER -->
      <div class="col-12">
        <q-expansion-item
          group="1"
          icon="library_books"
          label="Censo - 0001"
          header-class="text-h6"
          class="bg-primary shadow-12"
          expand-icon-class="text-black"
        >
          <!-- TODO: Uso de keepalive? -->
          <q-stepper
            ref="stepper"
            v-model="step"
            color="primary"
            animated
            keep-alive
          >
            <q-step :name="1" title="Persona" icon="people" :done="step > 1">
              <step-persona @navigate="navigateStep" />
            </q-step>
            <q-step
              :name="2"
              title="Familia"
              icon="create_new_folder"
              :done="step > 2"
            >
              <step-familia @navigate="navigateStep" />
            </q-step>
          </q-stepper>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StepPersona from '../components/steps/StepPersona.vue';
import StepFamilia from '../components/steps/StepFamilia.vue';
import DatosPersonales from '../components/DatosPersonales.vue';

const step = ref(1);

const navigateStep = (next: boolean) => {
  if (next) {
    // TODO: Falta hacer cuando finalice los steps..

    step.value = step.value + 1;
    console.log(step.value);
    return;
  } else {
    step.value = step.value - 1;
    return;
  }
};
</script>
