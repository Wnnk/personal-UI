export const FORM_TYPE_DATE = 'display-date';
export const FORM_TYPE_RADIO = 'display-radio';
export const FORM_TYPE_SELECT = 'display-select';
export const FORM_TYPE_INPUT = 'display-input';



export const FORM_CONFIG_DATE  = 'config-date';
export const FORM_CONFIG_RADIO  = 'config-radio';
export const FORM_CONFIG_SELECT  = 'config-select';
export const FORM_CONFIG_INPUT  = 'config-input';



export const DraggableGroup = 'Component'

export const types = [
  {label: 'Data', value: FORM_TYPE_DATE},
  {label: 'Radio', value: FORM_TYPE_RADIO},
  {label: 'Select', value: FORM_TYPE_SELECT},
  {label: 'Input', value: FORM_TYPE_INPUT},
]

/* select组件的options */
export const selectType = {
  DICT: 'dict',
  DIY: 'diy'
}

export const selectTypeOptions = [
  {label: '字典', value: selectType.DICT},
  {label: '自定义', value: selectType.DIY},
]

export const ItemAttrs = {
  [FORM_CONFIG_DATE]: {
    width: 200,
    componentProps : {
      placeholder: '请选择日期',
      type: 'date',
      format: 'YYYY-MM-DD',
      "value-format": "YYYY-MM-DD"
    },
  },
  [FORM_CONFIG_RADIO]: {
    width: 200,
    options: [
      {label: '选项1', value: '1'},
      {label: '选项2', value: '2'},
      {label: '选项3', value: '3'},
    ],
  },
  [FORM_CONFIG_SELECT]: {
    width: 200,
    componentProps: {
      clearable: true,
      filterable: true,
      placeholder: '请选择',
    },
    optionType: selectType.DICT,
    options: [
      {label: '选项1', value: '1'},
      {label: '选项2', value: '2'},
    ],
  },
  [FORM_CONFIG_INPUT]: {
    width: 200,
    componentProps: {
      placeholder: '请输入内容',
      clearable: true,
    },
    append:"",
    options:[], 
  },
 
}