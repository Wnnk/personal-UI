<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import {selectProps} from './select'
import { ref } from 'vue'
const bem = createNamespace('select');
const props = defineProps(selectProps);
defineOptions({
  name:'z-select',
});
const currentValue = ref('');
const isFocus = ref(false);
const changeSelect = () => {
  isFocus.value =!isFocus.value;
  console.log('change select');
}
</script>

<template>
  <div :class="[bem.b(), bem.is('is-focus', isFocus)]" @click="changeSelect">
    <z-input :class="[bem.e('input')]">{{ currentValue === '' ? props.placeholder : currentValue }}</z-input>
    <span :class="[bem.e('dropdown'), bem.is('is-focus', isFocus)]">👇</span>
  </div>
</template>

<style lang='scss' scoped>
</style>