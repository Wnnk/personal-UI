<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { tableHeaderProps } from '../table';

import { computed, onMounted, ref } from 'vue';
import { sortColumn, filterExpandColMap,  filterToggle} from '../store/helper'
const bem  = createNamespace('table-header');
const props = defineProps(tableHeaderProps);
const totalWidth  = ref(0);


const borderStyle = computed(() => {
  return   props.border ? 'border-right: 1px solid #ebeef5; border-left: 1px solid #ebeef5;' : 'none';
});



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
            <span :class="[bem.e('filter-trigger'),bem.is('filter', filterExpandColMap.get(item) || false)]" @click="filterToggle(item)">
              <i :class="[bem.e('icon')]">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M112 184l144 144l144-144"></path></svg>
              </i>
              <div v-show="filterExpandColMap.get(item)" :class="[bem.e('filter-group')]">
                <label for="">
                  {{ item.prop}}
                </label>
              </div>
            </span>
          </div>
        </th>
      </tr>
    </thead>
</template>

<style lang='scss' scoped>
</style>
