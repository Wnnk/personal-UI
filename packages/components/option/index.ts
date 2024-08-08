import { withInstall } from '@commonUI/utils/with-install';
import _Option from './src/option.vue';

const Option = withInstall(_Option);

export default Option;

export type { OptionProps } from './src/option';

declare module 'vue' {
  export interface GlobalComponents {
    ZOption: typeof Option;
  }
}