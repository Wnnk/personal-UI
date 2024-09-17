<template>
  <div :class="formItemClassNames">
    <form-label-wrap
      :is-auto-width="labelStyle.width === 'auto'"
    >

      <div :class="[bem.e('content')]">
        <slot></slot>
      </div>
    </form-label-wrap>
    
  </div>
</template>

<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { addUnit } from "@commonUI/utils/style";
import {  formItemProps, formItemEmits } from './formItem'
import { computed, inject } from 'vue';
import formLabelWrap from './form-label-wrap';
import { formContextKey } from './constants';

const bem  = createNamespace('form-item');
const props = defineProps(formItemProps);
defineOptions({
  name: 'z-form-item',
})
const emits = defineEmits(formItemEmits);

const formItemClassNames = computed(() => {
  return [
    bem.b(),

  ]
});
const formContext = inject(formContextKey, undefined)

const labelPosition = computed(
  () => props.labelPosition || formContext?.labelPosition 
)

const labelStyle = computed(() => {
  console.log(labelPosition.value)
  if (labelPosition.value as any === 'top') {
    return {}
  }
  const labelWidth = addUnit(props.labelWidth || formContext?.labelWidth || '')
  if (labelWidth) return { width: labelWidth }
  return {}
})

</script>