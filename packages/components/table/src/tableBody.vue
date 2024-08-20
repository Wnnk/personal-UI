<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { tableBodyProps, tableBodyEmits } from './tableBody'
import { onMounted, onUnmounted, ref } from 'vue';

const bem = createNamespace('table-body');
const props = defineProps(tableBodyProps);
const emits = defineEmits(tableBodyEmits);



/**
 *  @description:选中行 
 *  @param {number} index 行索引 
 *  @param {row} 行数据 
 * 
**/
const selectRow = (index: number, row: any) => {
  emits('toggleSelection',index, row)
}




/** 
 * @description: 初始化宽度
 * 
**/
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
  // window.addEventListener('resize', initWidth);
  // initWidth();
});
onUnmounted(() => {
  // window.removeEventListener('resize', initWidth);
});

</script>

<template>
  <div :class="[bem.b()]" ref="tableBodyRef" >
    <div :class="[bem.e('scrollbar')]">
      <table :class="[bem.e('body') ]"  ref="tableRef">
      <colgroup>
        <col v-for="col in props.columns" :key="col.label" :style="{width: `${col.width}px`}">
      </colgroup>
      <tbody :class="[bem.e('body-wrapper')]">
        <tr :class="[bem.e('row'), bem.is('selected', props.selectionRows!.includes(index))]" v-for="(row, index) in props.data" :key="index" @click="selectRow(index,row)">
          <td :class="[bem.e('table-cell'), bem.is('border', props.border)]" v-for="col in props.columns" rowspan="1" colspan="1">
            <div :class="[bem.e('cell')]">
              {{ (row as any)[col.prop] }}
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