import { ref } from 'vue'
import { Columns, Table } from '../table'


const state = ref({
  ready:false,
  columns:<Columns[]>[],
  data:<Table[]>[],
})
export const createStore = (props:any) => {
  state.value.data = props.data;
  state.value.ready = true;
  return { state } 
}

export const SetColumns = (col:Columns) => {
  state.value.columns.push(col)
}