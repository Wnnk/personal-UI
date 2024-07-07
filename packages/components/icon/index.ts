// 整合组件， 实现导出组件

import _Icon from './src/icon.vue'
import { withInstall } from '@commonUI/utils/with-install'

const Icon = withInstall(_Icon)
export default Icon
export * from './src/icon'

// volar 无法识别 export * from './src/icon' 语法， 所以需要在此处导出组件
declare module 'vue' {
  // 接口自动合并
  export interface GlobalComponents {
    ZIcon: typeof Icon
  }
}