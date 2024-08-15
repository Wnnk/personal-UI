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
  <div :class="[bem.b()]" >
    <div :class="[bem.e('table-fit')]">
      <div :class="[bem.e('table-inner')]" :style="{ height: `${props.height}px`}">
        <tableHeader :border="props.border">
          <slot></slot>
        </tableHeader>
        <tableBody :data="props.data" :border="props.border">
          <slot></slot>
        </tableBody >
      </div>
    </div>

  </div>
</template>

<style lang='scss' scoped>
</style>