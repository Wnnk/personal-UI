import { withInstall } from '@commonUI/utils/with-install';
import _Card from './src/card.vue';

const Card = withInstall(_Card);

export  default Card

declare module 'vue' {
  export interface GlobalComponents {
    ZCard: typeof Card
  }
}

export * from './src/card';