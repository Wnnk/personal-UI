<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { componentProps } from '../dragForm'


const bem = createNamespace('selectDisplay');
const props = defineProps(componentProps);
</script>

<template>
  <select :class="bem.b()">
    <option :value="item.value" v-for="item in props.dynamicComponent?.options" :key="item.value">
      {{ item.label }}
    </option>
  </select>
</template>

<style lang='scss' scoped>
</style>