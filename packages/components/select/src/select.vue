<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import {selectProps, selectEmits} from './select'
import { onMounted, ref, useSlots  } from 'vue'

const bem = createNamespace('select');
const props = defineProps(selectProps);
const slots = useSlots();
defineOptions({
  name:'z-select',
});



const isFocus = ref(false);
const emits = defineEmits(selectEmits);
const changeSelect = () => {
  isFocus.value =!isFocus.value;
  if (props.lazy) {
    loadData();
  }
};
/* 0:未初始化, 1:加载中 2:加载完成 3:加载失败 */
const status = ref(0);

/** 
 * @description: 异步加载数据
 * 
**/
const loadData = async () => {
  if(props.api === null || status.value === 1) return;
  try {
    status.value = 1;
    const result = await props.api();
    emits('update:options', result);
    status.value = 2;
  } catch (error) {
    status.value = 3;
    console.error(error);

  }
}

/**
 * @description 处理option选择事件
 * @param value: 选项值
**/
const optionsSelected = (value: string | number) => {
  if (props.multiple === false) {
    emits('update:modelValue',value)
  } else if(props.multiple === true && Array.isArray(props.modelValue)){
    let len = [...props.modelValue, value].length;
    const arr = [...props.modelValue, value];
    const isExceed = len > props.multipleLimit;
    if (isExceed) {
      /* 超出限制，弹出提示 */
      alert(`没完成tip,使用alert暂时代替,最多只能选择${props.multipleLimit}项`);
      return;
    }
    emits('update:modelValue', arr)
  }
  
}
/** 
 * @description: 删除选项
 * @param index: 选项索引
**/
const deleteOption = (index: number) => {
  if (!Array.isArray(props.modelValue)) return;
  const arr = props.modelValue.toSpliced(index, 1);
  emits('update:modelValue',arr)

}

onMounted(() => {
  if (!props.lazy) {
    loadData();
  }
});


</script>

<template>
  <div :class="[bem.b(), bem.is('is-focus', isFocus)]"  :style="{ height: props.size === 'small' ? '40px' : props.size === 'medium' ? '48px' : '56px' }">
    <!-- 单选模式 --> 
    <div :class="[bem.e('input')]" v-if="props.multiple === false">{{ props.modelValue === '' ? props.placeholder : props.modelValue }}</div>
    <!-- 多选模式 -->
    <div :class="[bem.e('mutiple-input')]" v-else-if="props.multiple === true" v-for="(item, index) in props.modelValue" :key="item">
      <div :class="[bem.e('mutiple-item')]">{{ item }} <span @click="deleteOption(index)">❌</span></div>
    </div>
    <span :class="[bem.e('dropdown'), bem.is('is-focus', isFocus)]" @click="changeSelect" >👇</span>
    <div :class="[bem.e('options')]" v-if="isFocus" >
      <div :class="[bem.e('empty')]" v-if="props.options.length === 0">无数据</div>
      <div :class="[bem.e('loading')]" v-if="status === 1">加载中...</div>
      <div :class="[bem.e('error')]" v-if="status === 3">加载失败</div>
       <z-option 
         v-for="option in props.options" 
         :key="option.value" :value="option.value" 
         :label="option.label" 
         :disabled="option.disabled"
         @option-selected = optionsSelected
        >
       </z-option>
    </div>
  </div>

</template>

<style lang='scss' scoped>
</style>