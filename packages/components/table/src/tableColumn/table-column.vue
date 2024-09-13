<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { tableColumnProps } from './tableColumn';
import { SetColumns,setSlots } from '../store/helper';
import { useSlots, h,defineComponent,getCurrentInstance, onMounted } from 'vue';
const bem = createNamespace('table-column');
const props = defineProps(tableColumnProps);
defineOptions({
  name: 'z-table-column',
  inheritAttrs: false,
})
SetColumns(props);



onMounted(() => {

})
</script>

<template>

  
</template>

<style lang='scss' scoped>
</style>