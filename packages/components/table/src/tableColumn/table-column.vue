<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { tableColumnProps } from './tableColumn';
import { SetColumns } from '../store/helper';
const bem = createNamespace('table-column');
const props = defineProps(tableColumnProps);
defineOptions({
  name: 'z-table-column',
  inheritAttrs: false,
})
SetColumns(props);
</script>

<template>
  <div>
    <!-- <slot></slot> -->
  </div>
</template>

<style lang='scss' scoped>
</style>