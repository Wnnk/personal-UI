<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { tableFooterProps, Columns, Table } from '../table';
import { ref, defineProps } from 'vue';

const bem = createNamespace('table-footer');
const props = defineProps(tableFooterProps);


const isNumber = (value:number|string) => {
  return !isNaN(parseFloat(value as string)) && isFinite(value as number);
}

const initSums = (columns:Columns[],data:Table[]) => {

  const sums:{[key:string]:number} = {};
  let colspan = 0;
  let hasNumberCol = false;
  columns.forEach(column => {
    data.forEach(row => {
      if (isNumber(row[column.prop])) {
        sums[column.prop] = (sums[column.prop] || 0) + parseFloat(row[column.prop] as string);
        hasNumberCol = true;
      }
    })
    if (!hasNumberCol) {
      colspan++;
    }
  });
  return { colspan, sums };
}

const { colspan , sums } = initSums(props.store.columns,props.store.data);
console.log(sums);
</script>

<template>
  <tfoot >
    <tr>
      <td :colspan="colspan" rowspan="1" :class="[bem.e('table-cell')]" >
        <div :class="[bem.e('cell')]" v-if="colspan > 0">
          Sum
        </div>
      </td>
      <template v-for="(col,index) in props.store.columns" :key="col.prop">
       <td :colspan="1" rowspan="1" 
        :class="[bem.e('table-cell')]" 
        v-if="index >= colspan"  
        >
        <div :class="[bem.e('cell')]" >
          {{ sums[col.prop] }}
        </div>
        </td>
      </template>
      
    </tr>
  </tfoot>
</template>

<style lang='scss' scoped>
</style>
