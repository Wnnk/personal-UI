import { ref, computed } from 'vue'



export const useCarousel = (props: any) => {
  /* refs */
  const activeIndex = ref(-1);
  const hover = ref(false);
  const arrowDisplay = ref(true);
  /* computeds*/
  // const arrowDisplay = computed(
  //   () => {}
  // )

  /* methods */
  const throttledArrowClick = (index: number) => {
    setActiveItem(index);
  }

  const setActiveItem = (index: number) => {
    activeIndex.value = index;
    console.log(activeIndex.value);
  }

  return {
    activeIndex,
    hover,
    arrowDisplay,
    throttledArrowClick,
    setActiveItem
  }
}
