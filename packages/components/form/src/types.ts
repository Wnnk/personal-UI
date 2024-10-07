import { FormItemProps, ComponentSize, FormItemValidateState } from './formItem'
import { FormProps } from './form'
export type  FormContext = FormProps &{
   
}

export type FormValidateCallback = (
  isValid: boolean,
) => Promise<void> | void
export type FormValidationResult = Promise<boolean>
/** 
 * el:绑定节点
 * size:表单项尺寸
 * validateStatus:表单项校验状态
 * isGroup:是否为表单组
 * hasLabel:是否有label
 * validate:表单项校验方法
  */


export interface FormItemContext extends FormItemProps {
  $el: HTMLDivElement | undefined
  size: ComponentSize
  validateState: FormItemValidateState
  isGroup: boolean
  hasLabel: boolean
  validate: (
    trigger: string,
    callback?: FormValidateCallback
  ) => FormValidationResult

}
