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
          <q-stepper ref="stepper" v-model="step" pper color="primary" animated>
            <q-step :name="1" title="Persona" icon="people" :done="step > 1">
              <persona-form-create @submit="next"></persona-form-create>
              <!-- <persona-form-table class="q-mt-lg"></persona-form-table> -->
            </q-step>

            <q-step
              :name="2"
              title="Familia"
              icon="create_new_folder"
              :done="step > 2"
            >
              An ad group contains one or more ads which target a shared set of
              keywords.
            </q-step>

            <q-step :name="3" title="Riesgo" icon="assignment" :done="step > 3">
              This step won't show up because it is disabled.
            </q-step>

            <q-step :name="4" title="Dimension" icon="add_comment">
              Try out different ad text to see what brings in the most
              customers, and learn how to enhance your ads using features like
              ad extensions. If you run into any problems with your ads, find
              out how to tell if they're running and how to resolve approval
              issues.
            </q-step>
          </q-stepper>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PersonaFormCreate from '../components/PersonaFormCreate.vue';
// import PersonaFormTable from '../components/PersonaFormTable.vue';
import DatosPersonales from '../components/DatosPersonales.vue';
import { QStepper } from 'quasar';
const step = ref(1);
const stepper = ref<QStepper | null>(null);

const next = (step: boolean) => {
  console.log(stepper.value, step);
  step ? stepper.value?.next() : console.log('error');
};
</script>
