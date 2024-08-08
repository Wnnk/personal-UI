<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { OptionProps, OptionEmits } from './option';
import { defineProps, ref } from 'vue';
const bem = createNamespace('option')
defineOptions({
  name:'z-option'
})
const props = defineProps(OptionProps);
const selectedValue = ref();
const emits = defineEmits(OptionEmits)
/** 
 * @description: 触发选择选项的事件
 * 
  */
const handleChoosedOption = (value:any) => {
  selectedValue.value = value;
  emits('update:modelValue', value)
}
</script>

<template>
  <div :class="[bem.b(),bem.is('disabled', props.disabled)]" @click="handleChoosedOption(props.value)">
    <span :class="[bem.e('optionItem'),bem.is('disabled', props.disabled)]">{{props.label}}</span>
  </div>
</template>

<style lang='scss' scoped>
</style>