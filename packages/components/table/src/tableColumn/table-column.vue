<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { tableColumnProps } from './tableColumn';
import { SetColumns } from '../store/helper';
import { useSlots } from 'vue';
const bem = createNamespace('table-column');
const props = defineProps(tableColumnProps);
defineOptions({
  name: 'z-table-column',
  inheritAttrs: false,
})
SetColumns(props);

</script>

<template>
  <div>4
    {{ useSlots()['append'] }}
  </div>
</template>

<style lang='scss' scoped>
</style>