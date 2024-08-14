<script setup lang='ts'>
import { columnEmits, columnProps } from './tableColumn';
import tableHeader from '../../table/src/tableHeader.vue';
import tableBody from '../../table/src/tableBody.vue';
import { useAttrs, ref, onMounted, nextTick } from 'vue';
import { createNamespace } from '@commonUI/utils/create';

const bem = createNamespace('table-column');
const emits = defineEmits(columnEmits);
const props = defineProps(columnProps);
const attrs = useAttrs();
defineOptions({
  name: 'z-table-column',
})


</script>

<template>
 <col ></col>
</template>

<style lang='scss' scoped>
</style>