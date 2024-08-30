<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import tableBody from './tableBody/table-body.vue';
import tableHeader from './tableHeader/table-header.vue';
import tableFooter from './tableFooter/table-footer.vue';
import { createNamespace } from '@commonUI/utils/create';
import { tableProps } from './table';
import  { createStore} from './store/helper'

const bem = createNamespace('table');
const props = defineProps(tableProps);
defineOptions({
  name: 'z-table',
})

 const { state }  = createStore(props);

 const root = ref<HTMLDivElement>();
onMounted(() => {
  console.log(root.value!.clientWidth)
})
</script>

<template>
  <div :class="[bem.b(), bem.e('fit')]" ref="root">
    <div :class="[bem.e('inner-wrapper')]" :style="{height: `${props.height}px`}">
      <div :class="[bem.e('hidden-columns')]">
        <slot></slot>
      </div>

      <div :class="[bem.e('header-wrapper')]" v-if="state.ready " >
        <table 
          :class="[bem.e('header')]" 
          :style="{ width: `${root!.clientWidth}px` }" 
          v-if="root"
          border="0"
          cellpadding="0"
          cellspacing="0"
        >
          <colgroup>
            <col v-for="(col, index) in state.columns" :key="index" :style="{ width: `${col.width}px`}"/>

          </colgroup>

          <tableHeader :columns="state.columns"></tableHeader>
        </table>
      </div>

      <div :class="[bem.e('body-wrapper')]">
        <div :class="[bem.e('scroll-bar')]">
          <div :class="[bem.e('scroll-view')]">
            <table :class="[bem.e('body')]">
              <colgroup>
                <col v-for="(col, index) in state.columns" :key="index" :style="{ width:`${col.width}px`  }"/>
              </colgroup>


              <tableBody :data="state.data" :columns="state.columns"></tableBody>
              <tableFooter></tableFooter>
            </table>
            <div :class="[bem.e('empty')]">
              <span :class="[bem.e('empty-text')]">
                <slot name="empty"></slot>
              </span>
            </div>

            <div :class="[bem.e('append-wrapper')]" v-if="$slots.append">
              <slot name="append"></slot>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  
</template>

<style lang='scss' scoped>
</style>