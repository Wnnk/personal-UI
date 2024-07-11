import { withInstall } from '@commonUI/utils/with-install';
import _Checkbox from './src/checkbox.vue';

const CheckBox = withInstall(_Checkbox);

export  default CheckBox

declare module 'vue' {
  export interface GlobalComponents {
    ZCheckbox: typeof CheckBox
  }
}

export * from './src/checkbox'