<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { tableBodyProps } from './tableBody'
import { onMounted, onUnmounted, ref } from 'vue';

const bem = createNamespace('table-body');
const props = defineProps(tableBodyProps);
const tableBodyRef = ref<HTMLDivElement>();
const tableRef = ref<HTMLTableElement>();


const initWidth = () => {
  if (tableBodyRef.value && tableRef.value) {
    requestAnimationFrame(() => {
      (tableRef.value as HTMLDivElement).style.width = `${(tableBodyRef.value as HTMLDivElement).offsetWidth}px`;
    });
  }
}
onMounted (() => {
  window.addEventListener('resize', initWidth);
  initWidth();
});
onUnmounted(() => {
  window.removeEventListener('resize', initWidth);
});
</script>

<template>
  <div :class="[bem.b()]" ref="tableBodyRef" >
    <div :class="[bem.e('scrollbar')]">
      <table :class="[bem.e('body') ]"  ref="tableRef">
      <colgroup>
        <col v-for="col in props.columns" :key="col.label" :style="{width: `${col.width}px`}">
      </colgroup>
      <tbody>
        <tr :class="[bem.e('row')]" v-for="(item, index) in props.data" :key="index" >
          <td :class="[bem.e('table-cell'), bem.is('border', props.border)]" v-for="prop in item" :key="prop">
            <div :class="[bem.e('cell')]">
              {{ prop }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    
    
  </div>
</template>

<style lang='scss' scoped>
</style>