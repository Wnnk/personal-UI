// 整合组件， 实现导出组件

import _Icon from './src/icon.vue'

export function withInstall(compotent){
    compotent.install = function(app) {
      const {name} = compotent;
      app.component(name, compotent); // 注册全局组件
    }
    return compotent
}

const Icon = withInstall(_Icon)
export default Icon
export * from './src/icon'