import { withInstall } from '@commonUI/utils/with-install';
import _Roulette from './src/roulette.vue';

const Roulette = withInstall(_Roulette);

export default Roulette;

export type { rouletteProps } from './src/roulette';

declare module 'vue' {
  export interface GlobalComponents {
    ZRoulette: typeof Roulette;
  }
}