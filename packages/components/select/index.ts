import { withInstall } from '@commonUI/utils/with-install';
import _Select from './src/select.vue';

const Select = withInstall(_Select);

export default Select;

export type { selectProps } from './src/select';

declare module 'vue' {
  export interface GlobalComponents {
    ZSelect: typeof Select;
  }
}