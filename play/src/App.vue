<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { onMounted, ref, watch} from 'vue'
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
// const dragData = ref<nodesType[]>([
//   {
//     label: '输入框',
//     id: '1',
//     dragType: 'input',
//   },
//   {
//     label: '下拉框',
//     id: '2',
//     dragType: 'select',
//     options:[
//       {
//         label: '选项1',
//         value: '1'
//       },
//       {
//         label: '选项2',
//         value: '2'
//       }
//     ]

//   },
//   {
//     label: '单选框',
//     id: '3',
//     dragType: 'radio',
//     value: '1',
//   }
// ])
// const dragData2 = ref<nodesType[]>([
//   {
//     id:'10',
//     label: '输入框',
//     dragType: 'input',
//   },
//   {
//     id:'20',
//     label: '下拉框',
//     dragType:'select',
//   }
// ])

/* timeAgo */
// const dict = {
//   justNow: '刚刚1',
//   minuteAgo: '1 分钟前1',
//   minutesAgo: '分钟前1',
//   hourAgo: '1 小时前1',
//   hoursAgo: '小时前1',
//   yesterday: '昨天',
//   daysAgo: '天前1',
//   lastWeek: '上周1',
//   weeksAgo: '周前1',
//   lastMonth: '上个月1',
//   monthsAgo: '个月前1',
//   lastYear: '去年1',
//   yearsAgo: '年前1'
// }

/* select */
const selectValue = ref<string[] | number[]>([]);
const options = ref([
  {
    value: 'Option1',
    label: 'Option1',
    disabled:true,
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
])
const changeOptions = (res:any) => {
  options.value = res
}
const useApi = async() => {

  try {
    const response = await fetch('https://mock.presstime.cn/mock/66b9f2d18b18b22c21d33bf7/ui/select');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]


onMounted(() => {
  
})
</script>

<template>
  <div class="app">
    <z-select 
      v-model="selectValue" 
      :options="options"
      @update:options="changeOptions" 
      :multiple="true" 
      :multiple-limit="6"
      size="medium"
      :autoLoad="true"
      :api="useApi"
      :lazy="true"
      > 
    </z-select>

    <z-table :data="tableData"  :border="false" height="300" :multiple="false">
      <z-table-column label="Name" prop="name" width="180"/>
      <z-table-column label="Date" prop="Date" width="180"/>
      <z-table-column label="Address" prop="address" width="180"/>
      <z-table-column label="City" prop="city" width="180"/>
      <z-table-column label="Address" prop="address" width="180"/>
      <z-table-column label="Name1" prop="name" width="180"/>
      <z-table-column label="Name2" prop="name" width="180"/>
      <z-table-column label="Name3" prop="name" width="180"/>
      <z-table-column label="Name4" prop="name" width="180"/>
      <z-table-column label="Name5" prop="name" width="180"/>
    </z-table>
  </div>

</template>

<style scoped lang="scss"> 
.app {
  width: 100%;
  height: 100vh;

}
</style>
