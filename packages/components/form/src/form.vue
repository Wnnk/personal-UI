<script setup lang="ts">
import { createNamespace } from "@commonUI/utils/create";
import { formProps, formEmits } from "./form";
import {ref,reactive, computed, toRefs, provide} from "vue"
import { formContextKey } from "./constants";
import { useFormLabelWidth, filterFields } from './utils'
import { FormContext, FormItemContext, FormValidateCallback } from "./types";
import  { isFunction } from '@commonUI/utils/style'
import { FormItemProp, Arrayable } from "./formItem";
import type { ValidateFieldsError } from 'async-validator'

const bem  = createNamespace("form");
const props = defineProps(formProps);
const emit = defineEmits(formEmits);

defineOptions({
  name: 'z-form',
})

/** 
 * @description: 表单样式
 * 
  */
const formClass = computed(() => {
  return [
    bem.b(),
    props.inline && bem.e("inline"),
    props.labelPosition && bem.e(`label-${props.labelPosition}`),
  ]
});
/** 
 * @description: 表单验证，流程:validate -> validateField -> doValidateField -> obtainValidateFields -> 过滤fileds -> filterFields
 * 
  */
const validate  =async (callback?:FormValidateCallback) => {
  validateField(undefined, callback)
}

const fields: FormItemContext[] = [];

const validateField:FormContext['validateField'] = async (
  modelProps= [],
  callback:any
) => {
  /* 校验回调 */
  const shouldThrow = !isFunction(callback);

  try {

    const result = await doValidateField(modelProps)
    if (result === true) {
      await callback?.(result)
    }
    return result
  } catch (e) {
    if (e instanceof Error) throw e

    const invalidFields = e as ValidateFieldsError;
    /* 滚动到第一个错误位置 */
    if (props.scrollToError) {
      scrollToField(Object.keys(invalidFields)[0])
    }
    await callback?.(false, invalidFields)
    return shouldThrow && Promise.reject(invalidFields)
  }
  
}

const scrollToField = (prop: FormItemProp) => {
  const field = filterFields(fields, prop)[0]
  if (field) {
    field.$el?.scrollIntoView(props.scrollIntoViewOptions)
  }
}

/** 
 * @description: form必须绑定model
 * 
  */
const isValidatable = computed(() => {
  const hasModel = !!props.model;
  if (!hasModel) {
    throw new Error("Form must have a model");
  }
  return hasModel;
} )

const doValidateField = async (
  props: Arrayable<FormItemProp> = []
):Promise<boolean> => {
  /* 没有绑定model */
  if (!isValidatable.value) return false;

  const fields =  obtainValidareFields(props);
  /* 没有需要校验的fields */
  if (fields.length === 0) return true;
  /* 收集错误信息 */
  let validationErrors: any = {};

  for (const field of fields) {
    try {
      await field.validate('');
    } catch (fields) {
      validationErrors = {
        ...validationErrors,
        ...(fields as ValidateFieldsError),
      }
    }
  }

  if (Object.keys(validationErrors).length === 0) return true;
  return Promise.reject(validationErrors);
}

const obtainValidareFields = (props: Arrayable<FormItemProp>) => {
  if (fields.length === 0) return [];

  const fileteredFields = filterFields(fields,props)
  if (!fileteredFields.length) {
    return [];
  }
  return fileteredFields;
}

provide(
  formContextKey,
  reactive({
    ...toRefs(props),
    emit,

    validateField,


    ...useFormLabelWidth(),
  })
)

</script>
<template>
  <div :class="formClass">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>




</style>
