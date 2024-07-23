<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { componentProps } from '../dragForm';

const bem = createNamespace('dateDisplay');
const props = defineProps(componentProps);
</script>

<template>
  <input type="date" :value="props.dynamicComponent?.value" :min="props.dynamicComponent?.min" :max="props.dynamicComponent?.max" :class="bem.b()" />
</template>

<style lang='scss' scoped>
</style>