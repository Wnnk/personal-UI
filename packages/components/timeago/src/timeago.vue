<script setup lang="ts">
import {ref,reactive, onMounted} from "vue"
import { createNamespace } from "@commonUI/utils/create";
import { timeAgoProps, TimeAgo, dict } from './timeago'
import { zh_CN, en_US } from "./lang";
const bem = createNamespace("timeago");
const props = defineProps(timeAgoProps);

defineOptions({
  name: "z-time-ago"
});

const timeago = ref<TimeAgo>();

const initTimeAgo = () => {
  const now = Date.now();
  let diff = 0;
  /* 判断时间类型 */
  if (typeof props.date === "number") {
    /* number类型 */
    diff = now - props.date;
  } else if(typeof props.date === "string") {
    /* string类型 */  
    const date = new Date(props.date);
    if(!isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
    diff = now - date.getTime();
  } else if ( props.date instanceof Date ) {
    /* Date类型 */
    diff = now - props.date.getTime();
  }
  if (props.registerDict === null || props.registerDict === undefined) {
    const locale = props.lang || "zh_CN";
    const option = locale === "zh_CN"? zh_CN : en_US;
    setTimeAgo(diff, option);
  } else {
    const option = initLocale(props.registerDict);
    setTimeAgo(diff, option);
  }
 
  
};

/** 
 * @description: 根据时间差与locale 设置时间差描述
 * @param {number} diff 时间差
 * @param {any} option 语言配置
 * @return {void}
  */
const setTimeAgo = (diff: number, option: any) => {
  
  if(diff < 0) return;
  if (diff < 1000) {
    /* 刚刚 */
    timeago.value = option.justNow;
  } else if (diff < 60 * 1000) {
    /* 一分钟内 */
    timeago.value = option.minuteAgo;
  } else if (diff < 60 * 60 * 1000 && diff >= 60 * 1000) {
    /* 一小时内 */
    const min = Math.floor(diff / (60 * 1000));
    timeago.value = option.minutesAgo.replace("{0}", min.toString());
  } else if (diff < 24 * 60 * 60 * 1000 && diff >= 60 * 60 * 1000) {
    /* 一天内 */
    const hour = Math.floor(diff / (60 * 60 * 1000));
    timeago.value = option.hoursAgo.replace("{0}", hour.toString());
  } else if ( diff >= 24 * 60 * 60 * 1000 && diff < 2 * 24 * 60 * 60 * 1000 ) {
    /* 昨天 */
    timeago.value = option.yesterday;
  } else if (diff >= 2 * 24 * 60 * 60 * 1000 && diff < 30 * 24 * 60 * 60 * 1000) {
    /* XX天前 */
    const day = Math.floor(diff / (24 * 60 * 60 * 1000));
    timeago.value = option.daysAgo.replace("{0}", day.toString());
  } else if (diff >= 30 * 24 * 60 * 60 * 1000 && diff < 365 * 24 * 60 * 60 * 1000) {
    /* XX月前 */
    const month = Math.floor(diff / (30 * 24 * 60 * 60 * 1000));
    timeago.value = option.monthsAgo.replace("{0}", month.toString());
  } else if (diff >= 365 * 24 * 60 * 60 * 1000) {
    /* XX年前 */
    const year = Math.floor(diff / (365 * 24 * 60 * 60 * 1000));
    timeago.value = option.yearsAgo.replace("{0}", year.toString());
  }
}
/** 
 * @description: 初始化个人语言
 * @params { dict } 语言配置
 * @return {Object} option
**/
const initLocale = (dict: dict) => {
  for (let [key, value] of Object.entries(dict)) {
    if (key === "minutesAgo" || key === "hoursAgo" || key === "daysAgo" || key === "monthsAgo" || key === "yearsAgo") {
      const newValue = "{0} ".concat(value);
      dict[key] = newValue;
    }
  }
  return dict;
}

onMounted(() => {
  initTimeAgo()
});


</script>
<template>
  <div :class="bem.b()">
    <div :class="bem.e('line')"></div>
    <div :class="bem.e('content')">{{timeago}}</div>
    <div :class="bem.e('line')"></div>
  </div>
</template>
<style lang="scss" scoped>




</style>
