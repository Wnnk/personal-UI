import { ref } from 'vue'
import { Columns, Table } from '../table'


const state = ref({
  ready:false,
  columns:<Columns[]>[],
  data:<Table[]>[],
  totalWidth:0
})
export const createStore = (props:any) => {
  state.value.ready = true;
  state.value.data = props.data;
  return { state } 
}

export const SetColumns = (col:Columns) => {
  state.value.columns.push(col)
}

