<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-expansion-item
          class="bg-blue-4 shadow-12"
          expand-separator
          icon="perm_identity"
          label="Datos Personales"
          caption="Los campos con * son obligatorios"
        >
          <q-card class="my-card shadow-12">
            <q-card-section>
              <div class="q-pa-md">
                <q-form @submit="onSubmit" @reset="onReset">
                  <div class="row q-col-gutter-sm">
                    <q-input
                      type="text"
                      label="Encuestador"
                      readonly
                      outlined
                      class="col-7"
                    />
                    <q-input
                      type="text"
                      label="Fecha"
                      readonly
                      outlined
                      class="col-5"
                    />
                    <q-input
                      type="text"
                      label="Unidad Ejecutora"
                      readonly
                      outlined
                      class="col-3"
                    />
                    <q-input
                      type="text"
                      label="Red Salud"
                      readonly
                      outlined
                      class="col-3"
                    />
                    <q-input
                      type="text"
                      label="Micro Redes"
                      readonly
                      outlined
                      class="col-3"
                    />
                    <q-input
                      type="text"
                      label="Establecimiento de Salud"
                      readonly
                      outlined
                      class="col-3"
                    />
                    <div class="col-3">
                      <q-btn
                        color="primary"
                        icon="check"
                        label="OK"
                        class="col-3"
                        @click="onClick"
                      />
                    </div>
                  </div>
                </q-form>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
      <!-- STEPPER -->
      <div class="col-12 q-mt-md">
        <q-expansion-item
          expand-separator
          icon="perm_identity"
          label="Account settings"
          caption="John Doe"
          class="bg-blue-4 shadow-12"
        >
          <q-stepper ref="stepper" v-model="step" color="primary" animated>
            <q-step :name="1" title="Persona" icon="settings" :done="step > 1">
              <persona-form-create></persona-form-create>
              <persona-form-table class="q-mt-lg"></persona-form-table>
            </q-step>

            <q-step
              :name="2"
              title="Familia"
              caption="Optional"
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

            <template #navigation>
              <q-stepper-navigation>
                <q-btn
                  color="primary"
                  :label="step === 4 ? 'Finish' : 'Continue'"
                  @click="$refs.stepper.next()"
                />
                <q-btn
                  v-if="step > 1"
                  flat
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                  @click="$refs.stepper.previous()"
                />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import PersonaFormCreate from '../components/PersonaFormCreate.vue';
import PersonaFormTable from '../components/PersonaFormTable.vue';
export default {
  components: { PersonaFormCreate, PersonaFormTable },
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);

    return {
      step: ref(1),
      name,
      age,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first',
          });
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
          });
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },
      onClick() {
        $q.notify({ message: 'Correcto', type: 'positive' });
      },
    };
  },
};
</script>
