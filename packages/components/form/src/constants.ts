import type { InjectionKey } from "vue"

export const formContextKey: InjectionKey<any> = Symbol("formContext");

export const formItemContextKey: InjectionKey<any> = Symbol("formItemContext");