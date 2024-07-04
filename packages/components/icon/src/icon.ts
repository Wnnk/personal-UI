// 准备组件相关的属性和ts类型
import { ExtractPropTypes, PropType } from "vue";

export const iconProps = {
  color: String,
  size: [Number, String] as PropType<string | number>,
} as const;

export type iconProps = ExtractPropTypes<typeof iconProps>

