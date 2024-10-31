<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { luckyGridProps } from './luckygrid';

const bem = createNamespace('luckygrid');
const props = defineProps(luckyGridProps);

defineOptions({
  name: 'z-luckygrid'
})
</script>

<template>
  <div>
    九宫格组件
  </div>
</template>

<style lang='scss' scoped>
</style>