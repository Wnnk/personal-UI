<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { onMounted, provide, ref} from 'vue';
import { tableProps } from './table'
import tableHeader from './tableHeader.vue';
import tableBody from './tableBody.vue';
import tableFooter from './tableFooter.vue';


const columns = ref<any>([])
const getColumns = (column: any) => {
  columns.value.push(column);
}
provide('getColumns', getColumns);
const bem = createNamespace('table');
const props = defineProps(tableProps)

defineOptions({
  name:'z-table',
})

const tableInnerRef = ref();
const innerWidth = ref(0);

const tableRenderData = ref<any>([]);
tableRenderData.value = props.data;

/** 
 * @description: 更新排序
 * @param {string} type 排序类型
 * @param {string} prop 排序属性
**/
const updateColumn = (type: string, prop: string) => {

  if (type === 'asc') {
    tableRenderData.value.sort((a:any, b:any) => {
      /* 字符串比较 */
      if (typeof a[prop] ==='string' && typeof b[prop] ==='string') {
        return a[prop].localeCompare(b[prop]);
      }
      /* NaN情况处理 */
      if (isNaN(a[prop]) || isNaN(b[prop])) {
       if(isNaN(a[prop]) && isNaN(b[prop])) return 0;
        if(isNaN(a[prop])) return -1;
        if(isNaN(b[prop])) return 1;
      }
      return a[prop] - b[prop];
    })
  } else if (type === 'desc'){
    tableRenderData.value.sort((a:any, b:any) => {
      if (typeof a[prop] ==='string' && typeof b[prop] ==='string') {
        return b[prop].localeCompare(a[prop]);
      }
       /* Nan情况处理 */
      if (isNaN(a[prop]) || isNaN(b[prop])) {
        if(isNaN(a[prop]) && isNaN(b[prop])) return 0;
        if(isNaN(a[prop])) return 1;
        if(isNaN(b[prop])) return -1;
      }

    })
   
  }
  return;
}


/* 多选 */
const isMultiple = ref(false);
const selectionRows = ref<number[]>([]);
isMultiple.value = props.multiple;
/** 
 *  @description: 选中或取消选中某一行
 *  @param {number} index 行索引
 *  @param {row} row 行数据
 **/

const toggleSelection = (index: number, row: any) => {
  if (isMultiple.value) {
    /* 多选 */
    if (!selectionRows.value.includes(index)) {
      /* 点击未选中行 */
      selectionRows.value.push(index);
    } else {
      /* 点击已选中行 */
      selectionRows.value.splice(selectionRows.value.indexOf(index), 1);
    }
  } else {
    /* 单选 */
    if (!selectionRows.value.includes(index)) {
      /* 点击未选中行 */
      selectionRows.value = [index];
    } else {
      /* 点击已选中行 */
      selectionRows.value = [];
    }
    
  }
}

onMounted(() => {

});


</script>

<template>
  <div :class="[bem.b()]" >
    <div :class="[bem.e('table-fit')]">
      <div :class="[bem.e('table-inner')]" :style="{ height: `${props.height}px`}">
        <tableHeader :border="props.border" :columns = "columns"  @toggle-sort="updateColumn">
          <slot ></slot>
        </tableHeader>
        <tableBody 
          :data="tableRenderData" 
          :border="props.border" 
          :columns = "columns" 
          @toggle-selection="toggleSelection"
          :selection-rows="selectionRows"
        >
        </tableBody >
      </div>
    </div>

  </div>
</template>

<style lang='scss' scoped>
</style>