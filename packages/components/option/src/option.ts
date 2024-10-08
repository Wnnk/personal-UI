import { PropType } from 'vue';

export const OptionProps = {
  label:{
    type:String,
    required: true,
  },
  value: {
    type: [String, Number] as PropType<string | number> ,
    required:true,
  },
  disabled:{
    type:Boolean,
    default: false,
  },

}

export const OptionEmits = {
  'option-selected': (value: string | number) => value,
}