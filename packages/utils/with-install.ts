import { Plugin } from 'vue';
import { NOOP } from '@vue/shared'

export type SFCWithInstall<T> = T & Plugin;
// export function withInstall<T>(compotent:T){
//     (compotent as SFCWithInstall<T>).install = function(app:any) {
//       const {name} = compotent as unknown as { name: string } ;
//       app.component(name, compotent); // 注册全局组件
//     }
//     return compotent as SFCWithInstall<T>;
// }

export const withInstall = <T,E extends Record<string, any>>(
  main: T, 
  extra?: E
) => {
  ;(main as SFCWithInstall<T>).install = (app):void => {
    for (const comp of [main, ...Object.values(extra || {})]) {
      app.component(comp.name, comp); // 注册全局组件
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp; // 挂载额外属性
    }
  }
  return main as SFCWithInstall<T> & E
}

export const withNoopInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = NOOP

  return component as SFCWithInstall<T>
}