import { createNamespace } from "@commonUI/utils/create";
import { defineComponent, ref, inject, Fragment } from "vue";
import { formContextKey, formItemContextKey } from "./constants";

const COMPONENT_NAME = 'ZLabelWrap';
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
    console.log(slots.extra);
    if (!formItemContext) {
      
    }
    const getLabelWidth = () => {
      
    }

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