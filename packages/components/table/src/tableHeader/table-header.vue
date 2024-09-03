<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { tableHeaderProps } from '../table';

import { computed, onMounted, ref } from 'vue';
import { sortColumn } from '../store/helper'
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
          </div>
        </th>
      </tr>
    </thead>
</template>

<style lang='scss' scoped>
</style>
