import {
  Fragment,
  computed,
  defineComponent,
  ref,
  inject,
  watch,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { formContextKey, formItemContextKey } from './constants';
import { createNamespace } from '@commonUI/utils/create';

export default defineComponent({
  name: 'z-form-label-wrap',
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean,
  },

  setup(props, { slots }) {
    const formContext = inject(formContextKey, undefined);
    const formItemContext = inject(formItemContextKey, undefined);
    if (!formItemContext) {
      throw new Error('z-form-label-wrap must be used inside z-form-item');
    }
    const bem = createNamespace('form-label-wrap');
    const el = ref<HTMLElement>();
    const computedWidth = ref(0);

    const getLabelWidth = () => {
      if (el.value?.firstElementChild) {
        const width = window.getComputedStyle(el.value.firstElementChild).width;
        return Math.ceil(Number.parseFloat(width))
      } else {
        return 0;
      }
    }



    return () => {
      if (!slots) return null;

      const { isAutoWidth } = props;

      if (isAutoWidth) {
        const autoLabelWidth = formContext?.autoLabelWidth;
        const hasLabel = formItemContext?.hasLabel;
        const style = {

        };
        if (hasLabel  && autoLabelWidth !== 'auto') {
          // const marginWidth = Math.max(
          //   0,
          //   Number.parseInt(autoLabelWidth, 10) - computedWidth.value
          // );
          const marginWidth = 5;
          const labelPosition = formItemContext.labelPosition || formContext.labelPosition;
          const marginPosition = labelPosition === 'left'? 'marginRight' : 'marginLeft';
          if (marginWidth) {
            style[marginPosition] = `${marginWidth}px`;
          }
        }
        return (
          <div ref={el} class={[bem.e('label-wrap'), bem.e('item')]} style={style}>
            { slots.default?.() }
          </div>
        )
      } else {
        return <Fragment ref={el}>{ slots.default?.() }</Fragment>
      }
    }
  },
});