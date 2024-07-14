<script setup lang="ts">
import {ref,reactive, useSlots} from "vue"
import { createNamespace } from '@commonUI/utils/create'
import {buttonProps,buttonEmits} from './button'
import  LoadingComponent  from "@commonUI/components/internal-icon/Loading";
import ZIcon from '@commonUI/components/icon'
const bem = createNamespace('button');
defineOptions({
  name: 'z-button',
  inheritAttrs: false,
});
const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);
const slots = useSlots();
/** 
 * @description: 用户@click事件 绑定到button上
 * 
 */
const emitClick = (e: MouseEvent) => {
  emit('click', e);
}
const emitMountdown = (e: MouseEvent) => {
  emit('mousedown', e);
}
</script>
<template>
  <button 
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round',round),
      bem.is('disabled',disabled),
      bem.is('loading',loading),
      ]"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="emitClick"
    @mousedown  = "emitMountdown"
  >
    <template v-if="iconPlacement === 'left'">
      <z-icon>
        <LoadingComponent v-if="loading"></LoadingComponent>
        <template v-else="slots.icon"> 
          <Component :is="slots.icon"></Component>
        </template>
      </z-icon>
    </template>
    <slot></slot>
    <template v-if="iconPlacement === 'right'">
      <z-icon>
        <LoadingComponent v-if="loading"></LoadingComponent>
        <template v-else="slots.icon"> 
          <Component :is="slots.icon"></Component>
        </template>
      </z-icon>
    </template>
  </button>
</template>
<style lang="scss" scoped>




</style>
