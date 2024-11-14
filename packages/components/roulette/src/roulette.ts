import { PropType } from 'vue'
export const rouletteProps = {
 width: {
  type: [Number, String],
  default: 200
 },
 height: {
  type: [Number, String],
  default: 200
 },
 data: {
  type: Object as PropType<DataType>,
  required: true,
  default: () => {}
 },
 gap: {
  type: Number,
  default: 10
 },

}

export type DataType = {
  prizes: Array<PrizesType>,
  buttons: Array<ButtonItemType>,
  // style?: StyleType,
  blocks: Array<BlockItemType>,
 }

 export type PrizesType = {
  fonts: Array<FontsItemType>,
  imgsrc?: string,
  background?: string,
  probability? : number,
 }

 export type ButtonItemType = {
  radius: string,
  fonts?: Array<FontsItemType>,
  pointer?: boolean,
  background: string,
 }
 export type BlockItemType = {
  padding: string,
  background: string,
  imgsrc?:string,
 }

 export type FontsItemType = {
  text: string,
  top?:string,
  bottom?:string,
  left?:string,
  right?:string,
  pointer?: boolean,
  background?: string,
 }