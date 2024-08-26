import { withInstall } from '@commonUI/utils/with-install';
import _Carousel from './src/carousel.vue';

const Carousel = withInstall(_Carousel);

export default _Carousel;

export type { CarouselProps } from './src/carousel';

declare module 'vue' {
  export interface GlobalComponents {
    ZCarousel: typeof Carousel;
  }
}