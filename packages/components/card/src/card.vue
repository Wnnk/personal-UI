<script setup lang="ts">
import { createNamespace } from "@commonUI/utils/create";
import {ref,reactive} from "vue"


const bem = createNamespace("card");
defineOptions({
    name: "z-card",
})



</script>
<template>
  <div :class="[bem.b()]">
    <div v-if="$slots.header" :class="[bem.e('header')]">
      <slot name="header"></slot>
    </div>

    <div :class="[bem.e('body')]">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" :class="[bem.e('footer')]">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>




</style>
