<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import {
  inputDisplay,
  dateDisplay,
  selectDisplay,
  radioDisplay,
} from './component/index'
import  {panelDisplayProps, panelDisplayEmits} from './dragForm'
import ItemStatus from './itemStatus.vue';
import itemDelete from './itemDelete.vue';

const componentMap = {
  inputDisplay,
  dateDisplay,
  selectDisplay,
  radioDisplay,
}

const bem = createNamespace('panel-display');
const props = defineProps(panelDisplayProps);
console.log(props)
</script>

<template>
  <div :class="[bem.b(), currentItem ? 'fucos': '']" :style="{width: props.schema!.width}">
    <component
      :is="componentMap[props.schema!.component]"
    ></component>
    <itemDelete v-if="currentItem" />
    <ItemStatus :index="index"/>
  </div>
</template>

<style lang='scss' scoped>
</style>