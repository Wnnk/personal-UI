import { ref, provide } from 'vue'

interface TableCloumnAttrsType {
  label: string,
  prop: string,
  width: string,
  sort:boolean
}

const tableCloumnAttrs  = ref<TableCloumnAttrsType[]>([])

const getAttrs = (value: TableCloumnAttrsType) => {
  tableCloumnAttrs.value.push(value)
}
export const getTableCloumnAttrs = () => {
  provide('tableCloumnAttrs', getAttrs)
  return tableCloumnAttrs
}