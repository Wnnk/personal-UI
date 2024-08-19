<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { tableHeaderProps, SortType, tableHeaderEmits } from './tableHeader'
import { onMounted, onUnmounted, ref } from 'vue';



const bem = createNamespace('table-header');
const props = defineProps(tableHeaderProps);
const emits = defineEmits(tableHeaderEmits);

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


const sortType = ref<SortType>('');
/** 
 * @description: 切换排序类型
 * @param {SortType} type 排序类型
 * @param {any} prop 排序属性
  */
const changeSortType = (type: SortType, prop: any) => {
  if (type === sortType.value) return;
  sortType.value = type;
  emits('toggleSort',  type, prop );
}
</script>

<template>
  <div :class="[bem.b()]" ref="tableHeaderRef">
    <table :class="[bem.e('header')]" ref="tableRef">
      <colgroup>
        <slot ></slot>
      </colgroup>
      <thead :class="[bem.e('thead')]">
        <tr :class="[bem.e('tr')]">
          <th :class="[bem.e('table-cell'), bem.is('border', props.border)]" v-for="column in props.columns" :key="column.prop" >
            <div :class="[bem.e('cell')]">
              {{ column.label }}
              <span class="caret-wrapper" v-if="column.sort">
                <i :class="['asc', sortType === 'asc'? 'is-asc' : '']" @click="changeSortType('asc', column.prop)"></i>
                <i :class="['desc', sortType === 'desc'? 'is-desc' : '']" @click="changeSortType('desc', column.prop)"></i>
              </span>
            </div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
 
</template>

<style lang='scss' scoped>
</style>