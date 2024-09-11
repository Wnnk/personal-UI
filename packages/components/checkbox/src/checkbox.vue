<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create'
import { checkboxProps, checkboxEmits } from './checkbox'
import { computed, onMounted, watch, ref } from 'vue'

const bem  = createNamespace('checkbox');
const props = defineProps(checkboxProps);
const emit = defineEmits(checkboxEmits);
defineOptions({
  name: 'z-checkbox',
});

const model = computed<any>({
    get() {
      return props.modelValue ;
    },
    set(val) {
      return emit("update:modelValue", val)
    }
})
const inputRef = ref<HTMLInputElement>();

const indeterminate = (val: boolean) => {
  inputRef.value!.indeterminate = val;
}

watch(
  () => props.indeterminate,
  indeterminate
)

onMounted(() => {
  indeterminate(props.indeterminate);
})

const handleChange = (event: Event) => {
  event.stopPropagation();
  event.preventDefault();
  if ( !Array.isArray(props.modelValue)) {
    const target = event.target as HTMLInputElement;
    const value = target.checked ? true : false;
    emit('change',value)
  }
  
};
</script>

<template>
  <label :class="bem.b()">
    <span :enter-class="bem.e('input')">
       <input 
       type="checkbox" 
       v-model="model" 
       ref="inputRef" 
       :disabled="disabled" 
       :value="label"
       @change="handleChange"
      >
    </span>
    <span v-if="$slots.default || label" :class ="bem.e('label')" >
      <slot></slot>
      <template v-if="!$slots.default">
        {{ label }}
          
        
      </template>
    </span>
  </label>
</template>

<style lang='scss' scoped>
</style>