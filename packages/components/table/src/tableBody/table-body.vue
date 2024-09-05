<script setup lang='ts'>
import { tableBodyProps } from '../table'
import { createNamespace } from '@commonUI/utils/create';
import { computed, onMounted, ref, watch, h } from 'vue';
import  {expandArray, expandRows, state} from '../store/helper'
const bem = createNamespace('table-body');
const props = defineProps(tableBodyProps);


 const borderStyle = computed(() => {
  return   props.border ? 'border-right: 1px solid #ebeef5; border-left: 1px solid #ebeef5;' : 'none';
});

onMounted(() => {
  console.log(state.value.slots)
})
const renderSlots = () => {
  const vnode = h(
    'div', // type
    { }, // props
    [
      h('h1', null, 'Hello World')
    ]
  )
  console.log(vnode)
  // return vnode
}
onMounted(() => {
  // renderSlots()
})
</script>

<template>
  <tbody tabindex="-1" >
    <tr :class="[bem.e('row')]" v-for="(row, rowIndex) in props.data" :key="rowIndex">
      <td v-for="(col, colIndex) in props.columns" :key="colIndex" colspan="1" rowspan="1" :class="[bem.e('table-cell')]" :style="borderStyle">
        <div :class="[bem.e('cell')]">
          <div v-if="col.type !== ''" :class="[bem.e('expand-icon'),bem.is('expand',expandArray[rowIndex])]" @click="expandRows(rowIndex)">
            <i :class="[bem.e('icon')]">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="48" d="M184 112l144 144l-144 144"></path></svg>
            </i>
          </div>
          <div>
            {{ row[col.prop] }}
          </div>
        </div>
      </td>
    </tr>
  </tbody>
  <div></div>
</template>

<style lang='scss' scoped>
</style>
