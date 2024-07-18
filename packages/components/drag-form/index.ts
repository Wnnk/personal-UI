import { withInstall } from '@commonUI/utils/with-install';
import _DragForm from './src/dragForm.vue';

const DragForm = withInstall(_DragForm);

export default DragForm;

export type { DragFormProps } from './src/dragForm';

declare module 'vue' {
  export interface GlobalComponents {
    ZDragForm: typeof DragForm;
  }
}