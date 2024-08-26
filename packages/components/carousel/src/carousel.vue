<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { ref } from 'vue';
import { useCarousel } from './useCarousel';
import { CarouselProps } from './carousel'
const bem = createNamespace('carousel');
const props = defineProps(CarouselProps);

defineOptions({
  name: 'z-carousel',
})
const {
  activeIndex,
  hover,
  arrowDisplay,
  throttledArrowClick,
  setActiveItem
} = useCarousel(props);

const arrow = ref(true);
// setInterval(()=>{
 
//   arrow.value =!arrow.value
// },2000)
</script>

<template>
  <div :class="[bem.b()]">
    <transition name="carousel-arrow-left" v-if="arrowDisplay">
      <button
        :class="[bem.e('left'),bem.e('arrow')]"
        v-show="arrow"
        type="button"
        @click.stop="throttledArrowClick(activeIndex - 1)"
      >
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="48" d="M328 112L184 256l144 144"></path></svg>
        </i>
      </button>
    </transition>
    <div>

    </div>

    <ul :class="[bem.e('indicatorsList')]">
      <li
        v-for="(item, index) in [1,2,3,4]"
        :key=index
        :class="[bem.e('indicator')]"
      >
        <button :class="[bem.e('indicatorButton'),bem.is('active', index === activeIndex)]"></button>
      </li>
    </ul>


    <transition name="carousel-arrow-right" v-if="arrowDisplay">
      <button
        :class="[bem.e('right'),bem.e('arrow')]"
        v-show="arrow"
        type="button"
        @click.stop="throttledArrowClick(activeIndex + 1)"
      >
        <i>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M184 112l144 144l-144 144"></path></svg>
        </i>
      </button>
    </transition>

    
  </div>
</template>

<style lang='scss' scoped>



</style>