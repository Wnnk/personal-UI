import { ref } from 'vue'
import { Columns, Table } from '../table'


export const state = ref({
  ready:false,
  columns:<Columns[]>[],
  data:<Table[]>[],
  totalWidth:0,
  slots:<any[]>[],
})
export const expandArray = ref<boolean[]>([])
export const sort = ref<string[]>([])
/** 
 * @description: 创建表格全部状态, store 用于获取z-table-culumns的slot
 * 
  */
export const createStore = (props:any) => {
 
  state.value.data = props.data;
  state.value.ready = true;

  return { state } 
}
/** 
 * @description: 设置表格列, 展开行, 排序状态数组
 * @param {Columns} col 列对象
  */
export const SetColumns = (col:Columns) => {
  state.value.columns.push(col);
  expandArray.value.push(false);
  sort.value.push('');
}
/** 
 * @description: 展开行/收起行
 * @param {number} index 行索引
  */
export const expandRows = (index:number) => {
  expandArray.value[index] =!expandArray.value[index];
}

/** 
 * @description: 列排序，支持自定义排序
 * @param {Columns} col 列对象
 * @param {number} index 列索引
 * @param {string} type 排序类型，'ascending' | 'descending'
  */
export const sortColumn = (col:Columns, index:number, type:string) => {
  /* 清空sort数组 */
  sort.value.forEach((item, i) => {
    if (i!== index) {
      sort.value[i] = '';
    } else{ 
      sort.value[i] = type;
    }
  })
  /* 排序 */
  /* 自定义排序 */
  if (col.sortMethod !== undefined) {
    col.sortMethod(col,index,type);
    return;
  }
  /* 默认排序 */
  state.value.data.sort((a, b) => {

    const keyA = a[col.prop];
    const keyB = b[col.prop];

    if (type === 'ascending') {
      return keyA.localeCompare(keyB);
    } else if (type === 'descending') {
      return keyB.localeCompare(keyA);
    }
  })
}

export const setSlots = (slot:any) => {
  state.value.slots.push(slot);
}

