<template>
  <form :class="classNames">
    <slot></slot>
  </form>
</template>

<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { formProps, formEmits } from './form'
import { computed, provide, reactive, toRef, toRefs} from 'vue';
import { formContextKey, formItemContextKey } from "./constants";
  
const props = defineProps(formProps);
const emits = defineEmits(formEmits);
const bem = createNamespace('form');
// const COMPONENT_NAME = 'z-form';
defineOptions({
  name: 'z-form',
})

const classNames = computed(() => {
  const {inline, labelPosition, size } = props;
  console.log(labelPosition)
  return [
    bem.b(),
    bem.m(`label-${labelPosition}`),
    inline && bem.m('inline'),
    size && bem.m(size),
  ]
});



provide(
  formContextKey,
  reactive({
    ...toRefs(props),
  })
)
</script>