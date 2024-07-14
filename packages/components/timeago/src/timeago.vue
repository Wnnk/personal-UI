<script setup lang="ts">
import {ref,reactive} from "vue"
import { createNamespace } from "@commonUI/utils/create";
import { timeAgoProps, TimeAgo } from './timeago'
const bem = createNamespace("timeago");
const props = defineProps(timeAgoProps);

const getTime = (date: TimeAgo) => {
  if (typeof date === "string") {

  } else if (typeof date === "number") {

  }else if (date instanceof Date) {

  }
}

console.log(getTime(new Date()))


</script>
<template>
  <div :class="bem.b()">

    111


  </div>
</template>
<style lang="scss" scoped>




</style>
