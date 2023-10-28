<template>
  <q-input
    v-model="inputValue"
    :type="type"
    :label="label"
    :error="!!errorMessage"
    bottom-slots
    :hide-bottom-space="!errorMessage"
    outlined
    @blur="handleBlur"
  >
    <template #error>
      {{ errorMessage }}
    </template>
    <template v-if="!!prefixIcon" #prepend>
      <q-icon :name="prefixIcon" />
    </template>
  </q-input>
</template>
<script setup lang="ts">
import { PropType, toRef } from 'vue';
import { useField } from 'vee-validate';
import { QInputProps } from 'quasar';

const props = defineProps({
  type: {
    type: String as PropType<QInputProps['type']>,
    required: true,
  },
  value: {
    type: String,
    default: undefined,
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
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>
