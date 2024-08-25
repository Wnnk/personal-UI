<script setup lang="ts">
import { createNamespace } from "@commonUI/utils/create";
import { loadingProps} from "./loading"

const bem = createNamespace("loading");
const props = defineProps(loadingProps)
defineOptions({
  name: "z-loading",
})


</script>
<template>
  <div :class="[bem.b()]" v-if="props.loading">
  </div>
</template>
<style lang="scss" scoped>




</style>
