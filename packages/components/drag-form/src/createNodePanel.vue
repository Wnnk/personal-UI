<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { ref } from 'vue';

const bem = createNamespace('create-node-panel');
const componentType = [
  {
    type:'input',
    label:'输入框',
    componengt:'inputDisplay',
    value:'input',
    placeholder:'请输入内容',
  },
  {
    type:'select',
    label:'下拉框',
    componengt:'selectDisplay',
    value:1,
    options:[{label:'选项1',value:1},{label:'选项2',value:2},{label:'选项3',value:3}],
  },
  {
    type:'radio',
    label:'单选框',
    componengt:'radioDisplay',
    value:1,
    options:[{label:'选项1',value:1},{label:'选项2',value:2},{label:'选项3',value:3}],
  },
  {
    type:'checkbox',
    label:'多选框',
    componengt:'checkboxDisplay',
    value:1,
    options:[{label:'选项1',value:1},{label:'选项2',value:2},{label:'选项3',value:3}],
  },
  {
    type: 'date',
    label: '日期选择器',
    componengt: 'dateDisplay',
    value: '',
    placeholder: '请选择日期',
    min: '',
    max: '',
  },
  
];
const currentCheck = ref(componentType[0]);

/** 
 * @description: 添加选项
 * 
**/
const addOption = () => {
  currentCheck.value.options?.push({
    label: `选项${currentCheck.value.options.length + 1}`,
    value: currentCheck.value.options.length + 1
  })
}

/** 
 * @description: 创建节点
 * 
**/
const createNode = () => {

}

</script>

<template>
  <div class="mask">
    <div :class="bem.b()">
      <div  v-for="item in componentType" :key="item.type"  :class="bem.e('create-item')" >
        <input 
          type="radio" 
          :value="item.type" 
          @click="currentCheck = item" 
          name="createComponent" 
          id="createComponent" 
          />
        <label :for="`${item.label}`">{{item.label}}</label>
      </div>
      <form :class="bem.e('create-content')">
        <div v-if="currentCheck.type === 'input'" :class="bem.e('content')">
          <div>
            <span>命名:</span><input type="text" v-model="currentCheck.label">
          </div>
          <div>
            <span>默认值:</span><input type="text" v-model="currentCheck.value">
          </div>
          <div>
            <span>默认提示:</span><input type="text" v-model="currentCheck.placeholder">
          </div>
        </div>
        <div v-else-if="currentCheck.type === 'select' || currentCheck.type === 'radio' || currentCheck.type === 'checkbox'" :class="bem.e('content')">
          <div>
            <span>命名:</span><input type="text" v-model="currentCheck.label">
          </div>
          <div><span>默认选项:</span> <input type="text" v-model="currentCheck.value" ></div>
          <div v-for="option in currentCheck.options" :key="option.value" :class="bem.e('option')">
            <span>{{option.label}}</span>
            <input type="text"  :value="option.value">
          </div>
          <div>
          </div>
          <button type="button" @click="addOption">添加选项</button>
        </div>

        <div v-else-if="currentCheck.type === 'date'"  :class="bem.e('content')">
          <div><span>最小值:</span><input type="date"></div>
          <div><span>最大值:</span><input type="date"></div>
        </div>
        <button type="submit" @click="createNode">确定创建</button>
      </form>
    </div>   
  </div>

</template>

<style lang='scss' scoped>
</style>