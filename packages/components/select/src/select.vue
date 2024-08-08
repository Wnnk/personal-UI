<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import {selectProps} from './select'
import { onMounted, ref, useSlots } from 'vue'
const bem = createNamespace('select');
const props = defineProps(selectProps);
const slots = useSlots();
defineOptions({
  name:'z-select',
});
const currentValue = ref('');
const isFocus = ref(false);
const changeSelect = () => {
  isFocus.value =!isFocus.value;
};
/** 
 * @description: 初始化时，判断是否有z-option子组件
 * 
**/
const hasZOption = ref(false);
const initHasZOption = () => {
  const slotContent = slots.default?.() || undefined;
  if (!slotContent) {
    throw new Error('[z-select] component must have at least one option');
  }
  console.log(slotContent);
  slotContent.forEach((vnode) => {
    /* 单个option的判断 */
    if (vnode.children === null) {
      if (typeof vnode.type !== 'object' || vnode.type.name !== 'z-option') {
        throw new Error('[z-select] component must have only z-option as children');
      }
    } else if(Array.isArray(vnode.children)){
      /* 多个option的判断 */
      vnode.children.forEach((child) => {
        if (typeof child!.type !== 'object' || child!.type.name !== 'z-option') {
          throw new Error('[z-select] component must have only z-option as children');
        }})  
    }
   
  });
  hasZOption.value = true;
};
/** 
 * @description: 监听Option的点击事件，更新当前值
 * @param data 点击的Option的数据
**/
const handleOptionClick = (data: any) => {
  console.log(data);
};

onMounted(() => {
  initHasZOption();
});

</script>

<template>
  <div :class="[bem.b(), bem.is('is-focus', isFocus)]" @click="changeSelect" v-if="hasZOption">
    <div :class="[bem.e('input')]">{{ currentValue === '' ? props.placeholder : currentValue }}</div>
    <span :class="[bem.e('dropdown'), bem.is('is-focus', isFocus)]">👇</span>
    <div :class="[bem.e('options')]" v-if="isFocus">
      <slot @updateModelValue="handleOptionClick"></slot>
    </div>
    
  </div>
</template>

<style lang='scss' scoped>
</style>