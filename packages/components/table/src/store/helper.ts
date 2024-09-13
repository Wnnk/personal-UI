import { ref,Ref,onMounted,onUnmounted } from 'vue'
import { Columns, Table } from '../table'


export const state = ref({
  ready:false,
  columns:<Columns[]>[],
  data:<Table[]>[],
  totalWidth:0,
  slots:<any[]>[],
})

export const tableBodyRows  = ref<Table[]>()
/* expand 展开行状态 */
export const expandArray = ref<boolean[]>([]);
/* 排序状态 */
export const sort = ref<string[]>([]);
/* filter展开/收起状态 */
export const filterExpandColMap = ref(new Map<Columns, boolean>());
/* 选中filter checkbox的列 */
export const filterChecked = ref<boolean[]>([]);
/** 
 * @description: 创建表格全部状态, store 用于获取z-table-culumns的slot
 * 
  */
export const createStore = (props:any) => {
 
  state.value.data = props.data;
  tableBodyRows.value = props.data;
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
  filterExpandColMap.value.set(col, false);
  if (col.filters && col.filters.length > 0)  {
    col.filters.forEach(() => {
      filterChecked.value.push(false);
    });
  }
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

  return;
}

/** 
 * @description: 过滤展开/收起
 * @param {Columns} col 列对象
  */
export const filterToggle = (col:Columns) => {
  /* 不存在该列时 */
  if (!filterExpandColMap.value.has(col)) return;
  /* 获取展开状态 */
  const expand = filterExpandColMap.value.get(col);
  /*  将其他列设为收起 */
  filterExpandColMap.value.forEach((item, key) => {
    if (key!== col) {
      filterExpandColMap.value.set(key, false);
    }
  });
  filterExpandColMap.value.set(col,!expand);
  return;
}
/** 
 * @description: 过滤菜单显示
 * @param {MouseEvent} e 鼠标事件
 * 
**/
export const x = ref(0);
export const y = ref(0);
export const filterMenus = (e:MouseEvent) => {
  x.value = e.clientX;
  y.value = e.clientY;
}


export  const filterCheckedChange = (checked: boolean[], col: Columns) => {
  if (!checked.includes(true)) {
    tableBodyRows.value = state.value.data;
    return;
  }
  const key =  col.prop;
  const filters = <any[]>[];
  for (let i = 0; i < col.filters.length; i++) {
    if (checked[i]) {
      filters.push(col.filters[i]);
    }
  }
  const rows = state.value.data;
  tableBodyRows.value  = rows.filter(row => {
    return filters.some(filter => {
      return filter.value === row[key]
    })
  });
  return;
}




export const setSlots = (slot:any) => {
  state.value.slots.push(slot);
}

