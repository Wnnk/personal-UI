import type { InjectionKey } from "vue";
import type { FormContext, FormItemContext } from "./types";

/* Injection key for provide使用 */
export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey')
