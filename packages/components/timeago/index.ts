import { withInstall } from '@commonUI/utils/with-install';
import _TimeAgo from './src/timeago.vue';

const TimeAgo = withInstall(_TimeAgo);

export default TimeAgo;

export type { TimeAgoProps } from './src/timeago';

declare module 'vue' {
  export interface GlobalComponents {
    ZTimeAgo: typeof TimeAgo;
  }
}