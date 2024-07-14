<script setup lang="ts">
import { createNamespace } from "@commonUI/utils/create";
import {ref,reactive, useSlots, useAttrs} from "vue"
import { inputEmits, inputProps } from "./input";

const bem = createNamespace("input");
const props = defineProps(inputProps);
const emit = defineEmits(inputEmits)
defineOptions({
  name:"z-input",
  inheritAttrs: false,
});
const slots = useSlots();
const attrs = useAttrs();

</script>
<template>
  <div :class="[bem.b()]">

    <div :class="bem.e('group')">
      <div v-if="slots.prepend" :class="bem.be('group','prepend')">
        <slot name ="prepend"></slot>
      </div>

      <div :class="[bem.e('wrapper')]">
        <span v-if="slots.prefixIcon" :class="bem.e('prefix')">
          <slot name ="prefixIcon"></slot>
        </span>
        <input :type="type" v-bind="attrs" :class="bem.e('inner')"/>
        <span v-if="slots.suffixIcon">
          <slot name ="suffixIcon" :class="bem.e('suffix')"></slot>
        </span>
      </div>

      <div v-if="slots.append" :class="bem.be('group','append')">
        <slot name ="append"></slot>
      </div>
    </div>

  </div>
</template>


<style lang="scss" scoped>




</style>
