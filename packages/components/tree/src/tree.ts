import { ExtractPropTypes } from "vue"
import type { InjectionKey, PropType, SetupContext } from "vue"

export type Key = string | number

export interface TreeOption {
  label?: Key,
  key?: Key,
  children?: TreeOption[],
  [key: string]: unknown // 允许自定义属性
  isLeaf?: boolean,
  disabled?: boolean,
}


export interface TreeNode extends Required<TreeOption> {
  level: number,
  rawNode: TreeOption,
  children: TreeNode[],
  isLeaf: boolean,
  parentKey: Key | undefined,
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
  },
  onLoad: Function as PropType<(node: TreeNode) => Promise<TreeOption[]>>,
  selectedKeys: {
    type: Array as PropType<Key[]>,
    required: true,
  },
  selectable: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  }
} as const

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  expanded: {
    type: Boolean,
    required: true,
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
    required: true,
  },
  selectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
  },
  indeterminate:{
    type: Boolean,
  }
} as const

export const treeNodeEmits = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
  check: ( val:boolean, node: TreeNode ) => typeof val === 'boolean',
}

export const treeEmitts = {
  "update:selectedKeys": (keys: Key[]) => keys,
}
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>

/* Partial<> 类型断言，将属性设置为可选，用户可不传属性 */
export type TreeProps =Partial<ExtractPropTypes<typeof treeProps>> 

export interface TreeContext {
  slots: SetupContext['slots'],
  // emit:SetupContext<typeof treeEmitts>['emit'],
}

/* InjectionKey 用于向下传递数据 */
export const treeInjectKey: InjectionKey<TreeContext> = Symbol()

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
}