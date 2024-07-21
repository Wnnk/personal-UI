<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { componentProps} from '../dragForm'

const bem = createNamespace('input-display');
const props = defineProps(componentProps);

</script>

<template>
  <div :class="[bem.b()]">
    <span>{{ props.dynamicComponent!.label }}</span>
   <input type="text"  placeholder="请输入内容" >
  </div>
</template>

<style lang='scss' scoped>
</style>