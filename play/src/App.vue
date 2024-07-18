<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { ref, watch} from 'vue'
import { TreeOption, Key } from '@commonUI/components/tree/index'
import {groupType,nodesType} from '@commonUI/components/drag-form/src/dragForm'
const createData = (level: number = 4, parentKey:string = ''):any => {
  if (!level) return []
  const arr = new Array(6 - level).fill(0)
  return arr.map((_, index) => {
    const key = `${parentKey}${level}${index}`
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

// const createData = () => {
//   return [
//     {
//       label:nextLabel(),
//       key:1,
//       isLeaf:false,
//     },
//     {
//       label:nextLabel(),
//       key:2,
//       isLeaf:false,
//     },

//   ]
// }

const nextLabel = (currentLabel?:string | undefined | number): string => {
  if (!currentLabel) return  'Out of Tao, One is  born'
  if (currentLabel === 'Out of Tao, One is  born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three')  {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe'){
    return 'Out of Tao, One is born'
  } 
  return ''
}

const createLabel = (level: number):string => {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三' 
  if (level === 1) return '三生万物'
  return ''
}

const treeData = ref(createData())

const handleLoad = (node:TreeOption) => {
  return new Promise<TreeOption[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          label:nextLabel(node.label),
          key:node.key + nextLabel(node.label),
          isLeaf:false,
        }
      ])
    }, 1000);
  })

}

const value = ref<Key[]>([]);
/** 
 * @description 禁用功能，数据测试
 **/
const data = ref<TreeOption[]>([
  {
    key:'0',
    label:'0',
    children:[
      {
        key:'0-0',
        label:'0-0',
      },
      {
        disabled:true,
        key:'0-1',
        label:'0-1',
        children:[
          {
            key:'0-1-0',
            label:'0-1-0',
          },
          {
            key:'0-1-1',
            label:'0-1-1',
          }
        ]
      }
    ]
  },
])

const check = ref(true);

const handleChange = (value:boolean) => {
  console.log(value)
}

const handleClick = (e:MouseEvent) => {
  console.log(e)
}


/** 
 * @description 拖拽表单数据测试
**/
const dragData = ref<nodesType[]>([
  {
    label: '输入框',
    id: '1',
    dragType: 'input',
  },
  {
    label: '下拉框',
    id: '2',
    dragType: 'select',
    options:[
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ]

  },
  {
    label: '单选框',
    id: '3',
    dragType: 'radio',
    value: '1',
  }
])
const dragData2 = ref<nodesType[]>([
  {
    id:'10',
    label: '输入框',
    dragType: 'input',
  },
  {
    id:'20',
    label: '下拉框',
    dragType:'select',
  }
])

watch(dragData, (newVal, oldVal) => {
  console.log('dragData', newVal, oldVal)
})
</script>

<template>
  <div class="app">
    <!-- <z-icon :size="50" >     
      <AddCircle ></AddCircle>
    </z-icon>
    <z-icon :size="50" :color="'blue'"><AddCircle ></AddCircle></z-icon> -->
   
    <!--  
      :label-field="'label'" 
      key-field="key" 
      hildren-field="children"
      :default-expanded-keys="['41', '4130']" 
      
    -->
    <!-- selectable 可选节点 multiple 多选节点 selected-key 选中节点-->
    <!-- {{ value }}
    <z-tree 
      :data="treeData" 
      :on-load ="handleLoad"
      v-model:selected-keys="value"
      selectable
      :default-checked-keys="['40']"
      show-checkbox
      >
      <template #default="{ node }">
        {{ node.key }} - {{ node.label }}
      </template>
    </z-tree>
    <z-button 
      size="medium" 
      type="danger" 
      :round="true"  
      :disabled="false"
      icon-placement="left"
      @click="handleClick"
      @mousedown="handleClick"
    >
      <template #icon>
        <z-icon>
          <AddCircle></AddCircle>
        </z-icon>
      </template>
      按钮
    </z-button> -->
    <z-input> 
      <template #prepend>prepend</template> 
      <template #prefixIcon>
        <z-icon>
          <AddCircle></AddCircle>
        </z-icon>
      </template>
      <template #suffixIcon>
        <z-icon>
          <AddCircle></AddCircle>
        </z-icon>
      </template>
      <template #append>append</template>
    </z-input>
    <!-- <z-time-ago :Date="new Date()"></z-time-ago> -->

    <z-drag-form v-model:left-tree="dragData" :panel-value="dragData2"></z-drag-form>
  </div>
 <!-- 
  v-model: 
  disabled
  indeterminate
  label
  change 
 -->
  <!-- <z-checkbox 
    label='节点'
    @change="handleChange"
  >
  </z-checkbox> -->
</template>

<style scoped lang="scss"> 
.app {
  width: 100%;
  height: 100vh;

}
</style>
