<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { ref } from 'vue';

const bem  = createNamespace('drag-config');
const layout = ref(['flex', 'grid'])
</script>

<template>
  <div :class="[bem.b()]">
    <div :class="[bem.e('layout')]">
      <div v-for="item in layout" class="layout-item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>