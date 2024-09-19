<template>
  <div :class="formItemClassNames">
    <form-label-wrap
      :is-auto-width="labelStyle.width === 'auto'"
    >
      <label :class="bem.e('label')" :style="labelStyle">{{ props.label }}</label>
      <div :class="[bem.e('content')]" :style="contentStyle">
        <slot></slot>
      </div>
    </form-label-wrap>
    
  </div>
</template>

<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { addUnit } from "@commonUI/utils/style";
import {  formItemProps, formItemEmits } from './formItem'
import { computed, inject, reactive, ref, useSlots, toRefs, provide } from 'vue';
import formLabelWrap from './form-label-wrap';
import { formContextKey, formItemContextKey } from './constants';

const bem  = createNamespace('form-item');
const props = defineProps(formItemProps);
const slots = useSlots();
const parentFormItemContext = inject(formItemContextKey, undefined)
defineOptions({
  name: 'z-form-item',
});

const emits = defineEmits(formItemEmits);
const formContext = inject(formContextKey, undefined)
const formItemClassNames = computed(() => {
  return [
    bem.b(),
    bem.m(formContext.size),
    bem.m(formContext.labelPosition),
    formContext.inline && bem.m('inline'),
  ]
});


const labelPosition = computed(
  () => formContext?.labelPosition || props.labelPosition 
);

const labelStyle = computed(() => {

  if (labelPosition.value as any === 'top') {
    return {
     
    }
  }
  const labelWidth = addUnit(props.labelWidth || formContext?.labelWidth || '')
  if (labelWidth) return { width: labelWidth }
  return {}
});


const isNested = !!parentFormItemContext
const contentStyle = computed(() => {
  if (labelPosition.value === 'top' || formContext?.inline) {
    return {}
  }
  if (!props.label && !props.labelWidth && isNested) {
    return {}
  }
  const labelWidth = addUnit(props.labelWidth || formContext?.labelWidth || '')
  if (!props.label && !slots.label) {
    return { marginLeft: labelWidth }
  }
  return {}
});

const hasLabel = computed<boolean>(() => {
  return !!(props.label || slots.label)
});

const context = reactive({
  ...toRefs(props),
  hasLabel,
  size: formContext?.size,
});

provide(formItemContextKey, context);

</script>