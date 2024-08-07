import {  PropType,ExtractPropTypes } from "vue";
export type Locale = 'zh_CN' | 'en_US'

export type TimeAgo = String | Date | number

export interface dict {
  justNow: string,
  minuteAgo:  string,
  minutesAgo:  string,
  hourAgo:  string,
  hoursAgo:  string,
  yesterday:  string,
  daysAgo:  string,
  lastWeek:  string,
  weeksAgo:  string,
  lastMonth:  string,
  monthsAgo:  string,
  lastYear:  string,
  yearsAgo:  string,
}

export const timeAgoProps ={
  lang: {
    type: String as PropType<Locale>,
    default: 'zh_CN',
  },
  date: {
    require: true,
    type: [String, Date, Number] as PropType<TimeAgo>,
  },
  registerDict: {
    type: Object as PropType<dict>,
    default: null,
  }
  
}

export type TimeAgoProps = ExtractPropTypes<typeof timeAgoProps>;