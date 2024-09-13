<template>
  <div :class="formItemClassNames">
    <form-label-wrap>
      <slot></slot>
    </form-label-wrap>
    
  </div>
</template>

<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import {  formItemProps, formItemEmits } from './formItem'
import { computed } from 'vue';
import formLabelWrap from './form-label-wrap';
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
</script>