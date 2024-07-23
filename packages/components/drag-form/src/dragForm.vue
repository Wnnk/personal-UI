<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { createUuid } from '@commonUI/utils/createUuid';
import { dragFormProps, dragFormEmits, SchemaType } from './dragForm';
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
    collapse: true,
    children: [
      {
        id: '1-1',
        label:'健康评估表',
        level:2,
        collapse: false,
        type: 'input',
      },
    ]
  },
  {
    id: '2',
    label: '基本信息',
    level: 1,
    collapse: false,
    children: [
      {
        id: '2-1',
        label: '姓名',
        type: 'input',
        level: 2,
        collapse: true,
      },
      {
        id: '2-2',
        label: '性别',
        type: 'radio',
        level: 2,
        collapse: true,
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
      width: '500px',
      component:'inputDisplay',
      componentProps: {
        label: '测试input',
        value: '测试input值'
      }
    },
    {
      id:'2',
      componentType:'radio',
      width: '100px',
      component:'radioDisplay',
      componentProps: {
        label: '性别',
        options:[
          {label: '男', value:'male'},
          {label: '女', value: 'female'}
        ]
      }  
    },
    {
      id:'3',
      componentType:'select',
      width: '50px',
      component:'selectDisplay',
      componentProps: {
        label: '测试select',
        options: [
          {label: '选项1', value: '1'},
          {label: '选项2', value: '2'},
          {label: '选项3', value: '3'},
          {label: '选项4', value: '4'},
        ]
      }
    },
    {
      id:'4',
      componentType:'date',
      width: '200px',
      component:'dateDisplay',
      componentProps: {
        label: '测试date',
        value: '2022-01-01',
        min: '2022-01-01',
        max: '2024-12-31',
      }
    },
  ],
  currentItem: null,
})

const disabled = ref(false);
const formData = ref([])

/** 
 * @description 新增表单数据
 * 
  */
 const addSchema = (schema: any) => {
  console.log('新增表单数据',schema)
  for (const node of nodes.value) {
    if(node.id === schema.id) {
      node.children.push({
        id: createUuid(),
        label: '新增字段',
        type:  'radio',
        level: 2,
        collapse: false,
        
      })
    }
  }
 }

/** 
 * @description 选择当前节点
 **/

 const setCurrentItem = (item: any) => {
  console.log('选择当前节点',item)
  formConfig.value.currentItem = item
 }

 /** 
  * @description 创建表单数据
  * 
   */
 const createSchema = (item: any) => {
    const schema = {
     id: createUuid(),
     width: '200px',
     component: `${item.type}Display`,
     componentProps: {
       label: item.label,
     },
     componentType: item.type,
   }
   return schema;

 }

/** 
 * @description 更新表单
  **/
 const changeFormItemData = (data: any) => {
  formConfig.value.schemas.push(createSchema(data.data));
  console.log('更新表单',formConfig.value.schemas)
 }


</script>


<template>
  <div :class="[bem.b()]">
    <dragTree v-model:nodes="nodes" @addSchema="addSchema"/>
    <dragPanel 
      :formConfig="formConfig" 
      :currentItem="formConfig.currentItem"
      @setCurrentItem="setCurrentItem"
      @deleteCurrentItem="'删除当前元素节点'"
      @changeFormItemData="changeFormItemData"
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