<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { tableHeaderProps, Columns, Table } from '../table';

import { computed, onMounted, ref, watch } from 'vue';
import { 
  sortColumn, 
  filterExpandColMap,  
  filterToggle, 
  filterMenus, 
  x, 
  y, 
  filterChecked,
  filterCheckedChange,
} from '../store/helper'
const bem  = createNamespace('table-header');
const props = defineProps(tableHeaderProps);
const totalWidth  = ref(0);


const borderStyle = computed(() => {
  return   props.border ? 'border-right: 1px solid #ebeef5; border-left: 1px solid #ebeef5;' : 'none';
});


// const filterCheckedChange = (ckecked: boolean[], col: Columns) => {
//   const key =  col.prop;

//   const filters = <any[]>[];
//   for (let i = 0; i < col.filters.length; i++) {
//     if (ckecked[i]) {
//       filters.push(col.filters[i]);
//     }
//   }
//   const rows = state.value.data;
//  const result  = rows.filter(row => {
//     return filters.some(filter => {
//       console.log(filter.value, row[key], filter.value === row[key]);
//       return filter.value === row[key]
//     })
//   });

// }




</script>

<template>
  <thead :class="[bem.e('thead')]">
      <tr :class="[bem.e('tr')]" >
        <th colspan="1" rowspan="1" 
        :class="[bem.e('table-cell')]" 
        v-for="(item, index) in props.columns" 
        :key="index" 
        :style="borderStyle"
      >
          <div :class="[bem.e('cell')]" >
            {{ item.label }}
            <span :class="[bem.e('caret-wrapper')]" v-if="item.sortable">
              <i :class="[bem.e('sort-caret'), bem.e('asc'),bem.is('ascending',props.sort ?  props.sort[index] === 'ascending' : false)]" @click="sortColumn(item,index,'ascending')"></i>
              <i :class="[bem.e('sort-caret'), bem.e('desc'), bem.is('descending',sort ?  props.sort[index] === 'descending' : false)]" @click="sortColumn(item,index,'descending')"></i>
            </span>
            <span :class="[bem.e('filter-trigger'),bem.is('filter', filterExpandColMap.get(item) || false)]" @click="filterToggle(item)" v-if="item.filters && item.filters.length > 0">
              <i :class="[bem.e('icon')]" ref="filterIcon" @click="filterMenus($event)">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 184l144 144l144-144"></path></svg>
              </i>
              <Teleport to="body">
                <Transition v-if="filterExpandColMap.get(item)">
                  <div  
                    :class="[bem.e('filter-group')]" 
                    :style="{
                      left: `${x}px`,
                      top: `${y}px`,
                    }"
                    
                  >
                    <div v-for="(filler, index) in item.filters" :key="index" :class="bem.e('filter-item')">
                      <input type="checkbox" :value="filler.value" v-model="filterChecked[index]">
                      <span :class="[bem.e('filter-text')]">
                        {{ filler.text }}
                      </span>
                    </div>
                    <div :class="[bem.e('filter-footer')]" >
                      <button @click="filterCheckedChange(filterChecked,item)">确认</button>
                      <button>取消</button>
                    </div>
                  </div>
                </Transition>
              </Teleport>
            </span>
          </div>

          
        </th>
      </tr>
    </thead>
    
</template>

<style lang='scss' scoped>
</style>
