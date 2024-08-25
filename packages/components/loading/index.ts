import { withInstall } from '@commonUI/utils/with-install';
import _Loading from './src/loading.vue';

const Loading = withInstall(_Loading);

export default Loading;

export type { loadingProps } from './src/loading';

declare module 'vue' {
  export interface GlobalComponents {
    ZLoading: typeof Loading;
  }
}