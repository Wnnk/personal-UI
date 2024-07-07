<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { ref} from 'vue'
const createData = (level: number = 4, parentKey:string = ''):any => {
  if (!level) return []
  const arr = new Array(6 -level).fill(0)
  return arr.map((_, index) => {
    const key = `${parentKey}${level}${index}`
    return {
      xx: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

const createLabel = (level: number):string => {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三' 
  if (level === 1) return '三生万物'
  return ''
}

const treeData = ref(createData())
console.log(treeData.value)
</script>

<template>
  <div class="app">
    <z-icon :size="50" >     
      <AddCircle ></AddCircle>
    </z-icon>
    <z-icon :size="50" :color="'blue'"><AddCircle ></AddCircle></z-icon>
   
    <z-tree 
      :data="treeData" 
      :label-field="'xx'" 
      key-field="key" 
      hildren-field="children"
      :default-expanded-keys="['41']"
    >

    </z-tree>

  </div>
</template>

<style scoped lang="scss"> 
.app {
  width: 100%;
  height: 100%;

}
</style>
