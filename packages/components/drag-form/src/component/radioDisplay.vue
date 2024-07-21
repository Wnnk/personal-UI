<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { componentProps} from '../dragForm'

const bem = createNamespace('input-display');
const props = defineProps(componentProps);

</script>

<template>
  <div :class="[bem.b()]">
    <div v-for="item in dynamicComponent?.options">
      <input type="radio"  :value="item.value" name="radioGroup"/>
      <label :for="`${item.label}`">{{ item.label }}</label>
    </div>

  </div>
</template>

<style lang='scss' scoped>
</style>