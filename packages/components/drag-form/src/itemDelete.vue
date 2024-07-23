<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { Close} from '@vicons/ionicons5';
const bem = createNamespace('item-delete')
</script>

<template>
  <div :class="bem.b()">
    <z-icon :size="20">
      <Close />
    </z-icon>
  </div>
</template>

<style lang='scss' scoped>
</style>