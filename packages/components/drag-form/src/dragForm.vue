<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { dragFormProps, dragFormEmits } from './dragForm';
import dragTree from './dragTree.vue';
import dragPanel from './dragPanel.vue';
import dragConfig from './dragConfig.vue';
import { ref, provide, reactive } from 'vue'

const bem = createNamespace('drag-form');
const props = defineProps(dragFormProps);
const emit = defineEmits(dragFormEmits);
defineOptions({
  name:'z-drag-form',
})

const updateLeftTree = (value: any) => {
  emit('update:leftTree', value)
}


/** 
 * @description 拖拽表单数据测试
**/
const nodes = ref<any[]>([
  {
    id: '1',
    label: '基础字段',
    level: 1,
    children: [
      {
        id: '1-1',
        label:'健康评估表',
        level:2,
      },
    ]
  },
  {
    id: '2',
    label: '基本信息',
    level: 1,
    children: [
      {
        id: '2-1',
        label: '姓名',
        type: 'input',
        level: 2,
      },
      {
        id: '2-2',
        label: '性别',
        type: 'radio',
        level: 2,
        options: [
          {
            label: '男',
            value: 'male'
          },
          {
            label: '女',
            value: 'female'
          }
        ]
      },
    ]
  }
])

const formConfig = ref({
  schemas: [
    {
      id:'1',
      componentType:'input',
      width: '200px',
      component:'inputDisplay',
      componentProps: {
        label: '测试',
      }
    },
    {
      id:'2',
      componentType:'radio',
      width: '100px',
      component:'radioDisplay',
      componentProps: {
        label: '测试',
        options:[
          {label: '男', value:'male'},
          {label: '女', value: 'female'}
        ]
      }  
    },
    {
      id:'3',
      componentType:'input',
      width: '50px',
      component:'inputDisplay',
      componentProps: {
        label: '测试',
      }
    },
    {
      id:'4',
      componentType:'input',
      width: '200px',
      component:'inputDisplay',
      componentProps: {
        label: '测试',
      }
    },
  ],
})

const disabled = ref(false);
const formData = ref([])
</script>


<template>
  <div :class="[bem.b()]">
    <dragTree v-model:nodes="nodes" />
    <dragPanel 
      :formConfig="formConfig" 
      :formData="formData" 
      @setCurrentItem="'选中当前元素节点'"
      @deleteCurrentItem="'删除当前元素节点'"
      :disabled="disabled"
    />
    <dragConfig
      :formConfig="'表单配置'"
      :currentItem="'当前选中节点'"
      @changeFormConfig="'修改表单配置'"
      @changeSchema="'修改表单数据'"
    />
  </div>
</template>

<style lang='scss' scoped>
</style>