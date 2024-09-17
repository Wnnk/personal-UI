import { ref, computed } from 'vue';


export function useFormLabelWidth() {

  const potentialLabelWidthArr = ref<number[]>([]);

  const autoLabelWidth = computed(() => {
    if (!potentialLabelWidthArr.value.length) return '0';
    const max = Math.max(...potentialLabelWidthArr.value);
    return max ? `${max}px` : '';
  })

  

  function getLabelWidthIndex(width:number) {
    const index= potentialLabelWidthArr.value.indexOf(width);
    if (index === -1 && autoLabelWidth.value === '0')  {
      throw new Error(`Label width ${width} is not registered. Please register it first.`)
    }
    return index;
  };


  function  registerLabelWidth (val:number, oldVal:number) {
    if (val && oldVal) {
      const index = getLabelWidthIndex(oldVal);
      potentialLabelWidthArr.value.splice(index, 1, val);
    } else if (val) {
      potentialLabelWidthArr.value.push(val);
    }
  }


  function deregisterLabelWidth (val:number) {
    const index = getLabelWidthIndex(val);
    if (index >= -1) {
     potentialLabelWidthArr.value.splice(index, 1);
    }
  
    return {
      autoLabelWidth,
      registerLabelWidth,
      deregisterLabelWidth,
    }
  };

}


