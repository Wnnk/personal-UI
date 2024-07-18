<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { itemStatusProps } from './dragForm';

const bem = createNamespace('item-status');
const props = defineProps(itemStatusProps);



</script>

<template>
  <div :class="[bem.b()]">
    {{ index }}
  </div>
</template>

<style lang='scss' scoped>
</style>