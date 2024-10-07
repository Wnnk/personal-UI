<script setup lang="ts">
import { createNamespace } from "@commonUI/utils/create";
import { formProps, formEmits } from "./form";
import {ref,reactive, computed, toRefs, provide} from "vue"
import { formContextKey } from "./constants";
import { useFormLabelWidth } from './utils'

const bem  = createNamespace("form");
const props = defineProps(formProps);
const emit = defineEmits(formEmits);

defineOptions({
  name: 'z-form',
})

/** 
 * @description: 表单样式
 * 
  */
const formClass = computed(() => {
  return [
    bem.b(),
    props.inline && bem.e("inline"),
    props.labelPosition && bem.e(`label-${props.labelPosition}`),
  ]
});

provide(
  formContextKey,
  reactive({
    ...toRefs(props),
    emit,

    ...useFormLabelWidth(),
  })
)

</script>
<template>
  <div :class="formClass">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>




</style>
