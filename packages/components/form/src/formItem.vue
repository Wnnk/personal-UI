<script setup lang="ts">
import { createNamespace } from "@commonUI/utils/create";
import { formItemProps, FormItemValidateState } from "./formItem";
import {
  ref,
  reactive,
  computed,
  inject,
  provide,
  toRefs,
  useSlots,
  watch,
} from "vue"
import { formContextKey, formItemContextKey } from "./constants";
import formLabelWrap from "./form-label-wrap";
import { FormItemContext } from "./types";
import { addUnit } from "@commonUI/utils/style";
const bem = createNamespace("form-item");
const props = defineProps(formItemProps);
const slots = useSlots();
defineOptions({
  name: "z-form-item",
})
/*  */
const validateState = ref<FormItemValidateState>('');
/* 上下文 */
const formContext = inject(formContextKey, undefined);
const parentFormItemContext = inject(formContextKey, undefined);

const formItemRef = ref<HTMLDivElement>();
const validateMessage = ref('');

/**
 * @description: 表单项的label动态位置显示
 */
const labelPosition = computed(() => props.labelPosition || formContext?.labelPosition );



/** 
 * @description: item动态类名
 * 
 */
const formItemClasses = computed(() => {
  const classes = [
    bem.b(),
    bem.is('error', validateState.value === 'error'),
    bem.is('validating', validateState.value === 'validating'),
    bem.is('required', props.required),
  ];
 
  if (props.size || formContext?.size) {
    const size = props.size || formContext?.size;
    classes.push(bem.m(`${size}`))
  }

  if (props.labelPosition || formContext?.labelPosition) {
    const labelPosition = props.labelPosition || formContext?.labelPosition;
    classes.push(bem.m(`${labelPosition}`))
  }

  if (props.inline || formContext?.inline) {
    const inline = props.inline || formContext?.inline;
    classes.push(bem.m('inline'))
  }

  return classes;
});



watch(
  formItemClasses,
  () => {
  console.log(formItemClasses.value)},
  { deep: true }
  )

/** 
 * @description: 用户自定义的label
 * 
  */
const hasLabel = computed<boolean>(() => {
  return !!(props.label || slots.label)
});


/** 
 * @description: 表单项是否为分组
  */
const isGroup = computed<boolean>(() => {
  return !!(props.label || slots.label)
});
/**
 * @description: 使用labelFor属性时，label的for属性
  */
const labelFor = computed(() => {
  return props.for
}); 

/** 
 * @description: 表单项的label样式宽度
  */
const labelStyle = computed(() => {
  if (labelPosition.value === 'top') {
    return {}
  };
  const labelWidth = addUnit(props.labelWidth || formContext?.labelWidth || '')
  if (labelWidth) return { width: labelWidth }
  return {}
});



/** 
 * @description: 表单项内容样式
  */
const isNested = !!parentFormItemContext
const contentStyle = computed(() => {
  if (labelPosition.value === 'top' || formContext?.inline) {
    return {}
  }
  if (!props.label && !props.labelWidth && isNested) {
    return {}
  }
  const labelWidth = addUnit(props.labelWidth || formContext?.labelWidth || '')
  if (!props.label && !slots.label) {
    return { marginLeft: labelWidth }
  }
  return {}
})

const ensureArray = (arr: any) => {
  if(!arr && (arr as any) !== 0) return [];
  return Array.isArray(arr)? arr : [arr];
}

/** 
 * @description: 表单项的label
  */
const currentLabel = computed(
  () => `${props.label || ''}${formContext?.labelSuffix || ''}`
)


/** 
 * @description: 表单校验规则，包括用户自定义的rules和form的rules
  */
const normalizedRules = computed(() => {
  const { required } = props;
  let rules: any[] = [];

  if (props.rules) {
    rules.push(...ensureArray(props.rules));
  }

  const formRules = formContext?.rules;
  if (formRules && props.prop) {
    rules = formRules.filter((rule:any) => {
      return rule.field === props.prop;
    })
  }

  if (required !== undefined) {
    const requiredRules = rules.map((rule:any, i:number) => 
      [rule,i] as const 
    ).filter(([rule]) => Object.keys(rule).includes('required'));
    if (requiredRules.length > 0) {
      for (const [rule,i] of requiredRules) {
        if(rule.required === required) continue;
        rules[i] = {...rule, required}
      }
    } else {
      rules.push({ required });
    }
  }

  return rules;

});


/** 
 * @description: 表单项是否必填
  */

const isRequired = computed(() =>
  normalizedRules.value.some((rule) => rule.required)
)

// console.log(props.rules,normalizedRules.value,isRequired.value)
let isResettingField = false
const validate =  async() => {
  if (!isResettingField || !props.prop) {
    return false;
  }
}



const fieldValue = computed(() => {
  const model = formContext?.model;
  if (!model || !props.prop) {
    return ;
  }
  return model[props.prop];
})


/** 
 * @description: formItem上下文提供
  */
const context:FormItemContext = reactive({
  ...toRefs(props),
  $el: formItemRef,
  validateState,
  hasLabel,
  isGroup,
  validate,
  fieldValue,

})
provide(formItemContextKey, context);


</script>
<template>
  <div 
    ref="formItemRef"
    :class="[formItemClasses]"
  >
    <form-label-wrap
      :is-auto-width="labelStyle.width === 'auto'"
    >
      <component
        :is="labelFor ? 'label' : 'div'"
        v-if="hasLabel"
        :for="labelFor"
        :class="[bem.e('label'),bem.is('required', isRequired )]"
        :style="labelStyle"
      >
        <slot name="label" :label="currentLabel">{{ currentLabel }}</slot>
      </component>
    </form-label-wrap>

    <div :class="bem.e('content')" :style="contentStyle">
      <slot></slot>
    </div>

  </div>
</template>
<style lang="scss" scoped>




</style>
