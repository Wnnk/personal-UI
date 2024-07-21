<script setup lang='ts'>
import { createNamespace } from '@commonUI/utils/create';
import { VueDraggable } from 'vue-draggable-plus'
import { panelValueProps, panelValueEmits } from './dragForm';
import { ref, computed } from 'vue'
import panelDisplay from './panelDisplay.vue'


const bem = createNamespace('drag-panel');
const props = defineProps(panelValueProps);
const emit = defineEmits(panelValueEmits);


const deepCline = (obj: any, hash:WeakMap<any, any> = new WeakMap()) => {
  if(obj === null) return obj;
  if(obj instanceof Date) return new Date(obj);
  if(obj instanceof RegExp) return new RegExp(obj);
  if(typeof obj !== 'object') return obj;
  if(hash.has(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      cloneObj[key] = deepCline(obj[key], hash);
    }
  }
  return cloneObj;    
}

const setCurrentItem = (node:any) => {
  emit('setCurrentItem', node);
}
const daleteCurrentItem = () => {

}
const changeFormItemData = () => {

}

const addSchema = (e:any) => {
  emit('changeFormItemData', e);

}
</script>

<template>
  <div :class="[bem.b()]">
    <div :class="[bem.e('dragableBox')]">
      <VueDraggable 
        :group="{ name: 'dragableGroup', pull: 'clone', put: true }"
        :animation="150"
        v-model="formConfig.schemas"
        :clone="deepCline"
        @add="addSchema"
        :class="[bem.e('container')]"
      >
        <template v-for="(schema,index) in formConfig.schemas" :key="schema.id">
          <panelDisplay
            :disabled="disabled"
            :formData="formData"
            :schema="schema"
            :currentItem="formConfig.currentItem"
            :formConfig="formConfig"
            :index="index"
            @setCurrentItem="setCurrentItem"
            @daleteCurrentItem="daleteCurrentItem"
            @changeFormItemData="changeFormItemData"

          >
          </panelDisplay>
          
        </template>


      </VueDraggable>
    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>