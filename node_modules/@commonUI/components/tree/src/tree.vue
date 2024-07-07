<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { treeProps, TreeNode, TreeOption } from "./tree.ts"
 defineOptions({
  name: 'z-tree'
 })
 const props =defineProps(treeProps)



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
 
 const createTree = (data: TreeOption[]): any => {
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

console.log(flattenTree.value)
</script>
<template>
  <div class="">
    tree
  </div>
</template>
<style lang="scss" scoped>




</style>
