 import { PropType } from 'vue'
 export const luckyGridProps = {
  width: {
    type: [String, Number],
    default: '600'
  },
  height: {
    type: [String, Number],
    default: '600'
  },
  data: {
    type: Object as PropType<DataType>,
    required: true,
    default: () => {}
  }
 }

 export type DataType = {
  prizes: Array<PrizesType>,
  buttons: Array<ButtonItemType>,
  style?: StyleType,
  blocks: Array<BlockItemType>,
 }
 
 export type PrizesType = {
  x: number,
  y: number,
  fonts: Object,
  imgsrc?: string,
 }

 export type FontsItemType = {
  text: string,
  top: [string, number]
 }

 export type ButtonItemType = {
  x: number,
  y: number,
  fonts: Array<FontsItemType>,
  background: string,
 }

 export type StyleType = {
  background: string,
  fontSize: [string, number]
 }

 export type BlockItemType = {
  padding: [string, number],
  background: string,
 }