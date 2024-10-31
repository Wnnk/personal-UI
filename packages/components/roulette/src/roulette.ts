import { PropType } from 'vue'
export const rouletteProps = {
  data: {
    type: Array as PropType<BaseData[]>,
    default: () => []
  },
  backOption: {
    type: Object as PropType<BackOption>,
    default: () => {}
  },
  btnOption: {
    type: Object as PropType<BtnOption>,
    default: () => {}
  }
}

export type BackOption = {
  type: string, // image or default
  backGroud: string, // src or colors
}

export type BaseData = {
  label: string,
  color: string,
  backImage? :string,
}

export type BtnOption = {
  type: string, // image | color
  backGroud:string, // src or colors
  backGroundSecond:string, //背景颜色
  pointerColor:string, //指针颜色
}