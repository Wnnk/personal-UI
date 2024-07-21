<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import {
  inputDisplay,
  dateDisplay,
  selectDisplay,
  radioDisplay,
} from './component/index'
import  {panelDisplayProps, panelDisplayEmits} from './dragForm'
import ItemStatus from './itemStatus.vue';
import itemDelete from './itemDelete.vue';
import { onMounted, ref,  } from 'vue';

const componentMap = {
  inputDisplay,
  dateDisplay,
  selectDisplay,
  radioDisplay,
}

const bem = createNamespace('panel-display');
const props = defineProps(panelDisplayProps);
const emit = defineEmits(panelDisplayEmits);
/** 
 * @description: 初始化props，根据不同类型传值
  */
const componentProps = ref<any>();

const initProps = () => {
  const { schema } = props;
  if(schema){
     switch (schema.component) {
      case 'inputDisplay':
      componentProps.value = {
          ...schema.componentProps,
        };
        break;
      case 'dateDisplay':
      componentProps.value = {
          ...schema.componentProps,
        };
        break;
      case'selectDisplay':
      componentProps.value = {
          ...schema.componentProps,
        };
        break;
      case 'radioDisplay':
      componentProps.value = {
          ...schema.componentProps,
        };
        break;
      default:
        break;
    }
  }
}
initProps();


const setCurrentItem = () => {
  emit('setCurrentItem', props);
};



</script>

<template>
  <div :class="[bem.b(), currentItem?.index === index ? bem.m('active') : '']"  @click="setCurrentItem">
    <component
      :is="componentMap[props.schema!.component]"
      :dynamicComponent="componentProps"
    ></component>
    <itemDelete v-if="currentItem?.index === index" />
    <ItemStatus :index="index"/>
  </div>
</template>

<style lang='scss' scoped>
</style>