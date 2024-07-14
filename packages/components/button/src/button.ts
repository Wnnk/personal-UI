import {  PropType,ExtractPropTypes } from "vue";

export type Size= 'small' | 'medium' | 'large';

export type Type = "primary" | "success" | "warning" | "danger" | "info" | "default";

export type NativeType = "button" | "submit" | "reset";

export type Placement = "top" | "bottom" | "left" | "right";

export const buttonProps = {
  size: String as PropType<Size>,
  type : {
    type: String as PropType<Type>,
    default: "",
    validator:(val:string) => {
      return ['primary','success', 'warning', 'danger', 'info', 'default'].includes(val)
    }
  },
  round: Boolean,
  circle: Boolean,
  loading: Boolean,
  disabled: Boolean,
  nativeType: {
    type: String as PropType<NativeType>,
    default: "button"
  },
  iconPlacement: {
    type: String as PropType<Placement>,
    default: "left",
  }
} as const;

export const buttonEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent,
  mousedown: (event: MouseEvent) => event instanceof MouseEvent,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmits = typeof buttonEmits;