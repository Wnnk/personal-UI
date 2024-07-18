
import {  PropType,ExtractPropTypes } from "vue";

export type groupType = {
  name: string,
  pull: string, //从列表中移动的能力，克隆--复制项目，而不是移动
  put: Boolean, // 是否可以从其他组中拖动到本组
}
type optionsType = {
  label: string,
  value: string
}
export type nodeType = 'input' | 'select' | 'radio'
export type nodesType ={
  label: string,
  dragType: nodeType,
  id: string,
  value?: string,
  options?: optionsType[]
  children?: nodesType[]
}

export const dragFormProps = {
  leftTree: {
    type: Array as PropType<nodesType[]>,
    default: () => []
  },
  panelValue: {
    type: Array as PropType<nodesType[]>,
    default: () => []
  },
}

export const dragFormEmits = {
  "update:leftTree": (value: any) => value,
  "updatePanelValue": (value: any) => value,
}

export type DragFormProps = ExtractPropTypes<typeof dragFormProps>
export type DragFormEmits = typeof dragFormEmits;


/** 
 * @description leftTree
 * 
**/
export const leftTreeProps = {
  nodes:{
    type: Array as PropType<any[]>, //any
    default: () => []
  },
}

export const leftTreeEmits = {
  "updateLeftTree": (value: any) => value,
}


/** 
 * @description panelValue
 * 
  */
export type componentType = 'DATE' | 'INPUT' | 'SELECT' | 'RADIO'
export type componentPropsType = {
  value?: string,
  options?: Array<any>,
  label: string,
  /* Date 类型 */
  min?: string,
  max?: string,
  /* Input 类型 */
  placeholder?: string,

}
export type SchemaType = {
  /* 组件唯一标识 */
  id: string,
  /* 组件类型 */
  componentType: string,
  /* 模板组件名称 */
  component: string,
  /* **修改为style */
  width:string,
  /* 组件属性 */
  componentProps: Object,
  /* 是否具有子节点 */
  children?: SchemaType[],
  /* 是否具有父节点 */
  parent?: SchemaType,
}
export type FormConfigType = {
  schemas: Array<SchemaType>, 
}
export const panelValueProps = {
  formConfig:{
    type: Object as PropType<FormConfigType>, 
    default: () => []
  },
  formData: {
    type: Array as PropType<any>, //any
    default: () => {}
  },
  disabled: {
    type : Boolean,
    default: false
  },
  currentItem: {
    type: Object as PropType<any>, //any
    default: () => {}
  }
}

export const panelValueEmits = {
  'setCurrentItem': (value: any) => value,
  'deleteCurrentItem': (value: any) => value,
}

/** 
 * @description panelDisplay
 * 
  */

export const panelDisplayProps = {
  disabled: {
    type : Boolean,
  },
  formData: {
    type: Object as PropType<any>
  },
  schema: {
    type: Object as PropType<SchemaType>,
    required: true,
  },
  currentItem :{
    type: Object as PropType<any>
  },
  formConfig:{
    type: Object as PropType<FormConfigType>,
    required: true,
    default: () => []
  },
  index: {
    type: Number,
  }
}


export const panelDisplayEmits = {
  'setCurrentItem': (value: any) => value,
  'deleteCurrentItem': (value: any) => value,
  'changeFormItemData' : (value: any) => value,
}



/**
 * @description itemStatus 组件排序状态
 * 
 */

export const itemStatusProps = {
  index: {
    type: Number,
  }
}





/** 
 * @description dragConfig
  */

export const dragConfigProps = {

}

export const dragConfigEmits = {

}






