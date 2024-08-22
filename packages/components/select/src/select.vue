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
onMounted(() => {
  if (!props.lazy) {
    loadData();
  }
});


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

/** 
 * @description : 触底加载
 * 
 * 
  */
 const optionsRef = ref<HTMLDivElement>()
 const loadMore = () => {
    if(status.value === 1) return;
   if (optionsRef.value) {
    const Height = optionsRef.value.scrollHeight;
    const clientHeight = optionsRef.value.clientHeight;
    const scrollTop = optionsRef.value.scrollTop;
    if (Height - scrollTop - clientHeight < 100) {
      /* 加载数据api */
      console.log('触底加载');
    }
   }
 }


</script>

<template>
  <div :class="[bem.b(), bem.is('is-focus', isFocus)]"  :style="{ height: props.size === 'small' ? '40px' : props.size === 'medium' ? '48px' : '56px' }">
    <!-- 单选模式 --> 
    <div :class="[bem.e('input')]" v-if="props.multiple === false">{{ props.modelValue === '' ? props.placeholder : props.modelValue }}</div>
    <!-- 多选模式 -->
    <div :class="[bem.e('mutiple-input')]" v-else-if="props.multiple === true" v-for="(item, index) in props.modelValue" :key="item">
      <div :class="[bem.e('mutiple-item')]">{{ item }} <span @click="deleteOption(index)">❌</span></div>
    </div>
    <div :class="[bem.e('dropdown')]">
      <span :class="[ bem.is('is-focus', isFocus), bem.e('icon')]" @click="changeSelect" >👇</span>
      <i :class="[bem.e('icon')]" 
        v-show="props.clearable && (Array.isArray(props.modelValue) && props.modelValue.length > 0)"
        @click="emits('update:modelValue', [])"
      >
        <svg t="1724329716226" class="icon" viewBox="0 0 1024 1024" 
          version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4277" width="16" height="16">
          <path d="M687.6 96.4H336.4v91.2h351.1V96.4zM636.7 398v405.5h-73.9V398h73.9z m-175.5 0v405.5h-73.9V398h73.9z m332.1-119.2H230.7l27.9 648.8h506.7l28-648.8zM696.8 5.1c40.4 0 73.3 35.6 73.9 79.8v102.7h147.8c20.2 0 36.6 17.8 37 39.9v41.2c0 5.5-4 10-9 10.1h-70.1L848 941.6c-1.8 42.9-33.7 76.6-72.6 77.3H249.8c-39 0-71.3-33.4-73.7-76l-0.1-1.3-28.5-662.7H77.7c-5 0-9.1-4.4-9.2-9.8v-40.9c0-22.2 16.2-40.2 36.3-40.5h148.4V86.2c0-44.3 32.5-80.4 72.7-81.1h370.9z"
          fill="#e6e6e6" p-id="4278">
          </path>
      </svg>
      </i>
    </div>
    
    <div :class="[bem.e('options')]" v-if="isFocus"  ref="optionsRef" @scroll="loadMore">
      <div :class="[bem.e('empty')]" v-if="props.options.length === 0">无数据</div>
      <div :class="[bem.e('loading')]" v-if="status === 1">加载中...</div>
      <div :class="[bem.e('error')]" v-if="status === 3">加载失败</div>
      <!-- 自定义header -->
      <div v-if="$slots.header" :class="[bem.e('header')]">
        <slot name="header"></slot>
      </div>
   
        <z-option 
        v-for="option in props.options" 
        :key="option.value" :value="option.value" 
        :label="option.label" 
        :disabled="option.disabled"
        @option-selected = optionsSelected
      >
      </z-option>
  
      
       <!-- 自定义footer -->
      <div v-if="$slots.footer" :class="[bem.e('footer')]">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>

</template>

<style lang='scss' scoped>
</style>