import { ExtractPropTypes } from "vue"
import type { PropType } from "vue"

type Key = string | number

export interface TreeOption {
  label?: Key,
  key?: Key,
  children?: TreeOption[],
  [key: string]: unknown // 允许自定义属性
  isLeaf: boolean,
}


export interface TreeNode extends Required<TreeOption> {
  level: number,
  rawNode: TreeOption,
  children: TreeNode[],
  isLeaf: boolean,
}


export const treeProps = {
  data:{
    type: Array as PropType<TreeOption[]>,
    default: () => [],
  },
  defaultExpandedKeys:{
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  labelField:{
    type: String,
    default: 'label',
  },
  keyField:{
    type: String,
    default: 'key',
  },
  childrenField:{
    type: String,
    default: 'children',
  }
} as const

/* Partial<> 类型断言，将属性设置为可选，用户可不传属性 */
export type TreeProps =Partial<ExtractPropTypes<typeof treeProps>> 

