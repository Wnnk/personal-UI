<script setup lang='ts'>
import { columnEmits, columnProps } from './tableColumn';
import { useAttrs, ref, onMounted, inject } from 'vue';
import { createNamespace } from '@commonUI/utils/create';
const bem = createNamespace('table-column');
const emits = defineEmits(columnEmits);
const props = defineProps(columnProps);

  const getColumns = inject('getColumns');
  (getColumns as Function)({...props})

defineOptions({
  name: 'z-table-column',
  inheritAttrs: false,
})



</script>

<template>
 <col :width="props.width" ></col>
</template>

<style lang='scss' scoped>
</style>