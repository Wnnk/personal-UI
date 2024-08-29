<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { tableHeaderProps } from '../table';
import { createStore } from '../store/helper'
const bem  = createNamespace('table-header');
const props = defineProps(tableHeaderProps);
// const   { state }  = createStore(props);
</script>

<template>
  <thead :class="[bem.e('thead')]">
      <tr :class="[bem.e('tr')]" >
        <th colspan="1" rowspan="1" :class="[bem.e('table-cell')]" v-for="(item, index) in props.columns" :key="index">
          <div :class="[bem.e('cell')]" >
            {{ item.label }}
          </div>
        </th>
      </tr>
    </thead>
</template>

<style lang='scss' scoped>
</style>
