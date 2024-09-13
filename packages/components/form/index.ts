import { withInstall, withNoopInstall } from '@commonUI/utils/with-install';
import type { SFCWithInstall } from '@commonUI/utils/with-install';
import _FormItem from './src/formItem.vue';
import _Form from './src/form.vue';


export const Form: SFCWithInstall<typeof _Form> & {
  _FormItem: typeof _FormItem;
} = withInstall(_Form,{
  _FormItem,
});

export const FormItem:SFCWithInstall<typeof _FormItem>= withNoopInstall(_FormItem);
export default Form;

export type { formProps } from './src/form';

declare module 'vue' {
  export interface GlobalComponents {
    ZForm: typeof Form;
  }
}