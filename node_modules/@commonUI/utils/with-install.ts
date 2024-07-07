import { Plugin } from 'vue';

export type SFCWithInstall<T> = T & Plugin;
export function withInstall<T>(compotent:T){
    (compotent as SFCWithInstall<T>).install = function(app:any) {
      const {name} = compotent as unknown as { name: string } ;
      app.component(name, compotent); // 注册全局组件
    }
    return compotent as SFCWithInstall<T>;
}