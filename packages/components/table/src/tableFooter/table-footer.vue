<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { tableFooterProps, Columns, Table } from '../table';
import { ref, defineProps, watch } from 'vue';

const bem = createNamespace('table-footer');
const props = defineProps(tableFooterProps);


const isNumber = (value:number|string) => {
  return !isNaN(parseFloat(value as string)) && isFinite(value as number);
}
const colspan = ref(0);
const sums = ref<{[key:string]:number}>({});

const initSums = (columns:Columns[],data:Table[]) => {
  sums.value = {};
  colspan.value = 0;
  let hasNumberCol = false;
  columns.forEach(column => {
    data.forEach(row => {
      if (isNumber(row[column.prop])) {
        sums.value[column.prop] = (sums.value[column.prop] || 0) + parseFloat(row[column.prop] as string);
        hasNumberCol = true;
      }
    })
    if (!hasNumberCol) {
      colspan.value++;
    }
  });
  return;
}

initSums(props.columns,props.data);

watch(props, () => {
  console.log('watch');
  initSums(props.columns,props.data);
},
{deep: true}
);


</script>

<template>
  <tfoot >
    <tr>
      <td :colspan="colspan" rowspan="1" :class="[bem.e('table-cell')]" >
        <div :class="[bem.e('cell')]" v-if="colspan > 0">
          Sum
        </div>
      </td>
      <template v-for="(col,index) in props.columns" :key="col.prop">
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
