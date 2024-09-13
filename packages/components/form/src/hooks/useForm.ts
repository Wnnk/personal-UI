import { computed, ref } from 'vue'

export const useFormSize = () => {

}

export const useFormLabelWidth = () => {
  const potentialLabelWidth = ref<number[]>([]);
  const autoLabelWidth = computed(() => {
    if (!potentialLabelWidth.value.length) return '0';
    const max = Math.max(...potentialLabelWidth.value);
    return max ? `${max}px` : '';
  });

  return {
    autoLabelWidth,
  }
}