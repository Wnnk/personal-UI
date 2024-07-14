import {  PropType,ExtractPropTypes } from "vue";
export type Locale = 'zh_CN' | 'en'

export type TimeAgo = String | Date | number

export const timeAgoProps ={
  locale: {
    type: String as PropType<Locale>,
    default: 'zh_CN',
  },
  date: {
    require: true,
    type: [String, Date, Number] as PropType<TimeAgo>,
  },
  
}

export type TimeAgoProps = ExtractPropTypes<typeof timeAgoProps>;