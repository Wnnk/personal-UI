<script setup lang="ts">
import { computed, provide, ref, watch, useSlots, onMounted } from "vue"
import { treeProps, TreeNode, TreeOption, Key, treeEmitts, treeInjectKey } from "./tree.ts"
import { createNamespace } from "@commonUI/utils/create"
import  ZTreeNode from './treeNode.vue'
import ZVirtualList from '@commonUI/components/virtual-list'

 defineOptions({
  name: 'z-tree'
 })
 const props =defineProps(treeProps)

const bem = createNamespace('tree');

 function createOptions(key: string,label: string,children: string) {
  return  {
    getKey(node:TreeOption):string{
      return node[key] as string
    },
    getLabel(node : TreeOption):string{
      return node[label] as string
    },
    getChildren(node : TreeOption):TreeOption[] {
      return node[children] as TreeOption[]
    }
  }
 }
 const TreeOptions = createOptions(props.keyField, props.labelField, props.childrenField);
 
 const createTree = (data: TreeOption[], parent: TreeNode | null = null): any => {
   function traversal(data: TreeOption[], parent: TreeNode | null = null): TreeNode[] {
    return data.map((node) => {
      const children = TreeOptions.getChildren(node) || [];
      const TreeNode: TreeNode = {
        key: TreeOptions.getKey(node),
        label: TreeOptions.getLabel(node),
        children: [], //默认为空
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        isLeaf: node.isLeaf ?? children.length === 0,
        disabled: !!node.disabled,
        parentKey: parent ? parent.key : undefined,
      }
      /* 有子节点，递归 */
      if (children.length > 0) {
        TreeNode.children = traversal(children, TreeNode);
      }
      return TreeNode;
    });
   }
   const result:TreeNode[] = traversal(data);
   return result;
 }

/* 格式化props数据 */
const tree = ref<TreeNode[]>([])





/* 监听props数据变化 */
watch(
  () => props.data, 
  (data: TreeOption[]) => {
  tree.value = createTree(data)
  // console.log(tree.value)
  },
  { immediate: true }
)
/* 需要展开的Keys */
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))
const flattenTree = computed(() => {
  let expandedKeys = expandedKeysSet.value;  //展开的节点

  let flattenNodes: TreeNode[] = [];  //最终结果

  const nodes = tree.value || [];  //被格式化后的节点
  const stack: TreeNode[] = []; // 栈
  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i]);
  }

  while (stack.length) {
    const node = stack.pop();
    if (!node) continue;
    flattenNodes.push(node);
    if (expandedKeys.has(node.key)) {
      const children = node.children || [];
      if (children.length > 0) {
        for (let i = children.length - 1; i >= 0; --i) {
          stack.push(children[i]);
        }
      }
    }
  }
 
  return flattenNodes;

})

const loadingKeysRef = ref(new Set<Key>());
const triggerLoading = (node: TreeNode) => {
  /* 节点异步加载 */
  if (!node.children.length && !node.isLeaf) {
    const  loadingKeys = loadingKeysRef.value;
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key);
      const onLoad = props.onLoad;
      if (onLoad) {
        onLoad(node.rawNode).then((children) => {
          node.rawNode.children = children;
          node.children = createTree(children,node);
          loadingKeys.delete(node.key);
        })
      }
    }
  }
};

const isExpanded = (node: TreeNode): boolean => {
  return expandedKeysSet.value.has(node.key)
}

const collpase = (node: TreeNode) => {
  return expandedKeysSet.value.delete(node.key)
}

const expand = (node: TreeNode) => {
  triggerLoading(node)
  return expandedKeysSet.value.add(node.key)
  
}

const toggleExpand = (node: TreeNode) => {
  const expandKeys = expandedKeysSet.value;
  if (expandKeys.has(node.key) && !loadingKeysRef.value.has(node.key)) {
    collpase(node)
  } else {
    expand(node);
  }
}

/** 
 * @description 选中节点事件
 * @param node:TreeNode 被选中的节点
**/
  const emit = defineEmits(treeEmitts);
  const selectKeysRef = ref<Key[]>([])

  watch(
    () => props.selectedKeys,
    (value) => {
      if (value) {
        selectKeysRef.value = value;
      }
    },
    { immediate: true }
  )

const handleSelect = (node: TreeNode) => {
  /* 获取非响应式 */
  let keys = Array.from(selectKeysRef.value);
  /* 不可选 */
  if (!props.selectable) return;
  if (props.multiple) {
    const index  =keys.findIndex(key => key === node.key);
    if (index > -1) {
      keys.splice(index, 1);
    } else {
      keys.push(node.key);
    }
    
  } else {
    /* 单选 */
    if(keys.includes(node.key)) {
      keys = [];
    } else {
      keys = [node.key];
    }
  }
  /* 更新选中节点 */
  emit('update:selectedKeys',keys);
}


provide(treeInjectKey,{
  slots: useSlots(),
})

const checkedKeysRefs = ref(new Set(props.defaultCheckedKeys));

const isChecked = (node: TreeNode) => {
  return checkedKeysRefs.value.has(node.key);
};

const isDisabled = (node: TreeNode) => {
  return !!node.disabled;
};

const indeterminateRefs = ref(new Set())

const isIndeterminate = (node: TreeNode) => {

  return indeterminateRefs.value.has(node.key);
};

/** 
 * @description 节点自上而下选中(父节点选中，子节点全部选中)
 * 
**/
const toggle = (checked:boolean, node: TreeNode) => {
  if (!node) return;
  let checkedKeys =checkedKeysRefs.value;
  if (checked) {
    indeterminateRefs.value.delete(node.key);
  }
  /* 维护当前key列表 */
  checkedKeys[checked ? 'add' : 'delete'](node.key);

  /* 更新节点的全部子节点 */
  const children = node.children || [];
  if (node.children && node.children.length > 0) {
    children.forEach(childrenNode => {
      if (!childrenNode.disabled) {
        toggle(checked, childrenNode);
      }
    })
  }
}


const findNode = (key: Key) => {
  return flattenTree.value.find(node=>node.key === key)
}

/**
 * @description 自下而上,根据子节点更新父节点的选中状态
 */
const updateCheckedKeys = (node: TreeNode) => {
  if (node.parentKey) {
    const parentNode = findNode(node.parentKey);
    if (parentNode) {
      let allChecked  = true;
      let hasChecked = false;

      let nodes = parentNode.children || [];
      for(const node of nodes ) {
        if (checkedKeysRefs.value.has(node.key)) {
          hasChecked = true;
        } else if(indeterminateRefs.value.has(node.key)) {
          allChecked = false;
          hasChecked = true;
        } else {
          allChecked = false;
        }
      }

      if (allChecked) {
        checkedKeysRefs.value.add(parentNode.key);
        indeterminateRefs.value.delete(parentNode.key);
      } else if (hasChecked) {
        indeterminateRefs.value.add(parentNode.key);
        checkedKeysRefs.value.delete(parentNode.key);
      }  

      updateCheckedKeys(parentNode);
    }
  }
}

const toggleCheck = (checked:boolean, node: TreeNode) => {
  toggle(checked, node);
  updateCheckedKeys(node);
}

onMounted(() => {
  checkedKeysRefs.value.forEach((key: Key) => {
    toggleCheck(true, findNode(key)!);
  })
})

</script>
<template>
  <div :class="bem.b()">
    <z-virtual-list :items="flattenTree" :remain="8" :size="35">
      <template #default="{ node }">
        <z-tree-node 
          :key="node.key" 
          :node="node"
          :expanded ="isExpanded(node)"
          @toggle ="toggleExpand"
          :loadingKeys ="loadingKeysRef"
          :selectedKeys ="selectKeysRef"
          @select="handleSelect"
          :show-checkbox="showCheckbox"
          :checked="isChecked(node)"
          :disabled="isDisabled(node)"
          :indeterminate="isIndeterminate(node)"
          @check="toggleCheck($event,node)"
        >
        </z-tree-node >
      </template>
    </z-virtual-list>

  </div>
</template>
<style lang="scss" scoped>




</style>
