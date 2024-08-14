<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import {tableHeaderProps} from './tableHeader'
import { onMounted, onUnmounted, ref } from 'vue';
const bem = createNamespace('table-header');
const props = defineProps(tableHeaderProps)
const columns = [
  {
    label: 'Name',
    key: 'name',
    width: 150,
    align: 'left' as const,
    sortable: true,
  },
  {
    label: 'Age',
    key: 'age',
    width: 100,
    align: 'center' as const,
    sortable: true,
  },
  {
    label: 'Address',
    key: 'address',
    width: 200,
    align: 'right' as const,
    sortable: true,
  },
]

const tableRef = ref<HTMLTableElement>();
const tableHeaderRef = ref<HTMLDivElement>();

const initWidth = () => {
  if (tableRef.value && tableHeaderRef.value) {
    requestAnimationFrame(() => {
      (tableRef.value as HTMLDivElement).style.width = `${(tableHeaderRef.value as HTMLDivElement).offsetWidth}px`;
    })
  }
}
onMounted(() => {
  window.addEventListener('resize', initWidth);
  initWidth()
})
onUnmounted(() => {
  window.removeEventListener('resize', initWidth);
})


</script>

<template>
  <div :class="[bem.b()]" ref="tableHeaderRef">
    <table :class="[bem.e('header')]" ref="tableRef">
      <colgroup>
        <slot></slot>
      </colgroup>
      <thead :class="[bem.e('thead')]">
        <tr :class="[bem.e('tr')]">
          <th :class="[bem.e('table-cell')]" v-for="column in columns" :key="column.key" >
            <div :class="[bem.e('cell')]">{{ column.label }}</div>
          </th>
        </tr>
      </thead>
    </table>
    
  </div>
 
</template>

<style lang='scss' scoped>
</style>