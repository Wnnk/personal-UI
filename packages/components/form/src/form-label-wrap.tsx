import { createNamespace } from "@commonUI/utils/create";
import { defineComponent, ref, inject, Fragment, nextTick, onMounted,onBeforeUnmount } from "vue";
import { formContextKey, formItemContextKey } from "./constants";

const COMPONENT_NAME = 'z-label-wrap';
export default defineComponent({
  name: COMPONENT_NAME,
  props: {

  },

  setup(props, { slots }) {
    const bem = createNamespace('form');
    const el = ref<HTMLElement>();
    const computedWidth = ref(0);
    const formContext = inject(formContextKey, undefined);
    const formItemContext = inject(formItemContextKey);

    if (!formItemContext) {
      
    }
    
    const getLabelWidth = () => {
      if (el.value?.firstElementChild) {
        const width = window.getComputedStyle(el.value.firstElementChild).width;
        return Math.ceil(Number.parseFloat(width));
      } else {
        return 0;
      }
    }

    const updateLabelWidth = (action: 'update' | 'remove' = 'update') => {
      nextTick(() => {
        if (slots.default && props.isAutoWidth) {
          if (action === 'update') {
            computedWidth.value = getLabelWidth();
          } else if (action ==='remove') {
            formContext?.deregisterLabelWidth(computedWidth.value) // ?
          }
        }
      });
    }
    const updateLabelWidthFn = () => updateLabelWidth('update');

    onMounted(() => {
      updateLabelWidthFn();
    });

    onBeforeUnmount(() => {
      updateLabelWidth('remove')
    })
    // return (
    //   <div ref={el} class={[bem.be('item','label-wrap')]} >
    //     {slots.default?.()}
    //   </div>
    //   <Fragment ref={el}>{slots.default?.()}</Fragment>
    // ) 
    return () => {
      if (!slots) return null;
      return (
        // <div ref={el} class={[bem.be('item','label-wrap')]} >
        //   {slots.default?.()}
        // </div>
        <Fragment ref={el}>{slots.default?.()}</Fragment>
      )
    };
  },

  
});