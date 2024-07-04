<script setup lang='ts'>
import {createNamespace} from "@commonUI/utils/create"
import { iconProps } from "./icon";
import { computed, defineProps } from "vue";
const bem = createNamespace('icon')

defineOptions({
  name:'ui-icon',
})

const props = defineProps(iconProps)

const style = computed(() => {
  if (!props.size &&props.color ) return {};

  return {
    ...(props.size ? {"font-size": `${props.size}px`} : {}),
    ...(props.color? {"color": props.color} : {})
  };
});


</script>

<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<style lang='scss' scoped>
</style>