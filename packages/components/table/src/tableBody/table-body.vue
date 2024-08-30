<script setup lang='ts'>
import { tableBodyProps } from '../table'
import { createNamespace } from '@commonUI/utils/create';
const bem = createNamespace('table-body');
const props = defineProps(tableBodyProps);


</script>

<template>
  <tbody tabindex="-1">
    <tr :class="[bem.e('row')]" v-for="(row, index) in props.data" :key="index">
      <td v-for="(col, index) in props.columns" :key="index" colspan="1" rowspan="1" :class="[bem.e('table-cell')]">
        <div :class="[bem.e('cell')]">
          {{ row[col.prop] }}
        </div>
      </td>
    </tr>
  </tbody>

</template>

<style lang='scss' scoped>
</style>
