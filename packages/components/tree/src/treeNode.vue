<script setup lang='ts'>
import { treeNodeEmits, treeNodeProps, treeInjectKey, TreeNode } from  './tree'
import { createNamespace } from  '@commonUI/utils/create'
import Switcher from '@commonUI/components/internal-icon/Switcher.tsx'
import ZIcon from '@commonUI/components/icon'
import  ZCheckbox from '@commonUI/components/checkbox'
import { computed, inject } from 'vue';
import Loading from "@commonUI/components/internal-icon/Loading.tsx"
import ZTreeNodeContent from './tree-node-content.tsx'

const props = defineProps(treeNodeProps);
const bem = createNamespace('tree-node');
const emit = defineEmits(treeNodeEmits);
const handleExpand = () => {
  emit('toggle', props.node);
}

const isLoading = computed(() => {
  return props.loadingKeys.has(props.node.key)
})

const isSelected = computed(() => {
  return props.selectedKeys.includes(props.node.key)
})

const handleSelected = () => {
  if (props.node.disabled) return;
  emit('select', props.node);
}

const handleCheckChange = (val: boolean, node:TreeNode) => {
  emit('check',val, node)
}

</script>

<template v-for="node in flattenTree" :key="node.key">
  <div :class="[bem.b(),bem.is('selected',isSelected), bem.is('disabled', node.disabled)]">
    <div :class="[bem.e('content')]" 
    
    :style="{paddingLeft: `${node.level * 16}px`}"
    >
      <span :class="[
        bem.e('expand-icon'), 
        { expanded: expanded && !node.isLeaf }, 
        bem.is('leaf', node.isLeaf)
        ]"
         @click="handleExpand"
        >
        <z-icon size="20">
          <Switcher v-if="!isLoading"></Switcher>
          <Loading v-else></Loading>
        </z-icon>
      </span>
      <z-checkbox 
        v-if="showCheckbox" 
        :model-value="checked" 
        :disabled="node.disabled" 
        :indeterminate="indeterminate"
        @change="handleCheckChange"
      ></z-checkbox>
      <span @click="handleSelected" :class="[bem.e('label')]"> 
        <ZTreeNodeContent :node="node"></ZTreeNodeContent>
        <!-- {{ props.node?.label}}  --> 
      
      </span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>