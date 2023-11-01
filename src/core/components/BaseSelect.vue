<template>
  <q-select
    ref="qselect"
    v-model="inputValue"
    :options="filteredOptions"
    :label="label"
    :error="!!errorMessage"
    bottom-slots
    outlined
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    emit-value
    map-options
    @filter="filterFn"
    @blur="handleBlur"
    @update:model-value="handleChange"
  >
    <template #error>
      {{ errorMessage }}
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          No hay resultados...
        </q-item-section>
      </q-item>
    </template>
    <template v-if="withAddOption" #after-options>
      <q-item clickable class="bg-red-1" @click="emitAddOption">
        <q-item-section class="text-bold text-italic">
          Nuevo...
        </q-item-section>
        <q-item-section side>
          <q-icon name="add" />
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script setup lang="ts">
import { QSelect } from 'quasar';
import { IQSelectOptions } from 'src/core/utils';
import { useField } from 'vee-validate';
import { ref, toRef, watch } from 'vue';

/** VUE CONFIGURATION */
const props = defineProps({
  value: {
    type: [String, Number],
    default: undefined,
  },
  options: {
    type: Array<IQSelectOptions>,
    default: [],
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  prefixIcon: {
    type: String,
    default: undefined,
  },
  withAddOption: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<{
  (e: 'addOption'): void;
}>();

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');
const originalOptions = toRef(props, 'options');
const filteredOptions = ref(props.options);
const qselect = ref<QSelect | null>(null);
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
});

const emitAddOption = () => {
  qselect.value?.hidePopup();
  emit('addOption');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filterFn = (val: string, update: any) => {
  update(() => {
    const needle = val.toLowerCase();
    filteredOptions.value = originalOptions.value.filter(
      ({ label }) => label.toLowerCase().indexOf(needle) > -1
    );
  });
};
/** COMPUTEDS Y WATCHERS */
watch(props, (newProps) => {
  filteredOptions.value = newProps.options;
});
</script>
