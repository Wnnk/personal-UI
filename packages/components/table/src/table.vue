<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { provide, ref, onMounted, useAttrs} from 'vue';
import { tableProps } from './table'
import tableHeader from './tableHeader.vue';
import tableBody from './tableBody.vue';
import tableFooter from './tableFooter.vue';

const bem = createNamespace('table');
const attrs = useAttrs();
const props = defineProps(tableProps)

defineOptions({
  name:'z-table',
})

const tableInnerRef = ref();
const innerWidth = ref(0);



</script>

<template>
  <div :class="[bem.b()]" :style="{width: props.width}">
    <div :class="[bem.e('table-fit')]">
      <div :class="[bem.e('table-inner')]" >
        <tableHeader>
          <slot></slot>
        </tableHeader>
        <tableBody :data="props.data" >
          <slot></slot>
        </tableBody >
      </div>
    </div>

  </div>
</template>

<style lang='scss' scoped>
</style>